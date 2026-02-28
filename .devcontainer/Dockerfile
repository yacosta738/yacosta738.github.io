# See here for image contents: https://github.com/devcontainers/images/tree/main/src/typescript-node
# This Dockerfile extends the base Node.js image to install pnpm.
FROM mcr.microsoft.com/devcontainers/typescript-node:4-20-bullseye@sha256:fa65b546e859edccc300784175f8137698c7e6d83229d34291b1f0d41290a09e

# Install pnpm
RUN su node -c "npm install -g pnpm"
