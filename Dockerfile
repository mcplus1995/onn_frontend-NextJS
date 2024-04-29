FROM node:18-slim
SHELL [ "/bin/bash","-c" ]
USER root
RUN apt-get update && apt-get -y install curl unzip && apt-get clean && curl -fsSL https://bun.sh/install | bash && mv /root/.bun/bin/bun /usr/local/bin/bun && ln -s /usr/local/bin/bun /usr/local/bin/bunx

USER node
WORKDIR /home/node

COPY --chown=node:node . . 
RUN bun install
#RUN bun run build

EXPOSE 3003

CMD ["bun","dev"]
