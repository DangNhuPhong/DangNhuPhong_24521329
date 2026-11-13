import { Routes, Route } from "react-router";
import AppLayout from "./layouts/AppLayout.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<p>Choose an exercise in the navigation.</p>} />

        <Route path="*" element={<h2>404: Page not found</h2>} />
      </Route>
    </Routes>
  );
}
