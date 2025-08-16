#!/usr/bin/env python3
import argparse
import json
import os
import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SPEC = ROOT / "spec" / "schema.json"
SAVEPOINT_DEFAULT = ROOT / "savepoint.json"

def load_schema():
    if not SPEC.exists():
        sys.exit(f"[fatal] Missing schema file: {SPEC}")
    try:
        with SPEC.open("r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        sys.exit(f"[fatal] Failed to read schema: {e}")

def read_json(p: Path):
    try:
        with p.open("r", encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        sys.exit(f"[fatal] Savepoint not found: {p}")
    except Exception as e:
        sys.exit(f"[fatal] Invalid JSON in {p}: {e}")

def write_json(p: Path, data: dict):
    try:
        with p.open("w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
    except Exception as e:
        sys.exit(f"[fatal] Could not write {p}: {e}")

def validate_payload(payload: dict, schema: dict):
    # Minimal structural validation without external libs
    required = schema.get("required", [])
    props = schema.get("properties", {})
    missing = [k for k in required if k not in payload]
    if missing:
        sys.exit(f"[fatal] Missing required fields: {', '.join(missing)}")
    # Basic type checks
    for key, spec in props.items():
        if key in payload and "type" in spec:
            t = spec["type"]
            val = payload[key]
            if t == "string" and not isinstance(val, str):
                sys.exit(f"[fatal] Field '{key}' must be string")
            if t == "object" and not isinstance(val, dict):
                sys.exit(f"[fatal] Field '{key}' must be object")
            if t == "array" and not isinstance(val, list):
                sys.exit(f"[fatal] Field '{key}' must be array")
    return True

def cmd_init(args):
    schema = load_schema()
    payload = {
        "version": "0.1.0",
        "created_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "workspace": {
            "root": str(ROOT),
            "cwd": str(Path.cwd()),
            "python": sys.version.split()[0],
            "platform": sys.platform
        },
        "context": {
            "description": "Initialized save point",
            "notes": []
        },
        "artifacts": []
    }
    validate_payload(payload, schema)
    out = Path(args.output) if args.output else SAVEPOINT_DEFAULT
    write_json(out, payload)
    print(f"[ok] Initialized savepoint at {out}")

def cmd_validate(args):
    schema = load_schema()
    sp = Path(args.file) if args.file else SAVEPOINT_DEFAULT
    payload = read_json(sp)
    validate_payload(payload, schema)
    print(f"[ok] Savepoint is valid: {sp}")

def cmd_save(args):
    schema = load_schema()
    sp = Path(args.output) if args.output else SAVEPOINT_DEFAULT
    payload = {
        "version": "0.1.0",
        "created_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "workspace": {
            "root": str(ROOT),
            "cwd": str(Path.cwd()),
            "python": sys.version.split()[0],
            "platform": sys.platform
        },
        "context": {
            "description": args.description or "Manual save",
            "notes": args.note or []
        },
        "artifacts": []
    }
    validate_payload(payload, schema)
    write_json(sp, payload)
    print(f"[ok] Saved savepoint at {sp}")

def cmd_restore(args):
    sp = Path(args.file) if args.file else SAVEPOINT_DEFAULT
    payload = read_json(sp)
    # For safety, we print restoration steps instead of mutating the environment.
    print("[plan] Restoration plan:")
    print(f"  - cd \"{payload['workspace']['cwd']}\"")
    print("  - Set env vars or tooling as per your onboarding doc")
    print("  - Re-run any bootstrap commands (e.g., PYTHONPATH)")

def main():
    parser = argparse.ArgumentParser(
        prog="savepoint",
        description="Universal AI Save Point Protocol (minimal CLI)"
    )
    sub = parser.add_subparsers(dest="command", required=True)

    p_init = sub.add_parser("init", help="Initialize a new savepoint file")
    p_init.add_argument("-o", "--output", help="Output path for savepoint.json")
    p_init.set_defaults(func=cmd_init)

    p_validate = sub.add_parser("validate", help="Validate a savepoint file")
    p_validate.add_argument("-f", "--file", help="Path to savepoint.json")
    p_validate.set_defaults(func=cmd_validate)

    p_save = sub.add_parser("save", help="Save current state to a savepoint")
    p_save.add_argument("-o", "--output", help="Output path for savepoint.json")
    p_save.add_argument("-d", "--description", help="Short description")
    p_save.add_argument("-n", "--note", action="append", help="Add a note (repeatable)")
    p_save.set_defaults(func=cmd_save)

    p_restore = sub.add_parser("restore", help="Print restoration steps")
    p_restore.add_argument("-f", "--file", help="Path to savepoint.json")
    p_restore.set_defaults(func=cmd_restore)

    args = parser.parse_args()
    args.func(args)

if __name__ == "__main__":
    main()
