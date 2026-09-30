FROM node:24-alpine AS web-build
COPY ui ui
RUN cd ui && ls -la && if [ -d "dist" ]; then exit 0; fi && \
    npm install --prefer-offline --no-audit && \
    npm install -D concurrently && \
    NODE_OPTIONS="--max-old-space-size=4096" npx concurrently "npm run build" "npm run build-chat" && \
    find . -maxdepth 1 ! -name '.' ! -name 'dist' ! -name 'public' -exec rm -rf {} +

FROM ghcr.io/1panel-dev/maxkb-base:python3.11-pg17.11-20260903 AS stage-build
COPY --chmod=700 . /opt/ragent-app
ENV RAGENT_SANDBOX_HOME=/opt/ragent-app/sandbox \
    RAGENT_CONFIG_TYPE=ENV
RUN apt-get update && \
    apt-get install -y --no-install-recommends gcc g++ gettext libexpat1-dev libffi-dev && \
    apt-get clean all  && \
    rm -rf /var/lib/apt/lists/*
WORKDIR /opt/ragent-app
RUN mkdir -p /opt/ragent-app/sandbox/lib && \
    gcc -shared -fPIC -o ${RAGENT_SANDBOX_HOME}/lib/sandbox.so /opt/ragent-app/installer/sandbox.c -ldl && \
    rm -rf /opt/ragent-app/ui && \
    pip install uv --break-system-packages && \
    python -m uv pip install -r pyproject.toml && \
    find /opt/ragent-app  -depth \( -name ".git*" -o -name ".docker*" -o -name ".idea*" -o -name ".editorconfig*" -o -name ".prettierrc*" -o -name "README.md" -o -name "poetry.lock" -o -name "pyproject.toml"  \) -exec rm -rf {} + && \
    python /opt/ragent-app/apps/manage.py compilemessages && \
    export PIP_TARGET=/opt/ragent-app/sandbox/python-packages && \
    python -m uv pip install --target=$PIP_TARGET requests pymysql psycopg2-binary && \
    rm -rf /opt/ragent-app/installer
COPY --from=web-build --chmod=700 ui /opt/ragent-app/ui

FROM ghcr.io/1panel-dev/maxkb-base:python3.11-pg17.11-20260903
ARG DOCKER_IMAGE_TAG=dev \
    BUILD_AT \
    GITHUB_COMMIT

ENV RAGENT_VERSION="${DOCKER_IMAGE_TAG} (build at ${BUILD_AT}, commit: ${GITHUB_COMMIT})" \
    RAGENT_DB_NAME=ragent \
    RAGENT_DB_HOST=127.0.0.1 \
    RAGENT_DB_PORT=5432  \
    RAGENT_DB_USER=${POSTGRES_USER} \
    RAGENT_DB_PASSWORD=${POSTGRES_PASSWORD} \
    RAGENT_DB_MAX_OVERFLOW=80 \
    RAGENT_REDIS_HOST=127.0.0.1 \
    RAGENT_REDIS_PORT=6379 \
    RAGENT_REDIS_DB=0 \
    RAGENT_REDIS_PASSWORD=${REDIS_PASSWORD} \
    RAGENT_EMBEDDING_MODEL_PATH=/opt/ragent-app/model/embedding \
    RAGENT_EMBEDDING_MODEL_NAME=/opt/ragent-app/model/embedding/shibing624_text2vec-base-chinese \
    RAGENT_LOCAL_MODEL_HOST=127.0.0.1 \
    RAGENT_LOCAL_MODEL_PORT=11636 \
    RAGENT_LOCAL_MODEL_PROTOCOL=http \
    PIP_TARGET=/opt/ragent/python-packages \
    RAGENT_CONFIG_TYPE=ENV \
    RAGENT_LOG_LEVEL=INFO \
    RAGENT_SANDBOX=1 \
    RAGENT_SANDBOX_HOME=/opt/ragent-app/sandbox \
    RAGENT_SANDBOX_PYTHON_PACKAGE_PATHS="/opt/py3/lib/python3.11/site-packages,/opt/ragent-app/sandbox/python-packages,/opt/ragent/python-packages" \
    RAGENT_SANDBOX_PYTHON_BANNED_HOSTS="127.0.0.0/8,localhost,host.docker.internal,172.17.0.0/16,ragent,pgsql,redis,172.31.250.192/26,0.0.0.0/32,::/0" \
    RAGENT_ADMIN_PATH=/admin \
    PGDATA=/opt/ragent/data/postgresql/pgdata \
    MAXKB_CONFIG_TYPE= \
    MAXKB_LOG_LEVEL= \
    MAXKB_SANDBOX= \
    MAXKB_SANDBOX_HOME= \
    MAXKB_SANDBOX_PYTHON_PACKAGE_PATHS= \
    MAXKB_SANDBOX_PYTHON_BANNED_HOSTS= \
    MAXKB_ADMIN_PATH=

WORKDIR /opt/ragent-app
COPY --from=stage-build /opt/ragent-app /opt/ragent-app
COPY --from=stage-build /opt/py3 /opt/py3
COPY --chmod=500 installer/*.sh /usr/bin/
RUN rm -rf /opt/maxkb-app && \
    usermod -d /opt/ragent-app/sandbox sandbox && \
    chmod -R 550 /opt/ragent-app/sandbox

EXPOSE 8080
VOLUME /opt/ragent
ENTRYPOINT ["bash", "-c"]
CMD [ "/usr/bin/start-all.sh" ]