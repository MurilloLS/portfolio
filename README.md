# Portfólio Murillo Santos — V2 (Corporate Light)

Portfólio bilíngue PT/EN em branco e navy, estilo corporativo moderno.

## Estrutura

```
portfolio/
├── index.html               markup (apenas estrutura — sem CSS ou JS inline)
├── README.md
├── ARCHITECTURE.md          decisões de arquitetura e como adicionar features
├── assets/                  imagens e CV
├── styles/                  CSS modular (1 arquivo por seção/responsabilidade)
│   ├── main.css             manifest com @imports na ordem da cascata
│   └── …                    tokens, base, cursor, nav, hero, projects, …
└── js/                      JavaScript em ES modules
    ├── main.js              orquestrador — único ponto que define ordem de boot
    ├── core/                fundações: dom, state pub/sub, observer, constants
    ├── data/                conteúdo separado por domínio (perfil, i18n, projects, …)
    └── features/            uma feature por arquivo (theme, nav, terminal, …)
```

Os detalhes de cada camada e o porquê das decisões estão em `ARCHITECTURE.md`.

## Como rodar

Como o projeto agora usa ES modules, **abrir o `index.html` direto no navegador
(`file://`) não funciona** — os browsers bloqueiam módulos por CORS. Precisa de
qualquer servidor HTTP local. Algumas opções (escolha uma):

```bash
# Python (vem instalado em macOS/Linux)
python3 -m http.server 8000

# Node (se você tem npx)
npx serve .

# PHP
php -S localhost:8000

# Live Server (extensão do VS Code) — clique em "Go Live"
```

Depois abra `http://localhost:8000` no navegador.

Para deploy (GitHub Pages, Netlify, Vercel, etc.) basta apontar para a pasta —
todos esses serviços já entregam via HTTP, então nenhum ajuste é necessário.

## Recursos

- Bilíngue PT/EN (toggle no topo)
- Modo claro/escuro
- Cursor custom estilizado como prompt de terminal
- Filtros de projetos
- Cards expansíveis
- Timeline horizontal
- Animações de entrada por scroll
- Terminal interativo (tecla `` ` `` ou botão flutuante)

## Customizar

Tudo que é conteúdo vive em `js/data/`. Para editar:

- **Textos da UI**: `js/data/i18n.js` (chaves PT e EN lado a lado)
- **Projetos**: `js/data/projects.js`
- **Stack**: `js/data/stack.js`
- **Trajetória**: `js/data/timeline.js`
- **Certificações / cursos / idiomas**: `js/data/certifications.js`
- **Identidade (nome, e-mail, redes)**: `js/data/profile.js`

Para mudar visual, edite o arquivo CSS da seção correspondente em `styles/`.

Para trocar a foto placeholder, substitua o bloco `.photo-frame` em `index.html`.
