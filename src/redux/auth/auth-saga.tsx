import { takeLatest } from "redux-saga/effects";
import handleAuthRegister, {
  handleAuthLogin,
  handleCreateProjectCategory,
  handleCreateTask,
  handleGetAllPriority,
  handleGetAllProject,
  handleGetAllStatus,
  handleGetAllTaskType,
  handleGetProjectCategory,
  handleGetProjectDetail,
  handleGetUser,
  handleUpdateProject,
} from "./auth-handlers";
import {
  authLogin,
  authRegister,
  createProjectCategory,
  createTask,
  getAllPriority,
  getAllProject,
  getAllStatus,
  getAllTaskType,
  getProjectCategory,
  getProjectDetail,
  getUser,
  updateProjectInfo,
  updateTaskInfo,
} from "./auth-slice";

export default function* authSaga() {
  yield takeLatest(authRegister.type, handleAuthRegister);
  yield takeLatest(authLogin.type, handleAuthLogin);
  yield takeLatest(getAllProject.type, handleGetAllProject);
  yield takeLatest(getProjectCategory.type, handleGetProjectCategory);
  yield takeLatest(createProjectCategory.type, handleCreateProjectCategory);
  yield takeLatest(getProjectDetail.type, handleGetProjectDetail);
  yield takeLatest(updateProjectInfo.type, handleUpdateProject);
  yield takeLatest(getAllStatus.type, handleGetAllStatus);
  yield takeLatest(getAllPriority.type, handleGetAllPriority);
  yield takeLatest(getAllTaskType.type, handleGetAllTaskType);
  yield takeLatest(getUser.type, handleGetUser);
  yield takeLatest(createTask.type, handleCreateTask);
  yield takeLatest(updateTaskInfo.type, handleCreateTask);
}
