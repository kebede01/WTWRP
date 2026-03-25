# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# steps to get started
-Make directory WTWRP and cd WTWRP
-npm create vite
-npm install
-npm run dev
-Now open your browser to http://localhost:5173
-open and update vite.config.js

```js
export default defineConfig({
  plugins: [react()],
  // add the server object
  server: {
    port: 3000,
  },
});
```
-Next, open package.json and update your dev script to
```
"scripts": {
  "dev": "vite --open",
  "build": "vite build",
  "lint":"eslint . --report-unused-disable-directives --max-warnings 0",
  "preview": "vite preview"
},
```

# Get weather API key by signing up from 
-(https://openweathermap.org/) 
https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid={API key}
# How to run locally from dist folder without `npm run dev`.
Run the following.
-npx pnpm build
-npx pnpm preview
-Now if you navigate to [local](http://localhost:4173/), you'll be able to see your project up and running.