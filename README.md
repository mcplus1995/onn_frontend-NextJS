# ONN Frontend

This is the 2024 rewrite of the ONN Frontend in the latest NextJS Version. It works with the new directus backend via REST API using the official directus Javascript SDK.

## Stack

- [Bun](https://bun.sh/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Next.js](https://nextjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [DirectusSDK](https://docs.directus.io/guides/sdk/getting-started.html)
- [OpenAPI Codegen](https://github.com/fabien0102/openapi-codegen) - Codegen of typescript types from the backend schema fully automated

## Prerequisites

### Bun

You need to install bun to make this work

```
curl -fsSL https://bun.sh/install | bash
```

### nvm

I strongly recommend setting up `nvm` to be able to easily switch node versions on your system:

If you have homebrew:

```
brew install nvm
```

If not

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

Once installed install and activate the correct node version:

```
nvm install
nvm use
```

This reads the version from .nvmrc and installs it/activates it

## Getting Started

1. Install the dependencies

```
bun install
```

2. To start the development server run

```
bun run dev
```

Your application should now be available at `http://onn.localhost:3003` (if you didn't execute `make dev` in the onn-main wrapper project make sure to manually add the correct hosts entries to your hosts file)
