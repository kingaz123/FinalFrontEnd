import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import ProjectDetailPage from "./page/ProjectDetailPage";
import NotFoundPage from "./page/NotFoundPage";

const RegisterPage = lazy(() => import("./page/RegisterPage"));
const LoginPage = lazy(() => import("./page/LoginPage"));
const ProjectManagement = lazy(() => import("./page/ProjectManagement"));
const CreateProjectPage = lazy(() => import("./page/CreateProjectPage"));
const CreateTaskPage = lazy(() => import("./page/CreateTaskPage"));
const UpdateTaskPage = lazy(() => import("./page/UpdateTaskPage"));

function App(): JSX.Element {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route
          path="/"
          element={<ProjectManagement></ProjectManagement>}
        ></Route>
        <Route
          path="/createproject"
          element={<CreateProjectPage></CreateProjectPage>}
        ></Route>
        <Route
          path="/edit/:id"
          element={<ProjectDetailPage></ProjectDetailPage>}
        ></Route>
        <Route
          path="/createtask"
          element={<CreateTaskPage></CreateTaskPage>}
        ></Route>
        <Route
          path="/edit/task/:id"
          element={<UpdateTaskPage></UpdateTaskPage>}
        ></Route>
        <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>
        <Route path="/login" element={<LoginPage></LoginPage>}></Route>
        <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
      </Routes>
    </Suspense>
  );
}

export default App;
