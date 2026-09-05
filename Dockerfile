# Build stage
FROM node:18-alpine as build

WORKDIR /app

# Add build argument for API URL
ARG REACT_APP_API_URL
ARG REACT_APP_GAME_PORTAL_URL
ENV REACT_APP_API_URL=${REACT_APP_API_URL}
ENV REACT_APP_GAME_PORTAL_URL=${REACT_APP_GAME_PORTAL_URL}

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy project files
COPY . .

# Build the app
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets from build stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
