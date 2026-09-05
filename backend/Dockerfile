FROM node:18-bullseye

WORKDIR /usr/src/app

# Install netcat and build dependencies
RUN apt-get update && apt-get install -y netcat-openbsd && rm -rf /var/lib/apt/lists/*

# Install dependencies
COPY package*.json ./
RUN npm install --build-from-source
RUN npm install -g @nestjs/cli typescript

# Copy Prisma schema and generate client
COPY prisma ./prisma/
RUN npx prisma generate

# Copy source code and tsconfig
COPY tsconfig*.json ./
COPY src ./src

# Build the application
RUN npm run build
RUN ls -la dist/
RUN ls -la dist/src/

# Copy and setup start script
COPY start.sh /start.sh
RUN chmod +x /start.sh

# Set the command to run the start script
CMD ["/start.sh"]
