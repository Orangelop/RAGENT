#!/bin/bash

if [ ! -d /opt/ragent/logs ]; then
    mkdir -p /opt/ragent/logs
fi
chmod -R 700 /opt/ragent/logs
if [ ! -d /opt/ragent/local ]; then
    mkdir -p /opt/ragent/local
    chmod 700 /opt/ragent/local
fi
mkdir -p /opt/ragent/python-packages

rm -f /opt/ragent-app/tmp/*

_INIT_SHELL_DIR=${RAGENT_INIT_SHELL_DIR:-/opt/ragent/local/init-shells}
if [ -d $_INIT_SHELL_DIR ]; then
    chmod -R g-rwx $_INIT_SHELL_DIR
    find $_INIT_SHELL_DIR -maxdepth 1 -type f -name "*.sh" | sort | while IFS= read -r f; do
        if bash "$f"; then
            echo "[OK] init-shell >>> $f"
        else
            echo "[ERROR] init-shell >>> $f failed with exit code $?" >&2
        fi
    done
fi
python /opt/ragent-app/main.py start