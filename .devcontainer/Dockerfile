# See here for image contents: https://github.com/devcontainers/images/tree/main/src/typescript-node
# This Dockerfile extends the base Node.js image to install pnpm.
FROM mcr.microsoft.com/devcontainers/typescript-node:4-20-bullseye@sha256:09bb696acc5811fa72cf927bc7e6d76763c6a4f33c131b480ce2073344d6032c

# Install pnpm
RUN su node -c "npm install -g pnpm"
