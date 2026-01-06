# 🛍️ ShopVibe - Product Catalog (Evaluasi Pekanan)

ShopVibe is a modern Product Catalog application built with **React**, **TypeScript**, and **Tailwind CSS**. It serves as the weekly evaluation project for Module 2 (State Management & Hooks), demonstrating advanced state management patterns using `useContext` and `useReducer`.

## ✨ Features

- **Product Listing**: Fetches and displays products dynamically from [FakeStoreAPI](https://fakestoreapi.com/).
- **Category Filter**: Filter products by their specific categories.
- **Search Functionality**: Real-time product search by title.
- **Shopping Cart**:
  - Add items to the cart.
  - Sidebar cart view with item summary.
  - Live total price calculation.
  - Increment/Decrement quantity (logic implemented in reducer).
- **Dark Mode**: Fully functional dark/light theme toggle using Tailwind CSS dark mode classes.
- **Responsive Design**: Mobile-friendly layout with a responsive grid system.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **State Management**: Context API + useReducer

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1.  **Clone the repository** (if applicable) or navigate to the project directory:
    ```bash
    cd evaluasi_pekanan
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

### Running the Application

Start the development server:

```bash
npm run dev
```

 > **Note for Windows Users:** If you are running this from a directory path containing `&` (e.g., `2-State_Management_&_Hooks`), use Git Bash or PowerShell, or ensure `npm run dev` executes the node script directly as configured in this project's `package.json`.

The application will be available at usually `http://localhost:5173/`.

### Building for Production

To create a production-ready build:

```bash
npm run build
```

## 📂 Project Structure

```
src/
├── components/
│   └── ProductCard.tsx       # Reusable product card component
├── context/
│   └── StoreContext.tsx      # Global state provider (Context)
├── reducers/
│   └── storeReducer.ts       # Reducer logic for Theme and Cart
├── types/
│   └── index.ts              # TypeScript interfaces and types
├── AppContent.tsx            # Main application layout and logic
├── App.tsx                   # Application Entry point with Providers
├── index.css                 # Global styles and Tailwind imports
└── main.tsx                  # React DOM rendering
```

## 📝 Evaluation Criteria Met

- [x] **Functional Components**: Used functional components throughout.
- [x] **Hooks Usage**: Implemented `useState`, `useEffect`, `useContext`, and `useReducer`.
- [x] **API Integration**: Data fetching with `axios` inside `useEffect`.
- [x] **State Management**: Global state for Theme and Cart without external libraries (Redux/Zustand), strictly using Context + Reducer.
- [x] **Styling**: Clean, responsive UI with Tailwind CSS.
- [x] **TypeScript**: Strong typing for all props, states, and API responses.

---

Created by **Rizkiansyah Alfin** as part of the React Programmer Evaluation.
