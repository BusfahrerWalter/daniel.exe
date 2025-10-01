# Daniel.exe

<p align="center">
	<img src="https://img.shields.io/badge/Made%20with-%E2%9D%A4-red.svg">
	<img src="https://img.shields.io/github/repo-size/BusfahrerWalter/daniel.exe">
	<img src="https://img.shields.io/maintenance/yes/2025">
	<a href="https://github.com/BusfahrerWalter/daniel.exe/actions/workflows/docker-publish.yml">
		<img src="https://github.com/BusfahrerWalter/daniel.exe/actions/workflows/docker-publish.yml/badge.svg">
	</a>
	<br>
	<!-- <img src="https://github.com/OWNER/REPO/actions/workflows/ci.yml/badge.svg"> -->
</p>

## ✨ Overview
<p align="center">
	This project is a personal portfolio page designed to showcase information about me (Daniel), my skills, and my work.
	<br>
	It serves as an interactive "about-me" website built with modern web technologies.
</p>

## ⚡ Technologies
| Tech         | Description                                 | Version   |
|--------------|---------------------------------------------|:---------:|
| Vue.js       | Frontend framework                          | ![Version](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2FBusfahrerWalter%2Fdaniel.exe%2Frefs%2Fheads%2Fmaster%2Fclient%2Fpackage.json&query=%24.Dependencies.vue&label) |
| Nuxt         | Vue-based meta-framework for SSR and SSG    | ![Version](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2FBusfahrerWalter%2Fdaniel.exe%2Frefs%2Fheads%2Fmaster%2Fclient%2Fpackage.json&query=%24.Dependencies.nuxt&label) |
| tRPC         | Type-safe API communication                 | ![Version](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2FBusfahrerWalter%2Fdaniel.exe%2Frefs%2Fheads%2Fmaster%2Fserver%2Fpackage.json&query=%24.dependencies%5B%22%40trpc%2Fserver%22%5D&label) |
| TypeScript   | Static typing for JavaScript                | ![Version](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2FBusfahrerWalter%2Fdaniel.exe%2Frefs%2Fheads%2Fmaster%2Fserver%2Fpackage.json&query=%24.devDependencies.typescript&label) |
| Vite         | Fast build tool and development server      | ![Version](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2FBusfahrerWalter%2Fdaniel.exe%2Frefs%2Fheads%2Fmaster%2Fserver%2Fpackage.json&query=%24.devDependencies.vite&label) |
| Docker       | Containerization and deployment             | - |

## 🛠️ Development
### Start Dev Server
1. Install dependencies:
	```sh
	npm i    # or `npm ci`
	```
2. Copy `.env.example` to `.env` in within the `client` and the `server` folders:
	```sh
	cp client/.env.example client/.env
	cp server/.env.example server/.env
	```
3. Fill out all required environment variables in `.env`.
4. Start the development server:
	```sh
	npm run dev
	```

## 📦 Docker
> **Note:** `.env` files are **not** copied into Docker containers. All required environment variables must be explicitly declared in the `docker-compose.yml`.

### Start locally
Use the `--env-file` flag to load environment variables from the corresponding `.env` files.
<br>
For development/test purposes, this is fine.
```sh
docker compose \
	--env-file ./client/.env \
	--env-file ./server/.env \
	up
```

### Build and deploy
```sh
docker compose build
```
