---
name: timeline-canvas
description: >-
    Renderização e interação da timeline com react-konva — stage, zoom, períodos,
    eventos, marcadores de ano e camadas. Use ao modificar componentes em
    src/components/timeline/ ou comportamento visual da linha do tempo.
---

# Canvas da timeline (react-konva)

## Hierarquia de componentes

```
TimelineAxis
└── TimelineStage          # Stage Konva + controles de zoom/drag
    ├── TimelineMainLine   # Linha horizontal principal
    ├── TimelineYears      # Marcadores de ano
    ├── PeriodsLoader      # Itera períodos → <Period />
    └── EventsLoader       # Itera eventos → <Event />
```

Arquivos em `src/components/timeline/`.

## TimelineStage

Container principal do canvas Konva. Responsável por:

- Dimensões do stage (largura/altura)
- Zoom (scroll/pinch)
- Drag/pan do viewport
- Estado em `useStageControlsStore`

Hooks relacionados: `useStageControls.tsx`.

## Posicionamento horizontal

A posição X de qualquer item na timeline deriva de:

```
x = (ano - BASE_YEAR) * YEAR_SPACING
```

Valores vêm de `useSettingsStore`:

- `BASE_YEAR` — ano de referência (início visual)
- `YEAR_SPACING` — pixels por ano

Para datas com mês/dia, utils em `timelineYearsUtils.ts` interpolam dentro do ano.

## Períodos (`Period.tsx`)

- Renderizados como retângulos Konva (`Rect`)
- `level` determina offset vertical (acima/abaixo da linha principal)
- Espaçamento entre camadas: `LEVEL_SPACING`
- Altura: `PERIOD_HEIGHT`
- Camadas negativas habilitadas por `NEGATIVE_LEVEL` em settings

### Algoritmo de camadas

`src/utils/levelUtils.ts`:

- `calculateLevel(start, end, periods)` — encontra camada sem sobreposição
- `adjustLayer()` — recalcula todos os períodos e chama `setPeriods` + `syncPeriods`

Sobreposição detectada por ano: `period.start.getYear() < end && period.end.getYear() > start`.

## Eventos (`Event.tsx`)

- Renderizados como círculos (`Circle`)
- Posição X pela data do evento
- Raio: `EVENT_RADIUS` do settings store
- Ficam na linha principal (Y fixo relativo ao eixo)

## Interações

| Ação    | Comportamento esperado                          |
| ------- | ----------------------------------------------- |
| Hover   | Destaque visual; pode abrir preview no InfoCard |
| Click   | Abre side panel em modo edição                  |
| Zoom    | Atualiza escala no `stageControlsStore`         |
| Teclado | Navegação via handlers no stage (setas, etc.)   |

Handlers de período/evento: `usePeriodEventHandler.tsx`, `useEventDetails.tsx`.

## Loaders

`PeriodsLoader` e `EventsLoader` leem dos stores e mapeiam para componentes:

```typescript
const periods = usePeriodsStore((s) => s.periods);
// periods.map(p => <Period key={p.id} period={p} />)
```

Não passar props de dados pelo `TimelineAxis` — stores são a fonte.

## Regras de implementação

1. **Konva dentro, React fora** — lógica de negócio e formulários ficam fora do canvas.
2. **Leia settings do store** — não hardcodar espaçamentos ou cores de layout.
3. **Performance** — evitar re-render do stage inteiro; memoizar shapes quando necessário.
4. **Imagens** — períodos/eventos podem ter `image` URL; carregar com `use-image` ou equivalente Konva se aplicável.
5. **Sem localStorage** — canvas só lê/escreve via stores e services indiretos.

## Arquivos de apoio

| Arquivo                 | Função                                  |
| ----------------------- | --------------------------------------- |
| `timelineYearsUtils.ts` | Cálculo de posições e marcadores de ano |
| `levelUtils.ts`         | Camadas de períodos                     |
| `colorUtils.ts`         | Temas e colorização automática          |
| `data/theme.ts`         | Paletas de cores disponíveis            |

## Ao adicionar elemento visual

1. Identificar se é filho direto do `TimelineStage`.
2. Calcular posição com utils existentes (não reinventar escala temporal).
3. Conectar interações ao store correto (`sidePanelStore` para edição).
4. Testar com zoom extremo e muitos períodos sobrepostos.
