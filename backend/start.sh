#!/bin/sh

# Attendre que la base de données soit prête
echo "Waiting for PostgreSQL to start..."
while ! nc -z db 5432; do
  sleep 1
done
echo "PostgreSQL started"

# Exécuter les migrations
echo "Running migrations..."
npx prisma migrate deploy

# Démarrer l'application
echo "Starting application..."
npm run start:prod
