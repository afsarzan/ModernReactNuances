import { Routes, Route } from "react-router-dom";

import { lazy, Suspense } from "react";

// ⏸️ WORKSHOP STEP 8: Add Error Boundary
// TODO: Import ErrorBoundary component

import Header from "./components/Header.jsx";
import Spinner from "./components/Spinner.jsx";
import { ApiKeyProvider } from "./context/ApiKeyContext.jsx";

const GeneratorPage = lazy(() => import("./pages/GeneratorPage.jsx"));
const GalleryPage = lazy(() => import("./pages/GalleryPage.jsx"));

// ⏸️ WORKSHOP STEP 7: Replace above with lazy loading
// const GeneratorPage = lazy(() => import('./pages/GeneratorPage.jsx'))
// const GalleryPage = lazy(() => import('./pages/GalleryPage.jsx'))

export default function App() {
  return (
    <ApiKeyProvider>
      {/* ⏸️ WORKSHOP STEP 8: Wrap in ErrorBoundary */}
      <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 transition-colors">
        <Header />
        <main className="flex-1 container mx-auto p-4 lg:p-8">
          <Suspense fallback={<Spinner label="Loading page..." />}>
            <Routes>
              <Route path="/" element={<GeneratorPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </ApiKeyProvider>
  );
}
