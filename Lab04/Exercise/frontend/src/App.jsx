import { Routes, Route } from "react-router";
import AppLayout from "./layouts/AppLayout.jsx";
import PeopleLayout from "./people/PeopleLayout.jsx";
import { people } from "./data/people.js";
import PersonDetail from "./people/PersonDetail.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<p>Choose an exercise in the navigation.</p>} />
        <Route path="people" element={<PeopleLayout people={people} />}>
          <Route index element={<p>Select a person from the directory.</p>} />

          <Route path=":id" element={<PersonDetail />} />
        </Route>
        <Route path="*" element={<h2>404: Page not found</h2>} />
      </Route>
    </Routes>
  );
}
