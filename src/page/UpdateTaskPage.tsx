import { Button } from "../components/button";
import { Dropdown } from "../components/dropdown";
import { Field } from "../components/field";
import { Input } from "../components/input";
import { Label } from "../components/label";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Select } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DashboardSidebar from "../module/dashboard/DashboardSidebar";
import DashboardMain from "../module/dashboard/DashboardMain";
import {
  getAllPriority,
  getAllProject,
  getAllStatus,
  getAllTaskType,
  getUser,
  updateTaskInfo,
} from "../redux/auth/auth-slice";
import { useNavigate } from "react-router-dom";
import { TASK_ID } from "../utils/varSetting";

const UpdateTaskPage = () => {
  const { userList, statusArr, priority, taskTypeArr, taskInfo } = useSelector(
    (state: any) => state.auth,
  );
  const { control, handleSubmit, reset } = useForm({
    mode: "onSubmit",
    defaultValues: {
      projectId: taskInfo?.projectId,
      taskName: taskInfo?.taskName,
      description: taskInfo?.description,
      originalEstimate: taskInfo?.originalEstimate,
      timeTrackingSpent: taskInfo?.timeTrackingSpent,
      timeTrackingRemaining: taskInfo?.timeTrackingRemaining,
      typeId: taskInfo?.typeId,
      priorityId: taskInfo?.priorityId,
    },
  });
  useEffect(() => {
    if (taskInfo) {
      reset({
        projectId: taskInfo?.projectId,
        taskName: taskInfo?.taskName,
        description: desc || taskInfo?.description,
        originalEstimate: taskInfo?.originalEstimate,
        timeTrackingSpent: taskInfo?.timeTrackingSpent,
        timeTrackingRemaining: taskInfo?.timeTrackingRemaining,
        typeId: taskInfo?.typeId,
        priorityId: taskInfo?.priorityId,
      });
    }
  }, []);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProject());
    dispatch(getUser());
    dispatch(getAllStatus());
    dispatch(getAllPriority());
    dispatch(getAllTaskType());
  }, [dispatch]);
  const [selectStatus, setSelectStatus] = useState(taskInfo?.statusId);
  const [selectPriority, setSelectPriority] = useState("");
  const [selectTaskType, setSelectTaskType] = useState("");
  const handleClickStatus = (item: any) => {
    setSelectStatus(item);
  };
  const handleClickPriority = (item: any) => {
    setSelectPriority(item);
  };
  const handleClickTaskType = (item: any) => {
    setSelectTaskType(item);
  };
  function handleValue(value: string, defaultValue: string) {
    if (value !== "") {
      return value;
    } else {
      return defaultValue;
    }
  }
  let OPTIONS: string[] = [];
  if (userList && userList?.length > 0) {
    for (let i = 0; i <= userList.length; i++) {
      OPTIONS.push(userList[i]?.name);
    }
    OPTIONS = [...new Set(OPTIONS)];
  }
  const [desc, setDesc] = useState("");
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
  const handleUpdateTask = (values: any) => {
    let taskId = localStorage.getItem(TASK_ID);
    let value = {
      ...values,
      listUserAsign: [0],
      taskId: Number(taskId),
      description: desc || taskInfo?.description,
      statusId: selectStatus?.statusId || taskInfo?.statusId,
      originalEstimate:
        Number(values.originalEstimate) || taskInfo?.originalEstimate,
      timeTrackingSpent:
        Number(values.timeTrackingSpent) || taskInfo?.timeTrackingSpent,
      timeTrackingRemaining:
        Number(values.timeTrackingRemaining) || taskInfo?.timeTrackingRemaining,
      typeId: Number(selectTaskType?.id) || taskInfo?.typeId,
      priorityId: Number(selectPriority?.priorityId) || taskInfo?.priorityId,
    };
    console.log(value);
    dispatch(updateTaskInfo(value));
    localStorage.removeItem(TASK_ID);
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (!taskInfo) {
      navigate("/createtask");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);
  return (
    <div className=" min-h-screen flex justify-start">
      <DashboardSidebar></DashboardSidebar>
      <DashboardMain></DashboardMain>
      <div className="p-10 flex-1">
        <h1 className="text-3xl font-medium">Edit Task</h1>
        <form onSubmit={handleSubmit(handleUpdateTask)}>
          <div className="mt-10 flex flex-col">
            <Field kind="full">
              <Label>Project</Label>
              <Input control={control} name="projectId" disabled></Input>
            </Field>
            <Field kind="full">
              <Label>Task name</Label>
              <Input control={control} name="taskName"></Input>
            </Field>
            <Field kind="full">
              <Label>Status</Label>
              <Dropdown>
                <Dropdown.Select
                  placeholder={selectStatus?.statusName}
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
                    placeholder={
                      selectPriority?.priority || taskInfo?.priorityId
                    }
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
                <Label>TaskType</Label>
                <Dropdown>
                  <Dropdown.Select
                    placeholder={selectTaskType?.taskType || taskInfo?.typeId}
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
                  placeholder="Inserted are removed"
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
                <Label>Time tracking</Label>
                <div className="relative progress">
                  <input
                    type="range"
                    id="progress-bar"
                    min="0"
                    max="100%"
                    defaultValue="0"
                    className="bar"
                  ></input>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-x-5 mt-10">
              <div className="w-2/4">
                <Label>Oririnal Estimate</Label>
                <Input control={control} name="originalEstimate"></Input>
              </div>
              <div className="w-2/4 flex items-center gap-x-3">
                <div className="w-2/4">
                  <Label>Oh longged Time spent</Label>
                  <Input control={control} name="timeTrackingSpent"></Input>
                </div>
                <div className="w-2/4">
                  <Label>Oh remaining Time remaining</Label>
                  <Input control={control} name="timeTrackingRemaining"></Input>
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
                    value={handleValue(desc, taskInfo?.description)}
                    onChange={setDesc}
                  />
                </div>
              </Field>
              <Button
                type="submit"
                className="bg-blue-500 text-white text-xl h-[50px] px-8 ml-auto block"
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

export default UpdateTaskPage;
