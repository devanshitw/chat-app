This file originally contained Replit-specific notes. Replit-related configuration and plugins
have been removed from the project to make it self-contained and not Replit-specific.

Key changes made:
- Removed Replit plugins from `vite.config.ts` and `package.json`.
- Replaced `.replit` with a minimal local-run note.
- Kept local dev scripts: `npm run dev`, `npm run build`, `npm start`.

Run the app locally:
```zsh
npm run dev         # development (server + Vite middleware)
npm run build       # build client + bundle server
npm start           # start production bundle
```