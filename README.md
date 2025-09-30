# Daniel.exe

## Introduction
This project is a personal portfolio page designed to showcase information about me (Daniel), my skills, and my work.

It serves as an interactive "about-me" website built with modern web technologies.

## Technologies
| Tech         | Description                                 |
|--------------|---------------------------------------------|
| Vue.js       | Frontend framework                          |
| Nuxt         | Vue-based meta-framework for SSR and SSG    |
| tRPC         | Type-safe API communication                 |
| TypeScript   | Static typing for JavaScript                |
| Vite         | Fast build tool and development server      |
| Docker       | Containerization and deployment             |

## Development
### Start Dev Server
1. Install dependencies:
	```sh
	npm i
	```
2. Copy `.env.example` to `.env` in within the `server` folder:
	```sh
	cp server/.env.example server/.env
	```
3. Fill out all required environment variables in `.env`.
4. Start the development server:
	```sh
	npm run dev
	```

### Start in Docker
```sh
docker compose up
```
