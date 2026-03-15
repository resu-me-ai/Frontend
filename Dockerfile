# Resu-ME Frontend (Vite React) Dockerfile
# Multi-stage build for development and production

# =============================================================================
# Base stage - Common setup
# =============================================================================
FROM node:22-alpine AS base

WORKDIR /app

# =============================================================================
# Development stage - Hot reload support
# =============================================================================
FROM base AS development

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies)
RUN npm ci

# Copy source code
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Start Vite dev server with host flag for Docker networking
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# =============================================================================
# Builder stage - Build the application
# =============================================================================
FROM base AS builder

# Copy package files
COPY package*.json ./

# Install all dependencies for building
RUN npm ci

# Copy source code
COPY . .

# Build arguments for environment variables at build time
ARG VITE_API_BASE_URL
ARG VITE_CLERK_PUBLISHABLE_KEY
ARG VITE_APP_NAME
ARG VITE_ENVIRONMENT

# Build the application
RUN npm run build

# =============================================================================
# Production stage - Nginx for serving static files
# =============================================================================
FROM nginx:alpine AS production

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
