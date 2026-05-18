# See here for image contents: https://github.com/devcontainers/images/tree/main/src/typescript-node
# This Dockerfile extends the base Node.js image to install pnpm.
FROM mcr.microsoft.com/devcontainers/typescript-node:4-20-bullseye@sha256:c0da2b9b5dc5458bea3e78e66e8f303e3cbd9c47a0f123fe64a168e9a7ad6249

# Install pnpm
RUN su node -c "npm install -g pnpm"
