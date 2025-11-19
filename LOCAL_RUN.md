# Local Development — Frontend & Backend

This project contains a TypeScript Express backend and a Vite + React frontend. These instructions show how to run both parts locally on macOS (zsh). Follow the recommended workflow for the simplest developer experience.

## Prerequisites

- Node.js (>=18 recommended)
- npm (comes with Node) or yarn
- A terminal (zsh is used by these examples)

## Install dependencies

Run in the project root:

```zsh
npm install
```

This installs both frontend and backend dependencies.

---

## Recommended: Integrated dev server (frontend + backend with HMR)

This is the easiest way to develop. The Express server mounts Vite as middleware in development so you get a single origin for API calls and hot module reload for the client.

Start the integrated dev server:

```zsh
npm run dev
```

- The server listens on the port defined by `PORT` environment variable, default is `5005`.
- Open: http://localhost:5005
- Use the app normally — API calls to `/api/*` are served by the local Express backend.

---

## Alternative: Run client and backend separately

If you prefer to run the frontend dev server (Vite) separately from the backend, use this flow.

1) Start the backend (dev)

```zsh
# Starts the TypeScript server with tsx
npm run dev
```

This will start the backend and, by default, also enable Vite middleware (same as recommended flow). If you want a backend that only serves built assets, build then start (see "Production" below).

2) Start the Vite client-only dev server

```zsh
npx vite --config vite.config.ts
```

- Vite will serve the client from `client/` (default port 5173). The project includes a proxy so that requests to `/api/*` on the Vite server are forwarded to `http://localhost:5005` (the backend). If you run Vite on a different port, update the proxy or call the backend directly at its port.

---

## Production build & start (server serves built client)

1. Build (produces `dist/public` for client and `dist/index.js` for the server bundle):

```zsh
npm run build
```

2. Start production server:

```zsh
npm start
```

- The production server serves the compiled client files from `dist/public` and the API from the same origin.
- To run on a different port:

```zsh
PORT=5001 npm start
```

---

## Environment variables

- `PORT` — port the server listens on (default: `5005`).

Example:

```zsh
PORT=5001 npm run dev
```

---

## Troubleshooting

- "Cannot find module 'dist/index.js'" → run `npm run build` first (production requires the built server).

- Vite proxy `ECONNREFUSED` → the proxy forwards `/api` requests to the backend (http://localhost:5005). Start the backend before making API requests from the client.

- `EADDRINUSE` → port already in use. Find & kill the process or use another port:

```zsh
lsof -i :5005
kill -9 <pid>
# or run on a different port
PORT=5001 npm run dev
```

- PostCSS warning: "A PostCSS plugin did not pass the `from` option to `postcss.parse'" — usually harmless. If you see styling issues, try upgrading PostCSS-related packages (`postcss`, `tailwindcss`, `autoprefixer`, `vite`) or reach out for help.
