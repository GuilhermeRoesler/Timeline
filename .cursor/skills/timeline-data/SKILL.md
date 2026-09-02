---
name: timeline-data
description: >-
    Camada de dados do Timeline — tipos de domínio, SimpleDate, persistência em
    localStorage, CRUD de projetos/períodos/eventos e integrações Gemini/Unsplash.
    Use ao alterar services, types, lib ou formato de persistência.
---

# Camada de dados

## Modelo de persistência

Tudo fica em `localStorage` sob a chave `timeline_projects` como array de `Project`.

```typescript
interface Project {
    id: string;
    name: string;
    description: string;
    createdAt: string; // ISO 8601
    updatedAt: string;
    isDemo: boolean;
    data: ProjectData;
}

interface ProjectData {
    periods: ApiPeriod[];
    events: ApiEvent[];
    settings: Settings;
}
```

## Fronteira API ↔ domínio

| Domínio (runtime)          | Persistência (JSON)  |
| -------------------------- | -------------------- |
| `Period.start: SimpleDate` | `start_date: string` |
| `Period.end: SimpleDate`   | `end_date: string`   |
| `Event.date: SimpleDate`   | `event_date: string` |
| `Settings` (snake_case)    | idem                 |

Tipos em `src/types/userData.ts`:

- `ApiPeriod`, `ApiEvent`, `ApiUserData` — formato persistido/API
- `Period`, `Event`, `UserData` — formato com `SimpleDate`

## SimpleDate

Classe em `src/lib/SimpleDate.ts`:

```typescript
new SimpleDate('2024-03-15'); // YYYY-MM-DD obrigatório
date.getYear(); // 2024
date.getMonth(); // 3
date.getDay(); // 15
date.toString(); // '2024-03-15'
date.toDate(); // Date local
```

Sempre validar formato na entrada; nunca usar `Date` diretamente no domínio.

## projectStorageService

Arquivo central: `src/services/projectStorageService.ts`.

### Projeto ativo

```typescript
setActiveProjectId(id: string | null)
getActiveProjectId(): string | null
```

Mutations de períodos/eventos/settings operam no projeto ativo. Erro se nenhum ativo.

### Inicialização

```typescript
initializeStorage();
```

- Cria array vazio com projeto demo se não existir
- Garante `demo-project` sempre presente

### CRUD de projetos

| Função                           | Notas                      |
| -------------------------------- | -------------------------- |
| `createProject(name, desc)`      | UUID novo, `isDemo: false` |
| `updateProjectMeta(id, updates)` | Só nome/descrição          |
| `deleteProject(id)`              | Bloqueia demo (`isDemo`)   |
| `getProject(id)`                 | Retorna `Project \| null`  |
| `getAllProjectSummaries()`       | Lista sem `data` completo  |

### CRUD de períodos/eventos

| Função               | Retorno     |
| -------------------- | ----------- |
| `createPeriod(data)` | `ApiPeriod` |
| `updatePeriod(data)` | `ApiPeriod` |
| `deletePeriod(id)`   | void        |
| `createEvent(data)`  | `ApiEvent`  |
| `updateEvent(data)`  | `ApiEvent`  |
| `deleteEvent(id)`    | void        |

IDs gerados com `crypto.randomUUID()` se `id` for `null`.

### Sync em lote

```typescript
syncPeriods(periods: Period[]): void   // após adjustLayer
syncEvents(events: Event[]): void
colorizeTimeline(periods, events): void
```

### Import/export

```typescript
exportProjectById(id): string | null
exportAllProjects(): string
importProjectFromJson(json): Project  // valida schema; gera novo id
```

Validação via `isValidProject` / `isValidProjectData`.

## Serviços finos (reexports)

Evite duplicar lógica — estes arquivos apenas reexportam:

```typescript
// periodService.ts
export { getAllPeriods, createPeriod, updatePeriod, deletePeriod } from './projectStorageService';

// eventService.ts — idem para eventos
// settingsService.ts — getSettings, updateSettings, resetSettings
```

Novas operações de persistência vão em `projectStorageService` primeiro.

## Settings

Tipo em `src/types/settings.ts`:

```typescript
interface Settings {
    year_spacing: number;
    base_year: number;
    period_height: number;
    level_spacing: number;
    event_radius: number;
    colorize_on_create: boolean;
    theme_index: number;
    negative_level: boolean;
}
```

Defaults definidos em `defaultSettings` no `projectStorageService`.

## Integrações externas

### Gemini (`geminiService.ts`)

```typescript
generateText(title: string): Promise<string>
```

- Env: `VITE_GEMINI_API_KEY`
- Prompt em português, máx. ~50 palavras
- Usado no side panel para descrição automática

### Unsplash (`unsplashService.ts`)

- Env: `VITE_UNSPLASH_API_KEY`
- Busca de imagens por keyword no side panel

### Tratamento de erros

Services de API devem propagar erros para a UI (toast via `uiStore`). Não engolir exceções silenciosamente.

## Demo project

- ID fixo: `demo-project` (`DEMO_PROJECT_ID`)
- Seed: `src/data/demoProject.json`
- Não deletável; pode ser sobrescrito em import com mesmo id

## Checklist para mudanças de schema

- [ ] Atualizar tipos em `src/types/`
- [ ] Atualizar `isValidProjectData` se necessário
- [ ] Migrar dados existentes ou aceitar defaults
- [ ] Atualizar `demoProject.json` se relevante
- [ ] Atualizar hidratação em `Timeline.tsx`
- [ ] Atualizar conversão nos stores
