
### Setup
1/ Docker
- Open Docker desktop
- Open terminal to root of project
- sh setup.sh

Access : http://localhost:8000

2/ PHP + Node
Backend
- cp .env.example .env ( Update connection to Mysql )
- composer install
- composer artisan migrate
- composer artisan db:seed

Frontend
- nvm use v18.19.0
- npm install 
- npm run dev

Access : http://localhost:8000
