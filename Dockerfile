# Stage 1: Build the Astro application
FROM node:22-slim AS builder

# Set the working directory
WORKDIR /app

# Install pnpm with a pinned version
RUN npm install -g pnpm@10.18.2

# Copy dependency definition files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY .ruler ./.ruler

# Install dependencies with pinned versions and no additional recommended packages
RUN apt-get update && apt-get install -y --no-install-recommends git=1:2.34.1-1
RUN mkdir -p /root/.config

# Skip prepare scripts by disabling lifecycle scripts
ENV npm_config_ignore_scripts=true
RUN pnpm install --frozen-lockfile

# Copy the rest of the application source code
COPY . .

# Build the application
RUN pnpm build

# Stage 2: Serve the static files with Caddy
FROM caddy:2-alpine

# Set the working directory
WORKDIR /srv

# Copy the built assets from the builder stage
COPY --from=builder /app/dist .

# Caddy will automatically serve the files in /srv
# The default Caddyfile will serve index.html as the root
# Expose the port Caddy listens on
EXPOSE 80
