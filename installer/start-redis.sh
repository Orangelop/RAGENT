#!/bin/bash

if [ ! -d /opt/ragent/data/redis ]; then
    mkdir -p /opt/ragent/data/redis
    chmod 700 /opt/ragent/data/redis
fi
if [ ! -d /opt/ragent/logs ]; then
    mkdir -p /opt/ragent/logs
    chmod 700 /opt/ragent/logs
fi
if [ ! -f /opt/ragent/conf/redis.conf ]; then
  mkdir -p /opt/ragent/conf
  touch /opt/ragent/conf/redis.conf
  chmod 700 /opt/ragent/conf/redis.conf
  cat <<EOF > /opt/ragent/conf/redis.conf
bind 0.0.0.0
port 6379
databases 16
maxmemory 1G
aof-use-rdb-preamble yes
save 30 1
save 10 10
save 5 20
dbfilename dump.rdb
rdbcompression yes
appendonly yes
appendfilename "appendonly.aof"
appendfsync everysec
auto-aof-rewrite-percentage 100
auto-aof-rewrite-min-size 64mb
maxmemory-policy allkeys-lru
loglevel warning
logfile /opt/ragent/logs/redis.log
dir /opt/ragent/data/redis
requirepass ${REDIS_PASSWORD}
EOF
fi

redis-server /opt/ragent/conf/redis.conf