import { http } from "../../utils/setting";
import { TOKEN } from "../../utils/varSetting";

export const requestAuthRegister = (data: any) => {
  return http.post("/Users/signup", {
    ...data,
  });
};

export const requestAuthLogin = (data: any) => {
  return http.post("/Users/signin", {
    ...data,
  });
};

export const requestGetAllProject = () => {
  return http.get("/Project/getAllProject");
};

export const requestProjectCategory = () => {
  return http.get("/ProjectCategory");
};

export const requestCreateProjectCategory = (data: any) => {
  const token = localStorage.getItem(TOKEN);
  return http.post("/Project/createProjectAuthorize", data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const requestGetProjectDetail = (data: any) => {
  const token = localStorage.getItem(TOKEN);
  return http.get(`/Project/getProjectDetail?id=${data.id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const requestUpdateProject = (data: any) => {
  const token = localStorage.getItem(TOKEN);
  return http.put(`/Project/updateProject?projectId=${data.id}`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const requestAllStatus = () => {
  const token = localStorage.getItem(TOKEN);
  return http.get(`/Status/getAll`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const requestAllPriority = () => {
  const token = localStorage.getItem(TOKEN);
  return http.get(`/Priority/getAll`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const requestAllTaskType = () => {
  const token = localStorage.getItem(TOKEN);
  return http.get(`/TaskType/getAll`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const requestGetUser = () => {
  const token = localStorage.getItem(TOKEN);
  return http.get(`/Users/getUser `, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const requestCreateTask = (data: any) => {
  const token = localStorage.getItem(TOKEN);
  return http.post(`/Project/createTask `, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const requestGetTaskDetail = (data: any) => {
  const token = localStorage.getItem(TOKEN);
  return http.get(`/Project/getTaskDetail?taskId=${data.id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const requestUpdateTaskInfo = (data: any) => {
  const token = localStorage.getItem(TOKEN);
  return http.post(`/Project/createTask`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
