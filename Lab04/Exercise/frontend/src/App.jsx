import { Routes, Route } from "react-router";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Lab 04 Exercise</h1>} />

      <Route path="*" element={<h1>404: Page not found</h1>} />
    </Routes>
  );
}
