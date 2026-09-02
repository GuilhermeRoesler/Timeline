---
name: timeline-overview
description: >-
    Visão geral da arquitetura do projeto Timeline — stack, rotas, fluxo de dados,
    estrutura de pastas e convenções gerais. Use ao iniciar trabalho no projeto,
    adicionar features novas ou quando precisar entender como as partes se conectam.
---

# Timeline — Visão geral do projeto

## O que é

Timeline é uma aplicação web interativa para criar, visualizar e editar linhas do tempo históricas, científicas ou pessoais. Tudo roda no browser; projetos são salvos em `localStorage`.

## Stack

| Camada     | Tecnologia                            |
| ---------- | ------------------------------------- |
| UI         | React 19, TypeScript, Tailwind CSS v4 |
| Build      | Vite 8                                |
| Roteamento | react-router-dom v7                   |
| Estado     | Zustand                               |
| Canvas     | react-konva / Konva                   |
| HTTP       | Axios (Gemini, Unsplash)              |
| Testes     | Vitest                                |

## Estrutura de pastas

```
src/
├── components/
│   ├── infocard/       # Card de detalhes de período/evento
│   ├── onboarding/     # Overlay de primeiro uso
│   ├── panels/         # Side panel, toolbar, settings
│   ├── timeline/       # Canvas Konva (stage, períodos, eventos)
│   └── ui/             # Toast, ConfirmDialog
├── constants/          # Links e constantes de portfólio
├── data/               # Temas de cores, demoProject.json
├── hooks/              # Zoom, handlers de período/evento
├── lib/                # SimpleDate
├── pages/              # Landing, Dashboard, Timeline, TimelineRoute
├── services/           # Persistência e APIs externas
├── store/              # Stores Zustand
├── styles/             # CSS global e por componente
├── types/              # Period, Event, Project, Settings
└── utils/              # Cores, camadas, visit tracking
```

## Rotas

| Rota                  | Componente           | Comportamento                                               |
| --------------------- | -------------------- | ----------------------------------------------------------- |
| `/`                   | `FirstVisitRedirect` | 1ª visita → `/project/demo-project`; depois → `LandingPage` |
| `/demo`               | `DemoRedirect`       | Redireciona para projeto demo                               |
| `/dashboard`          | `DashboardPage`      | CRUD de projetos, import/export JSON                        |
| `/project/:projectId` | `TimelineRoute`      | Carrega projeto, hidrata stores, renderiza `Timeline`       |
| `*`                   | `Navigate`           | Volta para `/`                                              |

`BrowserRouter` usa `basename` de `import.meta.env.BASE_URL` (GitHub Pages: `/Timeline/`).

## Fluxo de dados

```
localStorage (timeline_projects)
        ↕
projectStorageService  ←── periodService, eventService, settingsService
        ↕
projectsStore (metadados)     periodsStore / eventsStore / settingsStore (runtime)
        ↕
Timeline (hidrata stores)  →  TimelineAxis (Konva) + SidePanel + Toolbar
```

1. `TimelineRoute` chama `initializeStorage()` e `selectProject(id)`.
2. `Timeline` recebe `data: ApiUserData` e converte para domínio (`SimpleDate`).
3. Mutations passam pelos services → `localStorage` → stores atualizados.

## Variáveis de ambiente

| Variável                | Uso                                     |
| ----------------------- | --------------------------------------- |
| `VITE_UNSPLASH_API_KEY` | Busca de imagens no side panel          |
| `VITE_GEMINI_API_KEY`   | Geração de descrições em português      |
| `VITE_BASE_PATH`        | Base path do Vite (deploy GitHub Pages) |

Copie `.env.example` para `.env` no desenvolvimento local.

## Convenções de código

- **Idioma da UI:** português (labels, toasts, mensagens de erro).
- **Datas:** `SimpleDate` no domínio; strings `YYYY-MM-DD` na persistência.
- **IDs:** `crypto.randomUUID()` para novos itens e projetos.
- **Escopo mínimo:** altere só o necessário; siga padrões existentes.
- **Validação:** `npm run validate` (lint + format + typecheck + test + build).

## Skills relacionadas

- Estado: [timeline-state](../timeline-state/SKILL.md)
- Canvas: [timeline-canvas](../timeline-canvas/SKILL.md)
- Dados: [timeline-data](../timeline-data/SKILL.md)
- UI: [timeline-ui](../timeline-ui/SKILL.md)
- Testes: [timeline-testing](../timeline-testing/SKILL.md)
