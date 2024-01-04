#!/bin/sh

#
# Copyright (c) 2023-2024 ThrRip, XMing (洺知-故犯)
#
# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at https://mozilla.org/MPL/2.0/.
#

_PrintUsage() {
    printf "\
Usage:  ENDPOINT=<endpoint> PROJECT_ID=<projectId> KEY=<key> ./init.sh
        ./init.sh --endpoint <endpoint> --projectId <projectId> --key <key>

Initialize the database of your Appwrite project.

Arguments:
  <endpoint>     Appwrite server endpoint
  <projectId>    Appwrite project ID
  <key>          Appwrite API key
"
    exit 1
}

[ ! -z "$(echo "$@" | grep -Eo "\--endpoint \S+")" ] &&
    ENDPOINT="$(echo "$@" | grep -Eo "\--endpoint \S+" | cut -d ' ' -f2)" ||
    [ ! -z "$ENDPOINT" ]  ||
    _PrintUsage

[ ! -z "$(echo "$@" | grep -Eo "\--projectId \S+")" ] &&
    PROJECT_ID="$(echo "$@" | grep -Eo "\--projectId \S+" | cut -d ' ' -f2)" ||
    [ ! -z "$PROJECT_ID" ]  ||
    _PrintUsage

[ ! -z "$(echo "$@" | grep -Eo "\--key \S+")" ] &&
    KEY="$(echo "$@" | grep -Eo "\--key \S+" | cut -d ' ' -f2)" ||
    [ ! -z "$KEY" ]  ||
    _PrintUsage

_fail() {
    printf "\n- $1\n"
    exit $2
}
_exec_dry() {
    _command="$@"
    printf "\n+ $_command\n"
}
_exec() {
    _command="$@"
    _exec_dry $_command
    "$@"
    _exit_code=$?
    [ $_exit_code != 0 ] && _fail "The command of \"""$_command""\" failed with code $_exit_code. Terminating the script." $_exit_code
}
_exec_quiet() {
    _command="$@"
    "$@"
    _exit_code=$?
    [ $_exit_code != 0 ] && _fail "The command of \"""$_command""\" failed with code $_exit_code. Terminating the script." $_exit_code
}

_exec_dry appwrite client --endpoint "$ENDPOINT" --projectId "$PROJECT_ID" --key "[REDACTED]"
_exec_quiet appwrite client --endpoint "$ENDPOINT" --projectId "$PROJECT_ID" --key "$KEY"

_exec appwrite databases create --databaseId home --name "Home"
_exec appwrite databases create --databaseId admin --name "Administration Panel"

_exec appwrite deploy collection --all --yes
