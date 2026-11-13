import { Routes, Route } from "react-router";
import AppLayout from "./layouts/AppLayout.jsx";
import PeopleLayout from "./people/PeopleLayout.jsx";
import { people } from "./data/people.js";
import { lazy, Suspense } from "react";
import DetailSkeleton from "./components/DetailSkeleton.jsx";
import RouteErrorBoundary from "./components/RouteErrorBoundary.jsx";
import SimpleForm from "./form/SimpleForm.jsx";

const PersonDetail = lazy(() => import("./people/PersonDetail.jsx"));

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<p>Choose an exercise in the navigation.</p>} />
        <Route path="people" element={<PeopleLayout people={people} />}>
          <Route index element={<p>Select a person from the directory.</p>} />

          <Route
            path=":id"
            element={
              <RouteErrorBoundary>
                <Suspense fallback={<DetailSkeleton />}>
                  <PersonDetail />
                </Suspense>
              </RouteErrorBoundary>
            }
          />
        </Route>
        <Route path="form" element={<SimpleForm />} />
        <Route path="*" element={<h2>404: Page not found</h2>} />
      </Route>
    </Routes>
  );
}
