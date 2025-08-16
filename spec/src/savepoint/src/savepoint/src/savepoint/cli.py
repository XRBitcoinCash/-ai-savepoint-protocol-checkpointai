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


--- a/src/savepoint/cli.py
+++ b/src/savepoint/cli.py
@@
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
+
+# new import for session exports/branching
+from .session import export_to_file, branch_to_file
@@
 def main():
     parser = argparse.ArgumentParser(prog="savepoint", description="AI Save Point Protocol CLI")
     subparsers = parser.add_subparsers(dest="command", required=True)
@@
     # show
     p_show = subparsers.add_parser("show", help="Pretty-print the save point JSON")
     p_show.add_argument("file")
     p_show.set_defaults(func=cmd_show)
+
+    # export
+    p_export = subparsers.add_parser("export", help="Export prompt or messages from a save point")
+    p_export.add_argument("file")
+    p_export.add_argument("--what", choices=["prompt", "messages"], default="prompt")
+    p_export.add_argument("--format", dest="fmt", default="md")
+    p_export.add_argument("--limit", type=int, default=20)
+    p_export.add_argument("--out", required=True)
+    p_export.set_defaults(func=lambda args: export_to_file(
+        savepoint_path=args.file,
+        out_path=args.out,
+        what=args.what,
+        fmt=args.fmt,
+        limit=args.limit
+    ))
+
+    # branch
+    p_branch = subparsers.add_parser("branch", help="Create a branched save point")
+    p_branch.add_argument("file")
+    p_branch.add_argument("--name", dest="branch_name")
+    p_branch.add_argument("--out", required=True)
+    def _do_branch(args):
+        branch_to_file(
+            savepoint_path=args.file,
+            out_path=args.out,
+            branch_name=args.branch_name
+        )
+        print(f"Branched -> {args.out}")
+    p_branch.set_defaults(func=_do_branch)
