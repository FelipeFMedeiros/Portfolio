# Portfólio — Felipe Medeiros

React, TypeScript, Vite e TailwindCSS, com **Bun 1.4.0+** no gerenciamento de dependências, desenvolvimento, validação de tipos e build. A saída de produção é estática; não requer um servidor React em execução.

## Desenvolvimento

```sh
bun install --frozen-lockfile
bun run dev
```

O Vite inicia em `http://localhost:5173`. `bun run host` também permite acesso pela rede local. O `bun.lock` é o único lockfile do projeto.

## Build e validação

```sh
bun run lint
bun run build
bun run test:build
bun run preview --port 4173
```

O build prepara imagens responsivas, valida TypeScript, compila o cliente e gera HTML completo para a página inicial e os cinco projetos. Também gera `sitemap.xml`, `robots.txt`, a confirmação de pagamento com `noindex` e a página 404. As páginas públicas reutilizam o HTML por hidratação.

`bun run assets` prepara apenas as imagens; `bun run typecheck` prepara os assets e valida os tipos. O processamento de imagens usa cache por conteúdo e não modifica os originais. As variantes ficam em `public/generated/` e são recriadas em uma instalação limpa. O catálogo `src/generated/images.ts` é gerado pelo mesmo comando.

`bun run analyze` executa o build com análise de bundle em `.reports/bundle.html`. O analisador não participa do build comum.

A validação de HTML verifica conteúdo, títulos únicos, canonical, JSON-LD, sitemap e referências aos assets. O workflow `.github/workflows/quality.yml` instala com lockfile congelado e executa lint, build e testes.

Os limites automatizados são 200 KiB gzip de JavaScript inicial e 75 KiB gzip de HTML inicial. A comparação local antes/depois, com resultados e limites da medição, está em [docs/performance.md](docs/performance.md).

## Navegador e Lighthouse

Com a prévia de produção rodando na porta 4173:

```sh
bun run test:browser
bun run audit latest
```

Esses diagnósticos utilizam **Node.js 22.19+** e uma instalação local de Chrome/Chromium; `CHROME_PATH` pode indicar o executável. Nenhum navegador é baixado pelas dependências. O teste de navegador cobre conteúdo sem JavaScript, hidratação, menu, filtros, galeria, foco, tema, movimento reduzido, larguras de 320–1280px, pagamentos e 404.

O Lighthouse usa os perfis oficiais mobile e desktop e confirma o perfil efetivamente aplicado. Os relatórios HTML, JSON e resumos ficam em `.reports/lighthouse/`. `AUDIT_URL` permite medir outra prévia ou a URL publicada. Compare versões no mesmo ambiente e com o mesmo perfil; as notas locais são medições de laboratório e podem variar entre execuções e hospedagens.

## SEO e GEO

A fonte comum de metadados é `src/lib/seo.ts`. Cada rota pública tem título, descrição, canonical, Open Graph e Twitter próprios, presentes no HTML original e atualizados durante a navegação. Os dados estruturados descrevem a pessoa, o portfólio, a lista de projetos e cada trabalho usando as informações reais do projeto.

Para outra URL de produção, configure `VITE_SITE_URL` conforme `.env.example` antes do build. As URLs canônicas de projetos terminam em `/`; links antigos continuam aceitos e a prévia/hospedagem estática pode redirecioná-los para a forma canônica. `/success` mantém os parâmetros `type=project` e `type=maintenance` e fica fora do sitemap e do índice.

O conteúdo essencial está disponível sem JavaScript. Fontes locais, variantes WebP com `srcset`, dimensões de imagem, carregamento tardio fora da primeira tela, divisão das páginas secundárias em chunks e CSS embutido quando inferior a 100 KB reduzem o trabalho crítico do carregamento. O CSS continua disponível como asset para os preloads de navegação.

As bases de GEO são o conteúdo acessível, a autoria identificável, links claros e dados estruturados coerentes. Essas melhorias não garantem citações por mecanismos generativos. Referências: [Google Search e recursos de IA](https://developers.google.com/search/docs/appearance/ai-features), [JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics) e [diretrizes do Bing](https://www.bing.com/webmasters/help/bing-webmaster-guidelines-30fba23a).

## Publicação

Publique o **conteúdo completo de `dist/`**, incluindo os HTMLs de rotas, `generated/`, fontes, PDFs, certificados e `.htaccess`. Apache 2.4 usa a configuração fornecida para diretórios estáticos, 404, compressão e cache. Em outro serviço estático, configure o equivalente para servir `projects/<slug>/index.html`, `success/index.html` e `404.html`; o fallback global de SPA para qualquer URL não deve substituir o 404 real.

O workflow existente da Hostinger também usa Bun e valida lint, build e HTML antes do envio por FTP.

Os dados dos projetos, certificados, currículos e o componente de confirmação de pagamento permanecem preservados. A URL final deve ser conferida em produção no Search Console e no PageSpeed Insights após a publicação.
