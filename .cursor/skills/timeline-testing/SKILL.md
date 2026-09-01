---
name: timeline-testing
description: >-
  Convenções de testes do Timeline com Vitest — escopo, ambiente, cobertura e
  padrões para testar lib e utils. Use ao escrever ou modificar testes unitários.
---

# Testes (Vitest)

## Configuração

Arquivo: `vitest.config.ts`

```typescript
{
    globals: true,
    environment: 'node',
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
        provider: 'v8',
        include: ['src/lib/**', 'src/utils/**'],
    },
}
```

## Scripts

| Comando | Ação |
|---------|------|
| `npm test` | Roda todos os testes uma vez |
| `npm run test:watch` | Modo watch |
| `npm run test:coverage` | Com relatório de cobertura |
| `npm run validate` | lint + format + typecheck + test + build |

## O que testar

### Prioridade alta (lógica pura)

| Área | Exemplos existentes |
|------|---------------------|
| `src/lib/` | `SimpleDate.test.ts` |
| `src/utils/` | `timelineYearsUtils.test.ts`, `levelUtils.test.ts`, `colorUtils.test.ts` |

Funções determinísticas, sem DOM, sem stores — ideais para unit tests.

### Prioridade baixa (evitar por padrão)

- Componentes React com Konva (setup pesado, pouco ROI)
- Stores Zustand (testar via funções puras extraídas)
- Services com `localStorage` (mockar só se extrair lógica testável)

## Padrão de arquivo de teste

Colocar ao lado do código testado:

```
src/lib/SimpleDate.ts
src/lib/SimpleDate.test.ts

src/utils/levelUtils.ts
src/utils/levelUtils.test.ts
```

## Estrutura de teste

```typescript
import { describe, it, expect } from 'vitest';
import { calculateLevel } from './levelUtils';

describe('calculateLevel', () => {
    it('retorna nível 1 quando não há conflito', () => {
        const level = calculateLevel(2000, 2010, []);
        expect(level).toBe(1);
    });
});
```

Com `globals: true`, `describe`/`it`/`expect` estão disponíveis sem import (ambos funcionam).

## Testando SimpleDate

```typescript
it('parseia YYYY-MM-DD corretamente', () => {
    const d = new SimpleDate('1999-12-31');
    expect(d.getYear()).toBe(1999);
    expect(d.getMonth()).toBe(12);
    expect(d.getDay()).toBe(31);
});

it('rejeita formato inválido', () => {
    expect(() => new SimpleDate('31/12/1999')).toThrow();
});
```

## Testando utils com stores

`levelUtils` usa `useSettingsStore.getState()` e `usePeriodsStore.getState()`.

Opções:
1. **Extrair lógica pura** — passar `NEGATIVE_LEVEL` e `periods` como parâmetros (preferido para novo código)
2. **Resetar store antes do teste** — se inevitável:

```typescript
import { useSettingsStore } from '../store/settingsStore';

beforeEach(() => {
    useSettingsStore.setState({ NEGATIVE_LEVEL: true });
});
```

## Cobertura

Foco em `src/lib/**` e `src/utils/**`. Não é meta cobrir 100% do projeto — priorizar algoritmos críticos (datas, camadas, posicionamento, cores).

## Ao adicionar nova util

1. Implementar função pura quando possível
2. Adicionar `*.test.ts` com casos normais e edge cases
3. Rodar `npm test`
4. Incluir no PR se alterar comportamento existente

## Edge cases comuns no Timeline

- Períodos sobrepostos em múltiplas camadas (positivas e negativas)
- Anos antes de `BASE_YEAR` (coordenadas negativas)
- Datas em 29/02, virada de ano, século
- Arrays vazios de períodos/eventos
- `theme_index` fora do range de temas disponíveis

## O que não fazer

- Testes que dependem de ordem de execução entre arquivos
- Snapshots de componentes Konva sem necessidade
- Testes de integração com APIs reais (Gemini/Unsplash)
- Ignorar falhas com `test.skip` sem justificativa
