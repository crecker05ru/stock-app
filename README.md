# .

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
yarn
```

### Compile and Hot-Reload for Development

```sh
yarn dev
```

### Type-Check, Compile and Minify for Production

```sh
yarn build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
yarn test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
yarn test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
yarn build
yarn test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
yarn lint
```

# stock-app

#sources
Статья по node sql.js
https://habr.com/ru/companies/vdsina/articles/527146/

Инструкции:

1. SQL
   https://metanit.com/sql/sqlite/1.1.php
2. Vue
   https://vuejs.org/guide/quick-start
   3.Vite Plugin Node
   https://github.com/axe-me/vite-plugin-node
3. sqlite3
   https://www.npmjs.com/package/sqlite3
   https://github.com/TryGhost/node-sqlite3/wiki/API

Создать боилерплейт на vue3/ts
Установить yarn
npm install --global yarn
yarn global add nodemon --prefix /usr/local
Инициализировать проект vue
yarn create vue - создать проект
yarn - инициализировать проект пакеты npm
yarn add vite vite-plugin-node -D - плагин для работы с node Vite Plugin Node
