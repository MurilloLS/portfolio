# Arquitetura

Este documento explica **como** o projeto está organizado e **por que**. Use-o
quando for adicionar uma feature, mover algo de lugar, ou justificar uma escolha
em revisão de código.

## Princípios

1. **Separação por camada, não por arquivo gigante.** Markup, estilo, dados e
   lógica vivem em diretórios separados. Nenhum CSS inline, nenhuma string
   hard-coded em feature, nenhuma feature acessando o DOM de outra.
2. **Uma feature, um arquivo.** Theme, nav, terminal, projetos: cada uma é um
   módulo independente em `js/features/` com um `init()` público.
3. **Pub/sub para integrar features.** Features nunca se chamam diretamente.
   Elas escrevem em `state` e quem se importa recebe notificação.
4. **Dados como API somente-leitura.** Cada slice (perfil, i18n, projects…) é um
   módulo que faz `export` e é agregado em `data/index.js`.
5. **Sem build step.** ES modules nativos do navegador. Único requisito é
   servir via HTTP (qualquer servidor local resolve — veja o README).

## Camadas

```
┌─────────────────────────────────────────────────────────────┐
│  index.html  ← markup (sem CSS/JS embutido)                 │
└─────────────────────────────────────────────────────────────┘
        │                                  │
        ▼                                  ▼
┌──────────────────┐              ┌─────────────────────────┐
│  styles/         │              │  js/main.js             │
│  CSS por seção   │              │  (orquestrador)         │
│  + main.css      │              └─────────────────────────┘
│  (cascade order) │                          │
└──────────────────┘                          ▼
                            ┌───────────────────────────────┐
                            │  js/features/                 │
                            │  theme, nav, projects, …      │
                            └───────────────────────────────┘
                                   │            │
                       importa     │            │   importa
                                   ▼            ▼
                            ┌──────────┐  ┌────────────┐
                            │ js/core/ │  │ js/data/   │
                            │ state,   │  │ profile,   │
                            │ dom,     │  │ i18n,      │
                            │ observer │  │ projects,  │
                            └──────────┘  └────────────┘
```

Direção dos imports é sempre **para baixo**. Features importam de `core` e
`data`. `core` não importa de features. `data` não importa de nada. Esse é o
truque que mantém o grafo de dependências acíclico.

## `core/` — fundações

Quatro módulos pequenos que todo resto consome.

### `state.js` — o coração do desacoplamento

Estado global mínimo (`lang`, `theme`, `filter`) com pub/sub:

```js
state.get("lang")              // lê
state.set("lang", "en")        // escreve + notifica subscribers
state.subscribe("lang", fn)    // reage a mudanças (retorna unsubscribe)
state.toggleLang()             // helper que alterna entre pt/en
```

`lang` e `theme` são persistidos em `localStorage` automaticamente. Os outros
são voláteis. Toda essa lógica vive aqui — features não tocam em
`localStorage` direto.

### `dom.js` — `$` e `$$`

Açúcar para `querySelector` / `querySelectorAll`. Sem jQuery. Sem dependência.

### `observer.js` — IntersectionObserver compartilhado

Um único observer cuida das animações `[data-reveal]`. Features que criam
elementos novos (cards de projeto, itens de timeline) chamam `observeReveal(el)`
em vez de criar um observer próprio.

### `constants.js` — magic strings em um lugar só

`LANGS`, `THEMES`, `SECTION_IDS`. Se alguém escrever `"dark"` em vez de
`THEMES.DARK` em features, é regressão; mantenha tudo aqui.

## `data/` — conteúdo

Estritamente dados. Sem lógica, sem `document`, sem fetch. Cada slice é um
arquivo:

| Arquivo                | Conteúdo                                      |
|------------------------|-----------------------------------------------|
| `profile.js`           | Nome, e-mail, GitHub, LinkedIn, link do CV    |
| `i18n.js`              | Todas as traduções (`pt`, `en`)               |
| `projects.js`          | Lista de projetos + definição dos filtros     |
| `stack.js`             | Stack técnica em 4 grupos                     |
| `certifications.js`    | Certificações, cursos, idiomas falados        |
| `timeline.js`          | Trajetória profissional/acadêmica             |
| `index.js`             | Agregador — `export default` da forma final   |

Por que separar? Editar i18n não significa abrir um arquivo de 260 linhas.
Adicionar um projeto não toca em nada além de `projects.js`. Mais
importante: arquivos pequenos com responsabilidade clara são mais fáceis de
revisar em PR.

## `features/` — uma feature, um arquivo

| Arquivo                  | Responsabilidade                                       |
|--------------------------|--------------------------------------------------------|
| `theme.js`               | Aplica tema ao `<body>` + botão de toggle              |
| `i18n.js`                | Traduz elementos `[data-i]` + expõe `t(key)`           |
| `cursor.js`              | Cursor estilizado seguindo o mouse                     |
| `nav.js`                 | Scroll-spy + estado "scrolled" da barra superior       |
| `stack.js`               | Renderiza as 3 colunas de stack (uma vez só)           |
| `filters.js`             | Renderiza chips de filtro                              |
| `projects.js`            | Renderiza grid de projetos + clique expande            |
| `timeline.js`            | Renderiza timeline horizontal                          |
| `certifications.js`      | Renderiza certificações, cursos, idiomas               |
| `contact.js`             | Botão "Copiar e-mail" com feedback                     |
| `terminal.js`            | UI do terminal (overlay, input, atalhos)               |
| `terminal-commands.js`   | Registro de comandos (separado da UI)                  |
| `reveal.js`              | Inicia observer + failsafe acima da dobra              |
| `footer.js`              | Ano corrente no rodapé                                 |

**Contrato:** cada feature exporta `init()`. Sem efeitos colaterais no
import. Sem estado de módulo escondido (use `core/state.js` se precisar).

**Quando uma feature reage a state:** ela faz `state.subscribe('lang', render)`
dentro de `init()`. Quando reage a múltiplos slices, uma subscription por
slice — não dispense isso em nome de "DRY".

## `styles/` — CSS modular

CSS dividido por seção/responsabilidade, com `main.css` como **manifest**
puro — ele apenas faz `@import` na ordem da cascata. **Não reordene os
imports** sem entender o impacto — a cascata depende dessa ordem.

Estrutura:

```
tokens.css           variáveis CSS (light + dark)
base.css             reset, html/body, ::selection, links
cursor.css           cursor custom
nav.css              barra superior
layout.css           section, container, headings
hero.css through contact.css   uma seção da página por arquivo
footer.css
terminal.css         overlay + launcher + .i-empty util
reveal.css           animações [data-reveal]
responsive.css       @media (max-width: 900px) — DEVE ser o último
```

`responsive.css` precisa ser o último import porque suas regras sobrescrevem
as demais em viewports estreitas.

## `js/main.js` — orquestrador

Único arquivo que conhece todas as features. Define a ordem de boot e a
justificativa em comentários no topo. Em duas linhas:

1. `theme` primeiro (evita flash do tema errado).
2. `i18n` antes de qualquer renderer (eles consultam `t()` durante o init).
3. Features de conteúdo no meio.
4. `reveal` por último (precisa que todos `[data-reveal]` já estejam no DOM).

## Como adicionar coisas

### Uma nova seção da página

1. Adicionar markup em `index.html`.
2. Criar `styles/<secao>.css` + adicionar `@import` em `main.css` na ordem certa.
3. Se a seção tem conteúdo dinâmico, criar `js/data/<secao>.js` e exportar de
   `js/data/index.js`.
4. Criar `js/features/<secao>.js` exportando `init()`. Subscrever a `lang` se
   houver textos traduzíveis.
5. Importar em `js/main.js` e chamar `<secao>.init()`.

### Um novo comando no terminal

Só `js/features/terminal-commands.js`. Adicione uma função e registre-a no
mapa `commands` no final. A UI já chama tudo automaticamente.

### Um novo idioma (ex: espanhol)

1. Adicionar `es: { ... }` em `js/data/i18n.js`.
2. Adicionar `ES: "es"` em `js/core/constants.js#LANGS`.
3. Ajustar `state.toggleLang()` em `js/core/state.js` se quiser alternar
   entre os três (hoje alterna entre PT e EN).
4. Adicionar segmento no `#langPill` no HTML, se aplicável.

### Uma nova categoria de filtro

Só `js/data/projects.js` — adicionar uma entrada em `filters` e marcar os
projetos com a nova `filterTag`. Zero código.

## O que **não** fazer

- ❌ Importar uma feature de outra feature. Use state pub/sub.
- ❌ Ler/escrever `localStorage` fora de `state.js`.
- ❌ Reordenar `@import`s em `main.css` sem testar cascata.
- ❌ Adicionar lógica em `data/`. Esses arquivos são dados puros.
- ❌ Criar `<script>` adicionais no HTML. Tudo entra por `main.js`.
- ❌ Usar `window.PORTFOLIO_DATA` (resíduo do projeto antigo — não existe mais).
