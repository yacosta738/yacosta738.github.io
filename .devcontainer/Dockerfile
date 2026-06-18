# See here for image contents: https://github.com/devcontainers/images/tree/main/src/typescript-node
# This Dockerfile extends the base Node.js image to install pnpm.
FROM mcr.microsoft.com/devcontainers/typescript-node:4-20-bullseye@sha256:da34e2f52e604ed67295c3e7b8347ff23fa1e278e81f83c9d322e74a9c72b352

# Install pnpm
RUN su node -c "npm install -g pnpm"
