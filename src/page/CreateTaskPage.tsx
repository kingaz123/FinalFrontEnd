import { Dropdown } from "../components/dropdown";
import { Field } from "../components/field";
import { Input } from "../components/input";
import { Label } from "../components/label";
import DashboardMain from "../module/dashboard/DashboardMain";
import DashboardSidebar from "../module/dashboard/DashboardSidebar";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createTask,
  getAllPriority,
  getAllProject,
  getAllStatus,
  getAllTaskType,
  getUser,
} from "../redux/auth/auth-slice";
import { Select } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button } from "../components/button";
import { NavLink } from "react-router-dom";

const CreateTaskPage = () => {
  const { projectList, userList, statusArr, priority, taskTypeArr, taskInfo } =
    useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const { control, handleSubmit, reset } = useForm({
    mode: "onSubmit",
  });
  useEffect(() => {
    dispatch(getAllProject());
    dispatch(getUser());
    dispatch(getAllStatus());
    dispatch(getAllPriority());
    dispatch(getAllTaskType());
  }, [dispatch]);
  const [project, setProject] = useState<any>("");
  const [selectStatus, setSelectStatus] = useState<any>("");
  const [selectPriority, setSelectPriority] = useState<any>("");
  const [selectTaskType, setSelectTaskType] = useState<any>("");
  const handleClickOption = (item: any) => {
    setProject(item);
  };
  const handleClickStatus = (item: any) => {
    setSelectStatus(item);
  };
  const handleClickPriority = (item: any) => {
    setSelectPriority(item);
  };
  const handleClickTaskType = (item: any) => {
    setSelectTaskType(item);
  };
  let OPTIONS: string[] = [];
  if (userList && userList?.length > 0) {
    for (let i = 0; i <= userList.length; i++) {
      OPTIONS.push(userList[i]?.name);
    }
    OPTIONS = [...new Set(OPTIONS)];
  }
  const [description, setDescription] = useState<any>({});
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));
  const modules = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["link", "image"],
      ],
    }),
    [],
  );
  const handleReset = () => {
    setDescription("");
    setSelectedItems([]);
    setProject("");
    setSelectStatus("");
    setSelectPriority("");
    setSelectTaskType("");
    reset({});
  };
  const handleCreateTask = async (values: any) => {
    try {
      let value = {
        ...values,
        listUserAsign: [0],
        description,
        statusId: selectStatus?.statusId,
        originalEstimate: Number(values.originalEstimate),
        timeTrackingSpent: Number(values.timeTrackingSpent),
        timeTrackingRemaining: Number(values.timeTrackingRemaining),
        projectId: Number(project?.id),
        projectName: project?.projectName,
        typeId: Number(selectTaskType?.id),
        priorityId: Number(selectPriority?.priorityId),
      };
      dispatch(createTask(value));
      handleReset();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" min-h-screen flex justify-start">
      <DashboardSidebar></DashboardSidebar>
      <DashboardMain></DashboardMain>
      <div className="p-10 flex-1">
        <NavLink to={`/edit/task/${taskInfo?.taskId}`}>
          <h1 className="text-3xl font-medium">Create Task</h1>
        </NavLink>
        <form onSubmit={handleSubmit(handleCreateTask)}>
          <div className="mt-10 flex flex-col">
            <Field kind="full">
              <Label>Project</Label>
              <Dropdown>
                <Dropdown.Select
                  placeholder={project?.projectName || "Select project"}
                ></Dropdown.Select>
                <Dropdown.List>
                  <Dropdown.Option>
                    {projectList?.length > 0 &&
                      projectList.map((item: any) => {
                        return (
                          <Dropdown.Option
                            key={item?.id}
                            onClick={() => handleClickOption(item)}
                          >
                            {item?.projectName}
                          </Dropdown.Option>
                        );
                      })}
                  </Dropdown.Option>
                </Dropdown.List>
              </Dropdown>
            </Field>
            <Field kind="full">
              <Label>Task Name</Label>
              <Input control={control} name="taskName"></Input>
            </Field>
            <Field kind="full">
              <Label>Status</Label>
              <Dropdown>
                <Dropdown.Select
                  placeholder={selectStatus?.statusName || "Select status"}
                ></Dropdown.Select>
                <Dropdown.List>
                  <Dropdown.Option>
                    {statusArr?.length > 0 &&
                      statusArr?.map((item: any) => (
                        <Dropdown.Option
                          key={item?.statusId}
                          onClick={() => handleClickStatus(item)}
                        >
                          {item?.statusName}
                        </Dropdown.Option>
                      ))}
                  </Dropdown.Option>
                </Dropdown.List>
              </Dropdown>
            </Field>
            <div className="flex items-center gap-x-10">
              <Field kind="full">
                <Label>Priority</Label>
                <Dropdown>
                  <Dropdown.Select
                    placeholder={selectPriority?.priority || "Select priority"}
                  ></Dropdown.Select>
                  <Dropdown.List>
                    <Dropdown.Option>
                      {priority?.length > 0 &&
                        priority?.map((item: any) => (
                          <Dropdown.Option
                            key={item?.priorityId}
                            onClick={() => handleClickPriority(item)}
                          >
                            {item?.priority}
                          </Dropdown.Option>
                        ))}
                    </Dropdown.Option>
                  </Dropdown.List>
                </Dropdown>
              </Field>
              <Field kind="full">
                <Label>Task Type</Label>
                <Dropdown>
                  <Dropdown.Select
                    placeholder={selectTaskType?.taskType || "Select task type"}
                  ></Dropdown.Select>
                  <Dropdown.List>
                    <Dropdown.Option>
                      {taskTypeArr?.length > 0 &&
                        taskTypeArr.map((item: any) => {
                          return (
                            <Dropdown.Option
                              key={item?.id}
                              onClick={() => handleClickTaskType(item)}
                            >
                              {item?.taskType}
                            </Dropdown.Option>
                          );
                        })}
                    </Dropdown.Option>
                  </Dropdown.List>
                </Dropdown>
              </Field>
            </div>
            <div className="flex items-center gap-x-5">
              <div className="w-2/4">
                <Label>Assigness</Label>
                <Select
                  mode="multiple"
                  placeholder="Select assignees"
                  value={selectedItems}
                  onChange={setSelectedItems}
                  style={{
                    width: "100%",
                    marginTop: "20px",
                  }}
                  options={filteredOptions.map((item) => ({
                    value: item,
                    label: item,
                  }))}
                />
              </div>
              <div className="w-2/4">
                <Label>Time Tracking</Label>
                <div className="relative progress">
                  <input
                    type="range"
                    id="progress-bar"
                    min="0"
                    max="100"
                    defaultValue="0"
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  ></input>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-x-5 mt-10">
              <div className="w-2/4">
                <Label>Original Estimated Time</Label>
                <Input
                  control={control}
                  name="originalEstimate"
                  placeholder={"0"}
                ></Input>
              </div>
              <div className="w-2/4 flex items-center gap-x-3">
                <div className="w-2/4">
                  <Label>Time Spent</Label>
                  <Input
                    control={control}
                    name="timeTrackingSpent"
                    placeholder={"0"}
                  ></Input>
                </div>
                <div className="w-2/4">
                  <Label>Time Remaining</Label>
                  <Input
                    control={control}
                    name="timeTrackingRemaining"
                    placeholder={"0"}
                  ></Input>
                </div>
              </div>
            </div>
            <div className="mt-10">
              <Field kind="full">
                <Label>Description</Label>
                <div className="w-full entry-content">
                  <ReactQuill
                    modules={modules}
                    theme="snow"
                    value={description}
                    onChange={setDescription}
                  />
                </div>
              </Field>
              <Button
                type="submit"
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white text-xl h-[50px] px-8 ml-auto block"
              >
                Submit
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskPage;
