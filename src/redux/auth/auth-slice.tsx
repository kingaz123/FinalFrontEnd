import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: any;
  accessToken: null | string;
  projectList: any[];
  projectCategory: any[];
  projectDetail: any;
  projectInfo: any;
  statusArr: any[];
  priority: any[];
  taskTypeArr: any[];
  userList: any[];
  taskInfo: any[];
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  projectList: [],
  projectCategory: [],
  projectDetail: null,
  projectInfo: null,
  statusArr: [],
  priority: [],
  taskTypeArr: [],
  userList: [],
  taskInfo: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authLogin: (state) => state,
    authRegister: (state, action: PayloadAction<any>) => ({
      ...state,
      ...action.payload,
    }),
    authUpdateUser: (state, action: PayloadAction<any>) => ({
      ...state,
      user: action.payload.user,
      accessToken: action.payload.accessToken,
    }),
    getAllProject: (state) => state,
    updateAllProJect: (state, action: PayloadAction<any>) => ({
      ...state,
      projectList: action.payload.projectList,
    }),
    getProjectCategory: (state) => state,
    updateProjectCategory: (state, action: PayloadAction<any>) => ({
      ...state,
      projectCategory: action.payload.projectCategory,
    }),
    createProjectCategory: (state) => state,
    getProjectDetail: (state) => state,
    updateProjectDetail: (state, action: PayloadAction<any>) => ({
      ...state,
      projectDetail: action.payload.projectDetail,
    }),
    updateProjectInfo: (state, action: PayloadAction<any>) => ({
      ...state,
      projectInfo: action.payload.projectInfo,
    }),
    getAllStatus: (state) => state,
    getAllPriority: (state) => state,
    getAllTaskType: (state) => state,
    updateAllStatus: (state, action: PayloadAction<any>) => ({
      ...state,
      statusArr: action.payload.statusArr,
    }),
    updateAllPriority: (state, action: PayloadAction<any>) => ({
      ...state,
      priority: action.payload.priority,
    }),
    updateAllTaskType: (state, action: PayloadAction<any>) => ({
      ...state,
      taskTypeArr: action.payload.taskTypeArr,
    }),
    getUser: (state) => state,
    updateUser: (state, action: PayloadAction<any>) => ({
      ...state,
      userList: action.payload.userList,
    }),
    createTask: (state) => state,
    updateTask: (state, action: PayloadAction<any>) => ({
      ...state,
      taskInfo: action.payload.taskInfo,
    }),
    updateTaskInfo: (state) => state,
  },
});

export const {
  authLogin,
  authRegister,
  authUpdateUser,
  getAllProject,
  updateAllProJect,
  getProjectCategory,
  updateProjectCategory,
  createProjectCategory,
  getProjectDetail,
  updateProjectDetail,
  updateProjectInfo,
  getAllStatus,
  getAllPriority,
  getAllTaskType,
  updateAllStatus,
  updateAllPriority,
  updateAllTaskType,
  getUser,
  updateUser,
  createTask,
  updateTask,
  updateTaskInfo,
} = authSlice.actions;

export default authSlice.reducer;
