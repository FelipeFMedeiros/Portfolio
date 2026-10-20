# Desempenho, SEO e GEO

Medição local de 20/10/2026 com Lighthouse 13.5.0, Chrome headless e os perfis oficiais mobile e desktop, com a configuração padrão de throttling de cada perfil. Ambas as versões foram servidas pelo Vite Preview na mesma máquina. Cada número abaixo corresponde a uma execução; não é uma mediana nem um resultado de produção.

A referência anterior é o commit `8527f63`, reconstruído em uma pasta isolada, com os mesmos hashes dos bundles originais. A versão otimizada foi medida após o build de produção com Bun 1.4.0. O script confirma `formFactor` para impedir comparações com um perfil incorreto. Rodadas preliminares com a configuração desktop incorreta foram descartadas.

| Métrica | Mobile anterior | Mobile atual | Desktop anterior | Desktop atual |
| --- | ---: | ---: | ---: | ---: |
| Desempenho | 74 | **89** | 97 | **100** |
| Acessibilidade | 96 | **100** | 96 | **100** |
| Boas práticas | 100 | 100 | 100 | 100 |
| SEO | 100 | 100 | 100 | 100 |
| Primeira pintura de conteúdo (FCP) | 4,07 s | **2,56 s** | 0,54 s | 0,56 s |
| Maior renderização de conteúdo (LCP) | 4,27 s | **3,08 s** | 1,19 s | **0,68 s** |
| Bloqueio total (TBT) | 0 ms | 136 ms | 30 ms | 28 ms |
| Deslocamento de layout (CLS) | 0,0032 | **0,0002** | 0,0018 | **0,0004** |

Os resumos originais estão em [antes](performance/lighthouse-before.json) e [depois](performance/lighthouse-after.json). Os relatórios completos desta execução estão localmente em `.reports/lighthouse/baseline-corrected-{mobile,desktop}.html` e `.reports/lighthouse/final-{mobile,desktop}.html`.

## O que mudou

- Bun gerencia dependências, Vite, TypeScript e o build, com `bun.lock` congelado e analisador de bundle opcional.
- A página inicial e cinco projetos recebem HTML completo durante o build. As rotas usam hidratação para manter as interações existentes.
- Metadados individuais, canonical, Open Graph, Twitter e JSON-LD compartilham a mesma fonte de dados. Sitemap e robots são gerados com a URL de produção.
- Fontes locais, preload das fontes principais, imagens WebP responsivas, dimensões explícitas e carregamento tardio reduzem dependências e transferências desnecessárias.
- O CSS pequeno é embutido no HTML; as páginas secundárias são carregadas em chunks separados.
- A prévia retorna 404 real para URLs inexistentes. A confirmação de pagamento preserva seus parâmetros e usa `noindex`.

O Lighthouse já atribuía 100 em SEO à versão anterior. Essa nota não mede toda a indexabilidade, qualidade do conteúdo ou disponibilidade para mecanismos generativos. O ganho estrutural é disponibilizar conteúdo, autoria e relações entre projetos no HTML entregue ao crawler. Não há garantia de indexação ou citação por IA.

Bun melhora o fluxo de ferramentas; os ganhos no navegador vêm principalmente da entrega do HTML, dos assets e das fontes. O mobile ainda tem custo de hidratação e animações: o TBT aumentou, embora permaneça abaixo de 200 ms nesta medição. Reduzir esse trabalho inicial é o próximo ponto técnico caso seja necessário avançar além do resultado atual.

## Validação e limites

Passaram a instalação com lockfile congelado, lint, TypeScript, build comum, build com analisador, verificação dos seis HTMLs e os testes automatizados de navegador. Os testes cobrem conteúdo sem JavaScript, hidratação, menu, filtros, galeria, foco, tema, movimento reduzido, larguras de 320–1280 px, pagamentos e 404. O JavaScript inicial tem **171,6 KiB gzip**, com limite automatizado de 200 KiB; o HTML inicial tem limite de 75 KiB gzip.

Os dados em `src/data/projects.ts`, o componente `PaymentConfirmation.tsx`, os assets originais, PDFs e certificados foram comparados com `8527f63` e permanecem intactos. As imagens geradas não sobrescrevem os originais.

O workflow de CI foi adicionado, e o deploy existente da Hostinger migrou para Bun com lint e verificação de HTML antes do FTP. Os workflows ainda não foram executados no GitHub. A configuração Apache foi preparada; os testes de HTTP foram executados na prévia local, sem uma instância Apache. Após publicar, verifique a URL canônica, compressão, cache, sitemap e 404 no servidor real e repita a medição no PageSpeed Insights.

## Reproduzir

```sh
bun install --frozen-lockfile
bun run lint
bun run build
bun run test:build
bun run preview --port 4173
```

Em outro terminal, com Node.js 22.19+ e Chrome/Chromium instalado:

```sh
bun run test:browser
bun run audit latest
```

Use `AUDIT_URL` para outra URL e `CHROME_PATH` para um executável específico. Reproduzir o relatório anterior exige servir o build do commit de referência em uma porta separada; compare sempre o mesmo perfil e ambiente.
