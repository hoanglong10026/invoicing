#!/bin/bash
cp .env.example .env
docker-compose build app
docker-compose up -d
docker-compose exec app composer install
docker-compose exec app php artisan migrate --force
docker-compose exec app php artisan db:seed
docker-compose exec app npm install
docker-compose exec app npm run build
