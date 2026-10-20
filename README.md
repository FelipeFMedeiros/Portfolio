# Portfólio — Felipe Medeiros

React, TypeScript, Vite e TailwindCSS. O gerenciador de pacotes e runtime de desenvolvimento é o **Bun 1.4.0 ou superior**.

## Desenvolvimento

```sh
bun install --frozen-lockfile
bun run dev
```

O Vite inicia em `http://localhost:5173`. Para acessar pela rede local, use `bun run host`.

## Validação e produção

```sh
bun run lint
bun run build
bun run preview
```

O build valida os tipos com TypeScript e gera os arquivos estáticos em `dist/`. `bun run typecheck` executa apenas a validação de tipos.

O `bun.lock` deve ser versionado. Em CI, use `bun install --frozen-lockfile` para impedir alterações inesperadas nas versões resolvidas. Os comandos de Vite, TypeScript e ESLint executam no runtime do Bun.
