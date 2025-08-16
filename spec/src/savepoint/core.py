# File: src/savepoint/core.py
"""
AI Save Point Protocol (UASPP) - Core Runtime Module
- Enforces spec/savepoint.schema.json
- Provides creation, validation, checksum, and I/O utilities
"""

import json
import uuid
import hashlib
from pathlib import Path
from datetime import datetime, timezone
from jsonschema import Draft202012Validator

# Path to the schema
SCHEMA_PATH = Path(__file__).parent.parent.parent / "spec" / "savepoint.schema.json"

# Load the schema once
with open(SCHEMA_PATH, "r", encoding="utf-8") as f:
    SCHEMA = json.load(f)

VALIDATOR = Draft202012Validator(SCHEMA)

# --------------------------------------------------------------------
# Helpers
# --------------------------------------------------------------------
def _now_utc() -> str:
    """Return current UTC timestamp in ISO8601 Zulu format."""
    return datetime.now(timezone.utc).isoformat(timespec="milliseconds").replace("+00:00", "Z")


# --------------------------------------------------------------------
# Core API
# --------------------------------------------------------------------
def new_savepoint(app_name: str,
                  app_version: str,
                  engine_name: str,
                  engine_type: str = "llm",
                  protocol_version: str = "1.0.0",
                  schema_version: str = "1.0.0") -> dict:
    """
    Create a new minimal, schema-compliant save point.
    """
    sp = {
        "schema_version": schema_version,
        "protocol_version": protocol_version,
        "session_metadata": {
            "id": str(uuid.uuid4()),
            "created_at": _now_utc(),
            "app": {"name": app_name, "version": app_version},
            "engine": {"name": engine_name, "type": engine_type}
        },
        "conversation_state": [],
        "memory_state": {"kv": {}, "notes": []},
        "attachments": [],
        "integrity": {"algorithm": "sha256", "checksum": ""},
        "provenance": {},
        "protocol_metadata": {}
    }
    return sp


def append_message(sp: dict,
                   role: str,
                   content: list,
                   created_at: str = None,
                   metadata: dict = None) -> str:
    """
    Append a new conversation message block.
    `content` should be a list of objects: [{"type": "text", "data": "example"}]
    """
    msg_id = str(uuid.uuid4())
    msg = {
        "id": msg_id,
        "role": role,
        "content": content,
        "created_at": created_at or _now_utc()
    }
    if metadata:
        msg["metadata"] = metadata
    sp["conversation_state"].append(msg)
    # Reset checksum
    if "integrity" in sp:
        sp["integrity"]["checksum"] = ""
    return msg_id


def add_attachment(sp: dict,
                   uri: str,
                   mime: str = None,
                   description: str = None,
                   file_hash: str = None) -> str:
    """
    Add an attachment reference to the save point.
    """
    att_id = str(uuid.uuid4())
    att = {"id": att_id, "uri": uri}
    if mime:
        att["mime"] = mime
    if description:
        att["description"] = description
    if file_hash:
        att["hash"] = file_hash
    sp["attachments"].append(att)
    if "integrity" in sp:
        sp["integrity"]["checksum"] = ""
    return att_id


def compute_checksum(sp: dict) -> str:
    """
    Compute SHA checksum over the save point (excluding checksum itself).
    """
    sp_copy = json.loads(json.dumps(sp, sort_keys=True, ensure_ascii=False))
    if "integrity" in sp_copy:
        sp_copy["integrity"]["checksum"] = ""
    payload = json.dumps(sp_copy, sort_keys=True, separators=(",", ":"), ensure_ascii=False)
    checksum = hashlib.sha256(payload.encode("utf-8")).hexdigest()
    sp["integrity"]["checksum"] = checksum
    return checksum


def validate(sp: dict) -> list:
    """
    Validate a save point dict against the JSON schema.
    Returns a list of error messages (empty list if valid).
    """
    return sorted(e.message for e in VALIDATOR.iter_errors(sp))


def load(path: str) -> dict:
    """
    Load a save point JSON file from disk.
    """
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def save(path: str, sp: dict) -> None:
    """
    Save a save point JSON file to disk.
    """
    with open(path, "w", encoding="utf-8") as f:
        json.dump(sp, f, indent=2, ensure_ascii=False, sort_keys=True)


def pretty_print(sp: dict) -> None:
    """
    Output save point as formatted JSON string.
    """
    print(json.dumps(sp, indent=2, ensure_ascii=False))


# --------------------------------------------------------------------
# End of core.py
# --------------------------------------------------------------------
