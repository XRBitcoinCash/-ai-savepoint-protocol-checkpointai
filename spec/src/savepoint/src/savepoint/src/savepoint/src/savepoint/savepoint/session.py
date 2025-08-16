"""
UASPP Session Rehydration and Export Helpers

Transforms Save Points into:
- Rehydration prompts (compact, model-friendly context)
- Message feeds (jsonl/md/text) for direct API ingestion
- Branching utilities for forked explorations

No model calls are made here; this is pure transformation + IO.
"""

from __future__ import annotations
from pathlib import Path
from datetime import datetime, timezone
import json
from typing import Iterable, Dict, Any, List, Optional

from .core import load, save, validate, compute_checksum


def _now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def _coalesce_text(content_blocks: Any) -> str:
    """
    Collapse content blocks into a single text string.
    Non-text blocks are represented as placeholders: [type]
    Expected shape: [{"type": "text", "data": "..."}, ...]
    """
    if not isinstance(content_blocks, list):
        # Back-compat: plain string content
        return str(content_blocks)

    parts: List[str] = []
    for blk in content_blocks:
        if not isinstance(blk, dict):
            parts.append(str(blk))
            continue
        t = blk.get("type")
        if t == "text":
            parts.append(str(blk.get("data", "")))
        else:
            # Keep a lightweight marker for non-text modalities
            parts.append(f"[{t}]")
    return "\n".join(p for p in parts if p)


def iter_messages(sp: Dict[str, Any]) -> Iterable[Dict[str, str]]:
    """
    Yield normalized {'role': str, 'content': str} items from the Save Point.
    """
    for msg in sp.get("messages", []):
        role = msg.get("role", "user")
        content = _coalesce_text(msg.get("content", ""))
        yield {"role": role, "content": content}


def summarize_meta(sp: Dict[str, Any]) -> Dict[str, Any]:
    meta = sp.get("meta", {})
    engine = sp.get("engine", {})
    protocol = sp.get("protocol", {})
    schema = sp.get("$schema") or sp.get("schema", {})

    return {
        "app_name": meta.get("app_name") or meta.get("app") or "",
        "app_version": meta.get("app_version") or "",
        "engine_name": engine.get("name") or "",
        "engine_type": engine.get("type") or "",
        "protocol_version": protocol.get("version") or sp.get("protocol_version") or "",
        "schema_version": schema.get("version") if isinstance(schema, dict) else "",
        "created_at": meta.get("created_at") or "",
        "updated_at": meta.get("updated_at") or "",
        "session_id": meta.get("session_id") or sp.get("id") or "",
        "branch": meta.get("branch") or "",
        "tags": meta.get("tags") or [],
    }


def export_rehydration_prompt(
    sp: Dict[str, Any],
    *,
    limit: Optional[int] = 20,
    include_attachments: bool = True,
    include_integrity: bool = True,
) -> str:
    """
    Produce a compact, deterministic prompt string that captures:
    - App/engine/protocol identity
    - Recent message history (role-tagged)
    - Attachment references (URIs only)
    - Integrity hint (checksum/algorithm) for auditability
    """
    m = summarize_meta(sp)
    hdr_lines = [
        "[UASPP Rehydration Prompt v1]",
        f"App: {m['app_name']} {m['app_version']}".strip(),
        f"Engine: {m['engine_name']} ({m['engine_type']})".strip(),
        f"Protocol: {m['protocol_version']}".strip(),
    ]
    if m["schema_version"]:
        hdr_lines.append(f"Schema: {m['schema_version']}")
    if m["session_id"]:
        hdr_lines.append(f"Session: {m['session_id']}")
    if m["branch"]:
        hdr_lines.append(f"Branch: {m['branch']}")
    if m["tags"]:
        hdr_lines.append(f"Tags: {', '.join(map(str, m['tags']))}")

    # Messages (most recent last)
    msgs = list(iter_messages(sp))
    if limit is not None and limit > 0:
        msgs = msgs[-limit:]

    msg_lines: List[str] = []
    for msg in msgs:
        role = msg["role"]
        content = msg["content"].strip()
        if content:
            msg_lines.append(f"{role}: {content}")

    # Attachments
    att_lines: List[str] = []
    if include_attachments:
        for att in sp.get("attachments", []):
            uri = att.get("uri")
            if uri:
                att_lines.append(f"- {uri}")

    # Integrity
    integ_lines: List[str] = []
    if include_integrity:
        integ = sp.get("integrity", {})
        alg = integ.get("algorithm")
        chksum = integ.get("checksum")
        if alg and chksum:
            integ_lines.append(f"Integrity: {alg}={chksum}")

    sections: List[str] = [
        "\n".join(hdr_lines),
        "",
        "[History]",
        "\n".join(msg_lines) if msg_lines else "(no prior messages)",
    ]
    if att_lines:
        sections += ["", "[Attachments]", "\n".join(att_lines)]
    if integ_lines:
        sections += ["", "[Audit]", "\n".join(integ_lines)]

    sections += ["", "[Instruction]", "Continue the session faithfully from History."]

    return "\n".join(sections).strip() + "\n"


def export_messages(
    sp: Dict[str, Any],
    *,
    limit: Optional[int] = None,
    fmt: str = "jsonl",
) -> str:
    """
    Export normalized messages in one of: jsonl, md, text.
    - jsonl: one {"role","content"} per line
    - md:   ### role + content blocks
    - text: role: content lines
    """
    msgs = list(iter_messages(sp))
    if limit is not None and limit > 0:
        msgs = msgs[-limit:]

    fmt = fmt.lower()
    if fmt == "jsonl":
        return "\n".join(json.dumps(m, ensure_ascii=False) for m in msgs) + ("\n" if msgs else "")
    elif fmt == "md":
        lines: List[str] = []
        for m in msgs:
            lines.append(f"### {m['role']}")
            lines.append("")
            lines.append(m["content"] or "")
            lines.append("")
        return "\n".join(lines).strip() + ("\n" if msgs else "")
    elif fmt == "text":
        return "\n".join(f"{m['role']}: {m['content']}" for m in msgs) + ("\n" if msgs else "")
    else:
        raise ValueError(f"Unsupported export format: {fmt}")


def branch_savepoint(
    sp: Dict[str, Any],
    *,
    branch_name: Optional[str] = None,
    reset_integrity: bool = True,
) -> Dict[str, Any]:
    """
    Create an in-memory branched copy with meta.branch set.
    Optionally clears integrity checksum to force recomputation.
    """
    # Shallow copy with deep-ish fields handled simply
    branched = json.loads(json.dumps(sp))
    meta = branched.setdefault("meta", {})
    meta["branch"] = branch_name or f"branch-{_now_iso()}"
    meta["updated_at"] = _now_iso()

    if reset_integrity:
        integ = branched.setdefault("integrity", {})
        integ.pop("checksum", None)

    return branched


def write_text(path: str | Path, data: str) -> None:
    p = Path(path)
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(data, encoding="utf-8")


def export_to_file(
    savepoint_path: str | Path,
    out_path: str | Path,
    *,
    what: str = "prompt",
    fmt: str = "md",
    limit: Optional[int] = 20,
    validate_first: bool = True,
    update_checksum: bool = True,
) -> None:
    """
    High-level export utility:
    - what=prompt → single prompt string (fmt: md|text)
    - what=messages → feed (fmt: jsonl|md|text)
    """
    sp = load(str(savepoint_path))

    if validate_first:
        errors = validate(sp)
        if errors:
            raise ValueError(f"Save Point validation failed: {errors}")

    if update_checksum:
        compute_checksum(sp)  # updates in-place
        save(str(savepoint_path), sp)

    what = what.lower()
    if what == "prompt":
        if fmt not in ("md", "text"):
            raise ValueError("Prompt export supports fmt=md|text")
        prompt = export_rehydration_prompt(sp, limit=limit)
        write_text(out_path, prompt if fmt == "text" else prompt)
    elif what == "messages":
        feed = export_messages(sp, limit=limit, fmt=fmt)
        write_text(out_path, feed)
    else:
        raise ValueError(f"Unsupported export type: {what}")


def branch_to_file(
    savepoint_path: str | Path,
    out_path: str | Path,
    *,
    branch_name: Optional[str] = None,
    validate_first: bool = True,
) -> None:
    """
    Create a branched Save Point file suitable for parallel exploration.
    """
    sp = load(str(savepoint_path))
    if validate_first:
        errors = validate(sp)
        if errors:
            raise ValueError(f"Save Point validation failed: {errors}")

    branched = branch_savepoint(sp, branch_name=branch_name, reset_integrity=True)
    compute_checksum(branched)
    save(str(out_path), branched)
