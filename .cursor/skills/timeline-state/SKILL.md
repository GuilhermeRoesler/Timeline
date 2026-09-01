---
name: timeline-state
description: >-
  Gerencia stores Zustand do Timeline — períodos, eventos, settings, projetos,
  painel lateral, zoom e UI. Use ao criar ou modificar stores, sincronizar estado
  com localStorage ou depurar re-renders.
---

# Estado global (Zustand)

## Princípio central

Stores Zustand são **estado em memória para a sessão ativa**. A persistência fica em `projectStorageService`. Services gravam no `localStorage`; stores refletem o estado atual para a UI.

## Stores existentes

| Store | Arquivo | Responsabilidade |
|-------|---------|------------------|
| `useProjectsStore` | `projectsStore.ts` | Lista de projetos, projeto ativo, CRUD de metadados |
| `usePeriodsStore` | `periodsStore.ts` | Períodos com `SimpleDate` |
| `useEventsStore` | `eventsStore.ts` | Eventos com `SimpleDate` |
| `useSettingsStore` | `settingsStore.tsx` | Parâmetros visuais da timeline |
| `useSidePanelStore` | `sidePanelStore.tsx` | Formulário de criação/edição |
| `useStageControlsStore` | `stageControlsStore.tsx` | Zoom e posição do stage Konva |
| `useDetailsBalloonStore` | `detailsBalloonStore.tsx` | Card de detalhes focado |
| `useUiStore` | `uiStore.tsx` | Toasts, diálogos de confirmação |
| `useGlobalConfigStore` | `globalConfigStore.tsx` | Config global legada |

## Hidratação (entrada de dados)

`Timeline.tsx` é o ponto de hidratação ao abrir um projeto:

```typescript
// ApiUserData → domínio
const formattedPeriods = data.periods.map((period) => ({
    ...period,
    start: new SimpleDate(period.start_date),
    end: new SimpleDate(period.end_date),
}));

setPeriods(formattedPeriods);
setEvents(formattedEvents);
setSettings(data.settings);
```

## Conversão API ↔ domínio

Stores de períodos/eventos aceitam formato API nas mutations:

```typescript
// PeriodFromApi usa start_date/end_date (string)
type PeriodFromApi = Omit<Period, 'start' | 'end'> & {
    start_date: string;
    end_date: string;
};
```

O store converte para `SimpleDate` internamente em `addPeriod` / `updatePeriod`.

## Persistência (saída de dados)

Após mutação na UI, o fluxo típico é:

1. Componente/hook chama service (`createPeriod`, `updateEvent`, etc.).
2. Service atualiza `localStorage` via `projectStorageService`.
3. Store é atualizado (diretamente ou via `setPeriods`/`syncPeriods`).

Funções de sync em `projectStorageService`:
- `syncPeriods(periods: Period[])` — persiste níveis após `adjustLayer()`
- `syncEvents(events: Event[])` — persiste eventos

## Settings store

`useSettingsStore` expõe constantes em UPPER_SNAKE_CASE (`YEAR_SPACING`, `BASE_YEAR`, etc.) espelhando `Settings` em snake_case na persistência.

- `setSettings(Settings | null)` — hidrata do projeto carregado
- `saveSettings()` — grava via `updateSettings()` no service
- `resetSettings()` — restaura defaults e persiste

`TIMELINE_Y = window.innerHeight` é usado para posicionamento vertical do eixo.

## Projetos ativos

`projectsStore.selectProject(id)`:
1. Busca projeto em `getProject(id)`
2. Define `setActiveProjectId(id)` no service
3. Atualiza `activeProject` no store

`clearActiveProject()` ao sair da timeline (voltar ao dashboard).

## Padrões ao criar/alterar stores

### Seletores granulares

```typescript
// ✅ Bom — re-render só quando YEAR_SPACING muda
const yearSpacing = useSettingsStore((s) => s.YEAR_SPACING);

// ❌ Evitar — re-render em qualquer mudança do store
const store = useSettingsStore();
```

### getState() fora de React

Em utils (`levelUtils.ts`), use `getState()`:

```typescript
const { NEGATIVE_LEVEL } = useSettingsStore.getState();
const periods = usePeriodsStore.getState().periods;
```

### Não persistir no store

```typescript
// ❌ Errado
localStorage.setItem('periods', JSON.stringify(periods));

// ✅ Correto
createPeriod(periodData); // via service
```

## Checklist para novas features

- [ ] Dados novos pertencem ao `ProjectData` em `types/project.ts`?
- [ ] Persistência adicionada em `projectStorageService`?
- [ ] Store criado ou estendido com tipagem explícita?
- [ ] Hidratação em `Timeline.tsx` ou rota equivalente?
- [ ] Conversão `SimpleDate` ↔ string na fronteira API/domínio?
