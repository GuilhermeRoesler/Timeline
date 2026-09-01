---
name: timeline-ui
description: >-
  Padrões de interface do Timeline — páginas, painéis laterais, toolbar,
  modais de configuração, hooks e feedback ao usuário. Use ao criar ou
  modificar componentes React, páginas ou fluxos de interação.
---

# Interface e componentes

## Páginas (`src/pages/`)

| Página | Responsabilidade |
|--------|------------------|
| `LandingPage` | Apresentação; links para demo e dashboard |
| `DashboardPage` | Lista projetos, criar/editar/excluir, import/export |
| `TimelineRoute` | Carrega projeto por `:projectId`, onboarding, navegação |
| `Timeline` | Layout da timeline: toolbar + canvas + painéis |

### TimelineRoute — bootstrap

```typescript
useEffect(() => {
    initializeStorage();
    loadProjects();
    const project = selectProject(resolvedId);
    if (!project) navigate('/dashboard', { replace: true });
}, [resolvedId, ...]);
```

Passa `data`, `projectName`, `isDemo`, callbacks para `Timeline`.

### Timeline — layout

```tsx
<Toolbar onBack={...} projectName={...} />
<TimelineAxis />
<InfoCard />
<SidePanel />
{showOnboarding && <OnboardingOverlay />}
```

Hidrata stores no `useEffect` quando `data` muda. Adiciona classe `timeline-view` ao `body`.

## Painéis

### Toolbar (`components/panels/toolbar/`)

- Botão voltar ao dashboard
- Criar período/evento
- Colorizar timeline
- Ajustar camadas
- Abrir settings (`SettingsModal`, `SettingsSidebar`, `SettingsBody`)
- `ToggleSwitch` reutilizável

### Side panel (`components/panels/side-panel/`)

- `SidePanel.tsx` — container
- `SidePanelForm.tsx` / `SidePanelEditForm.tsx` — formulários
- `SidePanelFormType.tsx` — toggle período vs evento
- `form-elements/` — campos: título, descrição, datas, cor, imagem
- `ImageSection.tsx`, `ImageDisplay.tsx`, `ImageMiniBrowse.tsx` — imagens

Estado em `useSidePanelStore`:
- Modo (criar/editar)
- Tipo (período/evento)
- Dados do formulário
- Visibilidade do painel

### InfoCard (`components/infocard/`)

Exibe detalhes do item selecionado. Estado em `useDetailsBalloonStore`.

## UI global (`components/ui/`)

| Componente | Store |
|------------|-------|
| `ToastContainer` | `useUiStore` — `toasts[]` |
| `ConfirmDialog` | `useUiStore` — confirmações destrutivas |

Montados em `App.tsx` (acima das rotas).

### Padrão de toast

```typescript
useUiStore.getState().addToast({
    message: 'Período salvo com sucesso',
    type: 'success', // 'error' | 'info'
});
```

### Padrão de confirmação

```typescript
useUiStore.getState().showConfirm({
    title: 'Excluir projeto?',
    message: 'Esta ação não pode ser desfeita.',
    onConfirm: () => removeProject(id),
});
```

## Onboarding

`OnboardingOverlay` — exibido na primeira visita a projeto demo ou vazio.
Controle via `visitTracking.ts` (`isOnboardingDismissed`, `dismissOnboarding`).

## Hooks (`src/hooks/`)

| Hook | Uso |
|------|-----|
| `useStageControls` | Zoom e pan do canvas |
| `usePeriodEventHandler` | CRUD de períodos/eventos na UI |
| `useEventDetails` | Detalhes e seleção de eventos |

Extrair lógica reutilizável dos componentes para hooks; manter componentes focados em render.

## Estilos

- **Tailwind CSS v4** — classes utilitárias nos componentes
- **CSS modules globais** em `src/styles/`:
  - `globals.css` — variáveis e reset
  - `animations.css` — transições
  - `components/side-panel.css`, `info-card.css` — estilos específicos

Não introduzir CSS-in-JS; seguir padrão existente.

## Ícones

`lucide-react` — importar ícones individualmente:

```typescript
import { Sparkles, X, Settings } from 'lucide-react';
```

## Formulários

- Validação inline antes de chamar services
- Datas: inputs produzem strings `YYYY-MM-DD` → `new SimpleDate(value)`
- Cores: picker em `form-elements/Color.tsx`; temas de `data/theme.ts`
- Imagens: URL manual, upload local, ou busca Unsplash

## Acessibilidade

- Botões de fechar com `aria-label`
- Foco gerenciado em modais quando possível
- Contraste adequado nos temas de cor

## Padrões ao criar componentes

1. **Props tipadas** — interfaces explícitas, sem `any`
2. **Estado local mínimo** — preferir stores para estado compartilhado
3. **Sem fetch direto** — chamar services
4. **Feedback ao usuário** — toast em sucesso/erro; confirm em ações destrutivas
5. **Português** — todos os textos visíveis ao usuário

## Fluxo criar período (referência)

1. Toolbar → abre side panel (`sidePanelStore`)
2. Usuário preenche formulário
3. Hook/service → `createPeriod()` + `addPeriod()` no store
4. Opcional: `adjustLayer()` + `syncPeriods()`
5. Toast de sucesso; fecha painel

## Fluxo editar

1. Click no shape Konva → `sidePanelStore` com dados do item
2. Salvar → `updatePeriod`/`updateEvent` no service + store
3. Canvas re-renderiza via store
