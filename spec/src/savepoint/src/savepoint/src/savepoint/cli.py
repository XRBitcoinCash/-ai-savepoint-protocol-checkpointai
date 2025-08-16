"""
AI Save Point Protocol (UASPP) - Command Line Interface
Provides terminal commands to create, validate, and manage Save Points.

Usage examples:
    python -m savepoint.cli init --app "MyApp" --app-version "0.1.0" --engine "gpt-4" --out savepoint.json
    python -m savepoint.cli append savepoint.json --role user --content "Hello"
    python -m savepoint.cli validate savepoint.json
    python -m savepoint.cli checksum savepoint.json
"""

import argparse
import sys
from pathlib import Path

# Import core functions
from .core import (
    new_savepoint,
    append_message,
    add_attachment,
    compute_checksum,
    validate,
    load,
    save,
    pretty_print
)


def cmd_init(args):
    sp = new_savepoint(
        app_name=args.app,
        app_version=args.app_version,
        engine_name=args.engine,
        engine_type=args.engine_type,
        protocol_version=args.protocol_version,
        schema_version=args.schema_version
    )
    save(args.out, sp)
    print(f"Initialized save point -> {args.out}")


def cmd_append(args):
    sp = load(args.file)
    content_block = [{"type": args.content_type, "data": args.content}]
    append_message(sp, args.role, content_block)
    save(args.file, sp)
    print(f"Appended message with role={args.role}")


def cmd_attach(args):
    sp = load(args.file)
    add_attachment(sp, uri=args.uri, mime=args.mime, description=args.description, file_hash=args.hash)
    save(args.file, sp)
    print(f"Added attachment: {args.uri}")


def cmd_checksum(args):
    sp = load(args.file)
    checksum = compute_checksum(sp)
    save(args.file, sp)
    print(f"Checksum ({sp['integrity']['algorithm']}): {checksum}")


def cmd_validate(args):
    sp = load(args.file)
    errors = validate(sp)
    if errors:
        print("INVALID SAVE POINT")
        for err in errors:
            print(f"- {err}")
        sys.exit(1)
    print("VALID SAVE POINT")


def cmd_show(args):
    sp = load(args.file)
    pretty_print(sp)


def main():
    parser = argparse.ArgumentParser(prog="savepoint", description="AI Save Point Protocol CLI")
    subparsers = parser.add_subparsers(dest="command", required=True)

    # init
    p_init = subparsers.add_parser("init", help="Create a new save point file")
    p_init.add_argument("--app", required=True)
    p_init.add_argument("--app-version", required=True)
    p_init.add_argument("--engine", required=True)
    p_init.add_argument("--engine-type", default="llm")
    p_init.add_argument("--protocol-version", default="1.0.0")
    p_init.add_argument("--schema-version", default="1.0.0")
    p_init.add_argument("--out", required=True)
    p_init.set_defaults(func=cmd_init)

    # append
    p_append = subparsers.add_parser("append", help="Append a message")
    p_append.add_argument("file")
    p_append.add_argument("--role", required=True)
    p_append.add_argument("--content-type", default="text")
    p_append.add_argument("--content", required=True)
    p_append.set_defaults(func=cmd_append)

    # attach
    p_attach = subparsers.add_parser("attach", help="Attach a file/URI")
    p_attach.add_argument("file")
    p_attach.add_argument("--uri", required=True)
    p_attach.add_argument("--mime")
    p_attach.add_argument("--description")
    p_attach.add_argument("--hash")
    p_attach.set_defaults(func=cmd_attach)

    # checksum
    p_checksum = subparsers.add_parser("checksum", help="Compute and update checksum")
    p_checksum.add_argument("file")
    p_checksum.set_defaults(func=cmd_checksum)

    # validate
    p_validate = subparsers.add_parser("validate", help="Validate a save point file")
    p_validate.add_argument("file")
    p_validate.set_defaults(func=cmd_validate)

    # show
    p_show = subparsers.add_parser("show", help="Pretty-print the save point JSON")
    p_show.add_argument("file")
    p_show.set_defaults(func=cmd_show)

    args = parser.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()
