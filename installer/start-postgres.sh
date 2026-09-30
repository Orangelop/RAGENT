#!/bin/bash

mkdir -p /opt/ragent/data/postgresql
docker-entrypoint.sh postgres -c max_connections=${POSTGRES_MAX_CONNECTIONS} -c jit=off
