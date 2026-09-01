# 🗓️ Timeline - Build, Explore and Share Your Histories with Style

## 📌 Overview

**Timeline** is an interactive web application for creating, **viewing, and editing historical, scientific, or personal timelines**.

Users can add periods and events, customize **colors, themes, and layers**, and view item details. The project uses React, `Zustand` for state management, and `react-konva` for graphical rendering.

![](public/demo.png)

## ⚙️ Key Features

- ✅ **Create Periods and Events:** Add periods (time spans) and events (specific points) with title, description, color, and image.
- ✅ **Dynamic Visualization:** Scalable timeline with zoom, drag, keyboard navigation, and adaptive year markers.
- ✅ **Smart Layers:** Periods are automatically arranged into different levels to avoid overlap, with support for negative layers (below the main timeline).
- ✅ **Themes and Colors:** Multiple color themes for visual customization, with optional auto-coloring.
- ✅ **Side Panel:** Interface to add, edit, and view period/event details, including image search and upload.
- ✅ **Advanced Settings:** Adjust spacing, height, base year, event radius, and other preferences.
- ✅ **Auto Description Generation:** AI (Google Gemini) integration to generate automatic descriptions for periods.
- ✅ **Image Search:** Unsplash integration for image search by keyword.

## 📁 Folder Structure

```
src/
├── components/
│   ├── infocard/         # Detail card for periods/events
│   ├── panels/           # Side panels and toolbar
│   └── timeline/         # Timeline graphical components
├── data/                 # Color themes and seed data
├── hooks/                # Custom hooks (zoom, handlers)
├── lib/                  # Date utilities
├── pages/                # Main pages (Timeline, Login, Register)
├── services/             # API and external integrations (Unsplash, Gemini)
├── store/                # Zustand stores (global state)
├── types/                # TypeScript types (Period, Event)
└── utils/                # Utility functions (colors, layers)
```

## 🧩 Main Components

### 1. **TimelineAxis & TimelineStage**

- Render the main timeline, year markers, periods, and events.
- Support zoom, drag, and keyboard navigation.

### 2. **PeriodsLoader & EventsLoader**

- Load and render all saved periods and events.

### 3. **Period & Event**

- Visually represent each period (rectangle) and event (circle) on the timeline.
- Support interactions: hover (show details), click (open edit panel).

### 4. **InfoCard**

- Displays details of the selected period/event, with delete option.

### 5. **SidePanel**

- Side panel for adding or editing periods/events.
- Supports selecting type (period/event), color, image (link, search, upload), dates, and description.
- Integrated with AI to generate automatic descriptions.

### 6. **Toolbar**

- Top bar with buttons to create items, colorize, adjust layers, and access settings.

### 7. **SettingsModal**

- Settings modal to adjust visual and functional parameters of the timeline.

## 🧠 State Management

- **Zustand** is used to manage the global state of:
    - Periods (`periodsStore`)
    - Events (`eventsStore`)
    - Timeline settings (`settingsStore`)
    - Side panel state (`sidePanelStore`)
    - Focused detail cards (`detailsBalloonStore`)
    - Zoom and stage position (`stageControlsStore`)

## 🧾 Main Types

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

## 🔄 Usage Flow

1. **Add Period/Event:** Click "Create" in the toolbar, fill the form in the side panel, and save.
2. **Edit:** Click on a period/event on the timeline to open the editing panel.
3. **View Details:** Hover over an item to see the InfoCard.
4. **Settings:** Adjust themes, spacing, layers, and other preferences in the settings modal.

## 🎨 Customization

- 🖍️ **Themes:** Choose from several color themes or create your own.
- 📐 **Layers:** Enable negative layers for periods below the main line.
- 🖌️ **Auto Coloring:** Automatically color new items upon creation.
- 🔧 **Layout Adjustment:** Modify period height, spacing, event radius, base year, year spacing, and more.

## 🌐 Integrations

- **Unsplash:** Image search for periods/events.
- **Google Gemini:** Automatic description generation in Portuguese.

## 🛠️ Technologies Used

- **React** (with TypeScript)
- **Zustand** (global state)
- **react-konva** (interactive canvas)
- **Axios** (HTTP requests)
- **Tailwind CSS v4** (styling)
- **Google Gemini API** (AI for text)
- **Unsplash API** (images)

## 🖥️ Running Locally

1. Install dependencies:

    ```bash
    npm install
    ```

2. Copy the environment template and fill in your API keys:

    ```bash
    cp .env.example .env
    ```

    Required variables:

    | Variable                | Description                                         |
    | ----------------------- | --------------------------------------------------- |
    | `VITE_API_URL`          | Backend API URL (default: `http://localhost:8000/`) |
    | `VITE_UNSPLASH_API_KEY` | Unsplash API key for image search                   |
    | `VITE_GEMINI_API_KEY`   | Google Gemini API key for description generation    |

3. Run the project:

    ```bash
    npm run dev
    ```

4. Open in `http://localhost:5173`.

## ❗ Notes & FAQ

### ❓ How do I add a period or event to the timeline?

Click the "Create" button on the top toolbar. Then, fill out the side panel form with title, description, dates, image, and color. Choose between event or period, save — and done!

### ❓ What is auto description generation and how does it work?

Timeline is integrated with the **Google Gemini** API, which can generate automatic descriptions for events or periods based on their title. This feature is available in the side panel while editing or creating an item.

## 🤝 Contribution

Contributions are welcome! Follow these steps:

1. Fork this repository.
2. Create a new branch (`git checkout -b feature-my-feature`).
3. Commit your changes (`git commit -m 'Add my feature'`).
4. Push to the branch (`git push origin feature-my-feature`).
5. Open a Pull Request.

---

Developed with 💙 by [Guilherme Roesler](https://github.com/GuilhermeRoesler)
