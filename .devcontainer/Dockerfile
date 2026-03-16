# See here for image contents: https://github.com/devcontainers/images/tree/main/src/typescript-node
# This Dockerfile extends the base Node.js image to install pnpm.
FROM mcr.microsoft.com/devcontainers/typescript-node:4-20-bullseye@sha256:ff56df66e16206b259d318d65d13bc041ae87d9b8eed040dd2e363cafc2891dc

# Install pnpm
RUN su node -c "npm install -g pnpm"
