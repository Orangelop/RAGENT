<p align="center"><img src= "ui/src/assets/logo/RAGENT-logo.svg" alt="Ragent" width="300" /></p>
<h3 align="center">Open-source platform for building enterprise-grade agents</h3>
<h3 align="center">强大易用的企业级智能体平台</h3>
<hr/>

Ragent is an open-source platform for building enterprise-grade agents. Ragent integrates Retrieval-Augmented Generation (RAG) pipelines, supports robust workflows, and provides advanced MCP tool-use capabilities. Ragent is widely applied in scenarios such as intelligent customer service, corporate internal knowledge bases, academic research, and education.

- **RAG Pipeline**: Supports direct uploading of documents / automatic crawling of online documents, with features for automatic text splitting, vectorization. This effectively reduces hallucinations in large models, providing a superior smart Q&A interaction experience.
- **Agentic Workflow**: Equipped with a powerful workflow engine, function library and MCP tool-use, enabling the orchestration of AI processes to meet the needs of complex business scenarios.
- **Seamless Integration**: Facilitates zero-coding rapid integration into third-party business systems, quickly equipping existing systems with intelligent Q&A capabilities to enhance user satisfaction.
- **Model-Agnostic**: Supports various large models, including private models (such as DeepSeek, Llama, Qwen, etc.) and public models (like OpenAI, Claude, Gemini, MiniMax, etc.).
- **Multi Modal**: Native support for input and output text, image, audio and video.

## Quick start

Execute the script below to start a Ragent container using Docker:

```bash
docker run -d --name=ragent --restart=always -p 8080:8080 -v ~/.ragent:/opt/ragent ragent
```

Access Ragent web interface at `http://your_server_ip:8080` with default admin credentials:

- username: admin
- password: Ragent@123..

中国用户如遇到 Docker 镜像 Pull 失败问题，请参照该 [离线安装文档](https://maxkb.cn/docs/v2/installation/offline_installtion/) 进行安装。

## Technical stack

- Frontend：[Vue.js](https://vuejs.org/)
- Backend：[Python / Django](https://www.djangoproject.com/)
- LLM Framework：[LangChain](https://www.langchain.com/)
- Database：[PostgreSQL + pgvector](https://www.postgresql.org/)
