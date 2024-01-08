import { Button } from "../components/button";
import { Dropdown } from "../components/dropdown";
import { Field } from "../components/field";
import { Input } from "../components/input";
import { Label } from "../components/label";
import DashboardMain from "../module/dashboard/DashboardMain";
import DashboardSidebar from "../module/dashboard/DashboardSidebar";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createProjectCategory,
  getProjectCategory,
} from "../redux/auth/auth-slice";
import { USER_NAME } from "../utils/varSetting";

const CreateProjectPage: React.FC = () => {
  const dispatch = useDispatch();
  const [description, setDescription] = useState<string>("");
  const [categoryName, setCategoryName] = useState<string>("Select category");
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm({
    mode: "onSubmit",
  });
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
  useEffect(() => {
    dispatch(getProjectCategory());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { projectCategory } = useSelector((state: RootState) => state.auth);
  const [projectCategories, setProjectCategories] = useState<ProjectCategory[]>(
    [],
  );
  useEffect(() => {
    if (projectCategory) {
      setProjectCategories(projectCategory);
    }
  }, [projectCategory]);
  const handleCreatProject = async (values: ProjectFormValues) => {
    if (!isValid) return;
    const userName = localStorage.getItem(USER_NAME);
    try {
      let valProject: Project = {
        ...values,
        description,
        categoryId: 0,
        alias: values.projectName,
        creator: { id: 0, name: userName },
      };
      dispatch(createProjectCategory(valProject));
      handleResetForm();
    } catch (error) {
      console.log(error);
    }
  };
  const handleResetForm = () => {
    reset({});
    setCategoryName("Select category");
    setDescription("");
  };
  const handleClickOption = async (item: ProjectCategory) => {
    setCategoryName(item.projectCategoryName);
  };
  return (
    <div className=" min-h-screen flex justify-start">
      <DashboardSidebar></DashboardSidebar>
      <DashboardMain></DashboardMain>
      <div className="p-10 flex-1">
        <h1 className="text-3xl font-medium">Create Project</h1>
        <form onSubmit={handleSubmit(handleCreatProject)} className="mt-10">
          <Field kind="full">
            <Label htmlFor="projectName">Project Name</Label>
            <Input name="projectName" control={control}></Input>
          </Field>
          <div className="mb-10">
            <Field kind="full">
              <Label>Project Description</Label>
              <div className="w-full entry-content">
                <ReactQuill
                  modules={modules}
                  theme="snow"
                  value={description}
                  onChange={setDescription}
                />
              </div>
            </Field>
            <Field kind="full">
              <Label>Project Category</Label>
              <Dropdown>
                <Dropdown.Select placeholder={categoryName}></Dropdown.Select>
                <Dropdown.List>
                  <Dropdown.Option>
                    {projectCategories?.length > 0 &&
                      projectCategories.map((item) => {
                        return (
                          <Dropdown.Option
                            key={item?.id}
                            onClick={() => handleClickOption(item)}
                          >
                            {item?.projectCategoryName}
                          </Dropdown.Option>
                        );
                      })}
                  </Dropdown.Option>
                </Dropdown.List>
              </Dropdown>
            </Field>
            <Button
              type="submit"
              className="text-blue-500 border border-blue-500 rounded"
            >
              Create Project
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectPage;
