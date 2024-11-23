# Reactron Vite Template

A template for making desktop applications using **React**, **Electron**, and **Vite**.
Do `pnpm install` after cloning repo, and `pnpm electron:dev` to run with desktop mode.

---

## Includes

- **React**
- **Vite**
- **TypeScript for React**
- **JavaScript for Electron**
- **ESLint & Prettier**

## File Structure

.
├── src/                      # React application source code
│   ├── App.tsx               # Main React component
│   ├── main.tsx              # React entry point
│   └── vite-env.d.ts         # TypeScript environment file
├── electron-main.js          # Electron main process (backend)
├── index.html                # HTML template for Vite
├── vite.config.ts            # Vite configuration
├── package.json              # Project scripts and dependencies
├── .eslintrc.json            # ESLint configuration
├── eslint.config.js          # ESLint flat config
├── .prettierrc               # Prettier configuration
├── pnpm-lock.yaml            # Dependency lock file
├── tsconfig.json             # TypeScript configuration for React
└── README.md                 # Project documentation

---
