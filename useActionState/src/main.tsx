import { StrictMode, lazy, Suspense, Profiler } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { onRender } from "./onRenderProfile";
import { PictureProvider } from "./picture context/createPictureContext";
import "./main.css";
import Background from "./pages/Background";
import FormPage from "./pages/FormPage";
const TicketPage = lazy(() => import("./pages/TicketPage"));

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Profiler onRender={onRender} id="main">
      <PictureProvider>
        <BrowserRouter>
          <Suspense fallback={<p>loading.....</p>}>
            {/* Layout route */}
            <Routes>
              <Route element={<Background />}>
                <Route index element={<FormPage />} />
                <Route path="/ticket" element={<TicketPage />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </PictureProvider>
    </Profiler>
  </StrictMode>
);
