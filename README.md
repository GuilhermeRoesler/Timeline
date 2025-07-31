# 🗓️ Timeline: Documentação do Projeto

## 📌 Visão Geral

**Timeline** é uma aplicação web interativa para criação, **visualização e edição de linhas do tempo históricas**, científicas ou pessoais.

O usuário pode adicionar períodos e eventos, customizar **cores, temas, camadas**, exportar/importar dados e visualizar detalhes de cada item. O projeto utiliza React, `Zustand` para gerenciamento de estado, e `react-konva` para renderização gráfica.

## ⚙️ Funcionalidades Principais

- ✅ **Criação de Períodos e Eventos:** Adicione períodos (intervalos de tempo) e eventos (pontos específicos) com título, descrição, cor e imagem.
- ✅ **Visualização Dinâmica:** Linha do tempo escalável com zoom, arraste, navegação por teclado e marcadores de anos adaptativos.
- ✅ **Camadas Inteligentes:** Períodos são automaticamente organizados em diferentes níveis para evitar sobreposição, com suporte a camadas negativas (abaixo da linha principal).
- ✅ **Temas e Cores:** Diversos temas de cores para personalização visual, com opção de colorização automática.
- ✅ **Painel Lateral:** Interface para adicionar, editar e visualizar detalhes de períodos/eventos, incluindo busca e upload de imagens.
- ✅ **Exportação/Importação:** Salve e carregue linhas do tempo em arquivos JSON.
- ✅ **Configurações Avançadas:** Ajuste de espaçamento, altura, ano base, raio de eventos, e outras preferências.
- ✅ **Geração Automática de Descrições:** Integração com IA (Cohere) para gerar descrições automáticas de períodos.
- ✅ **Busca de Imagens:** Integração com Unsplash para busca de imagens por palavra-chave.

## 📁 Estrutura de Pastas

```
src/
├── components/
│   ├── infocard/         # Cartão de detalhes de períodos/eventos
│   ├── panels/           # Painéis laterais e toolbar
│   └── timeline/         # Componentes gráficos da linha do tempo
├── data/                 # Temas de cores
├── hooks/                # Hooks customizados (zoom, handlers)
├── lib/                  # Utilitários de datas
├── pages/                # Páginas principais (Timeline)
├── services/             # Integrações externas (Unsplash, Cohere)
├── store/                # Zustand stores (estado global)
├── types/                # Tipos TypeScript (Period, Event)
└── utils/                # Funções utilitárias (cores, camadas, exportação)
```

## 🧩 Principais Componentes

### 1. **TimelineAxis & TimelineStage**

- Renderizam a linha do tempo principal, marcadores de anos, períodos e eventos.
- Suportam zoom, arraste e navegação por teclado.

### 2. **PeriodsLoader & EventsLoader**

- Carregam e renderizam todos os períodos e eventos salvos.

### 3. **Period & Event**

- Representam visualmente cada período (como um retângulo) e evento (círculo) na linha do tempo.
- Suportam interações: hover (mostra detalhes), clique (abre painel de edição).

### 4. **InfoCard**

- Exibe detalhes do período/evento selecionado, com opção de deletar.

### 5. **SidePanel**

- Painel lateral para adicionar ou editar períodos/eventos.
- Suporte a seleção de tipo (período/evento), cor, imagem (link, busca, upload), datas e descrição.
- Integração com IA para gerar descrições automáticas.

### 6. **Toolbar**

- Barra superior com botões para criar itens, exportar/importar, colorir, ajustar camadas e acessar configurações.

### 7. **SettingsModal**

- Modal de configurações para ajustar parâmetros visuais e funcionais da linha do tempo.

## 🧠 Gerenciamento de Estado

- **Zustand** é utilizado para gerenciar o estado global de:
  - Períodos e eventos (`periodsEventsLoaderStore`)
  - Configurações da timeline (`settingsStore`)
  - Estado do painel lateral (`sidePanelStore`)
  - Detalhes em foco (`detailsBalloonStore`)
  - Controle de zoom e posição do stage (`stageControlsStore`)

## 🧾 Tipos Principais

```typescript
// Period
interface Period {
  id: string;
  title: string;
  description: string;
  image: string;
  color: string;
  start: SimpleDate;
  end: SimpleDate;
  level: number;
}

// Event
interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  color: string;
  date: SimpleDate;
}
```

## 🧪 Exemplo de JSON Exportado

```json
{
  "id": "01K19T51ZH3F654H1S8SK69PES",
  "title": "Pandemia",
  "description": "Em 11 de março de 2020, a COVID-19 foi caracterizada pela OMS como uma pandemia, devido à ampla distribuição geográfica da doença no mundo. Em 5 de maio de 2023, a OMS declarou o fim da Emergência de Saúde Pública de Importância Internacional (ESPII) referente à COVID-19.",
  "image": "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2OTY4NTF8MHwxfHNlYXJjaHwyfHxQYW5kZW1pYXxlbnwwfHx8fDE3NTM3NDk2MjR8MA&ixlib=rb-4.1.0&q=80&w=400",
  "color": "#225c77",
  "start": "2019-01-01",
  "end": "2021-01-01",
  "level": 1
}
```

## 🔄 Fluxo de Uso

1. **Adicionar Período/Evento:** Clique em "Criar" na toolbar, preencha o formulário no painel lateral e salve.
2. **Editar:** Clique em um período/evento na linha do tempo para abrir o painel de edição.
3. **Visualizar Detalhes:** Passe o mouse sobre um item para ver o InfoCard.
4. **Exportar/Importar:** Use os ícones de download/upload na toolbar.
5. **Configurações:** Ajuste temas, espaçamentos, camadas e outras preferências no modal de configurações.

## 🎨 Customização

- 🖍️ **Temas:** Escolha entre vários temas de cores ou crie o seu.
- 📐 **Camadas:** Ative camadas negativas para períodos abaixo da linha principal.
- 🖌️ **Colorização Automática:** Habilite para colorir automaticamente ao criar novos itens.
- 🔧 **Ajuste de Layout:** Modifique altura dos períodos, espaçamento, raio dos eventos, ano base, etc.

## 🌐 Integrações

- **Unsplash:** Busca de imagens para períodos/eventos.
- **Cohere:** Geração automática de descrições em português.

## 📤 Exportação/Importação

- **Exportar:** Salva períodos e eventos em um arquivo JSON.
- **Importar:** Carrega um arquivo JSON e atualiza a linha do tempo.

## 🛠️ Tecnologias Utilizadas

- **React** (com TypeScript)
- **Zustand** (estado global)
- **react-konva** (canvas interativo)
- **Axios** (requisições HTTP)
- **ULID** (IDs únicos)
- **Cohere API** (IA para texto)
- **Unsplash API** (imagens)

## 🖥️ Como Rodar Localmente

1. Instale as dependências:
   ```
   npm install
   ```
2. Configure as chaves de API (Unsplash e Cohere) em .env.
3. Rode o projeto:
   ```
   npm run dev
   ```
4. Acesse em `http://localhost:3000` (ou porta configurada).

## ❗ Notes & FAQ

### ❓ Como adiciono um período ou evento na linha do tempo?

Basta clicar no botão "Criar" na barra superior (`Toolbar`). Em seguida, preencha os campos no painel lateral com título, descrição, datas, imagem e cor. Escolha se é um evento ou período, salve — e pronto!

### ❓ O que é a geração automática de descrições e como funciona?

A Timeline está integrada à API da **Cohere**, uma inteligência artificial que pode gerar descrições automáticas para eventos ou períodos com base no título e nas datas informadas. Essa funcionalidade está disponível no painel lateral ao editar ou criar um item.

### ❓ Posso exportar minha linha do tempo e compartilhar com outros usuários?

Sim! Você pode usar a função de exportação para salvar sua linha do tempo como um arquivo `JSON`. Esse arquivo pode ser compartilhado ou reimportado por outros usuários na mesma aplicação, preservando todos os dados e configurações

## 🤝 Contribution

Contributions are welcome! Follow these steps:

1. Fork this repository.
2. Create a new branch (`git checkout -b feature-my-feature`).
3. Commit your changes (`git commit -m 'Add my feature'`).
4. Push to the branch (`git push origin feature-my-feature`).
5. Open a Pull Request.

---

Developed with 💙 by [Guilherme Roesler](https://github.com/GuilhermeRoesler)
