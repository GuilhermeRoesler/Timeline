# AI Development Rules for Timeline App

This document provides guidelines for the AI assistant working on this project. Following these rules ensures code consistency, maintainability, and adherence to the project's architectural decisions.

## Tech Stack Overview

This is a React application built with Vite. The key technologies are:

-   **Framework**: React with TypeScript for a robust and type-safe codebase.
-   **State Management**: Zustand is used for simple, centralized, hook-based state management.
-   **Styling**: Tailwind CSS is the primary tool for utility-first styling.
-   **UI Components**: The application uses shadcn/ui components for a consistent and accessible design system.
-   **Graphics & Canvas**: `react-konva` is used to render the interactive timeline visualization.
-   **API Communication**: Axios is the designated HTTP client for all API requests.
-   **Icons**: `lucide-react` is the standard icon library for the project.
-   **Date Handling**: A custom `SimpleDate` class ensures consistent date formatting and manipulation.

## Library Usage Rules

### 1. UI Components: Use shadcn/ui

-   **Rule**: For all new UI elements like buttons, dialogs, inputs, and cards, you **MUST** use components from the **shadcn/ui** library.
-   **Reason**: To maintain a consistent design system and leverage pre-built, accessible components.
-   **Don't**: Do not create custom components from scratch if a shadcn/ui alternative exists. Do not style components with plain CSS files; use Tailwind CSS utility classes.

### 2. State Management: Use Zustand

-   **Rule**: All global or shared state **MUST** be managed with **Zustand**. Create separate stores (`...Store.tsx`) for different logical domains (e.g., `sidePanelStore`, `settingsStore`).
-   **Reason**: To keep state management predictable, simple, and decoupled from components.
-   **Don't**: Do not use React Context, Redux, or other state management libraries. Avoid prop drilling.

### 3. API Calls: Use the Global Axios Instance

-   **Rule**: All API requests **MUST** use the pre-configured **Axios** instance from `src/store/globalConfigStore.tsx`.
-   **Reason**: To centralize API configuration (base URL, credentials) and ensure consistency across the app.
-   **Don't**: Do not use the native `fetch` API or install other HTTP clients.

### 4. Icons: Use `lucide-react`

-   **Rule**: All icons **MUST** come from the **`lucide-react`** library.
-   **Reason**: To ensure a consistent and high-quality visual style for all icons.
-   **Don't**: Do not use Font Awesome, Material Symbols, or import raw SVG files. When modifying a component, replace any existing icons from other libraries with `lucide-react` icons.

### 5. Timeline Graphics: Use `react-konva`

-   **Rule**: All rendering on the timeline canvas **MUST** be done using **`react-konva`** components (`<Stage>`, `<Layer>`, `<Rect>`, etc.).
-   **Reason**: To leverage the performance and interactivity of the Konva framework for our specific use case.
-   **Don't**: Do not attempt to mix canvas rendering with standard DOM elements for the core timeline visualization.

### 6. Dates: Use the `SimpleDate` Class

-   **Rule**: You **MUST** use the `SimpleDate` class from `src/lib/SimpleDate.ts` for creating and manipulating dates within the application's logic.
-   **Reason**: To ensure a consistent date format (`YYYY-MM-DD`) and simplify date operations.
-   **Don't**: Do not use the native JavaScript `Date` object directly for business logic, as it can be inconsistent with timezones.