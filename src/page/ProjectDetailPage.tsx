import { Dropdown } from "../components/dropdown";
import { Field } from "../components/field";
import { Input } from "../components/input";
import { Label } from "../components/label";
import DashboardMain from "../module/dashboard/DashboardMain";
import DashboardSidebar from "../module/dashboard/DashboardSidebar";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getProjectCategory,
  getProjectDetail,
  updateProjectInfo,
} from "../redux/auth/auth-slice";
import { Button } from "../components/button";

const ProjectDetailPage = () => {
  const { projectDetail } = useSelector((state: any) => state.auth);
  console.log(projectDetail);
  const [categoryName, setCategoryName] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  let { id } = useParams();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const value = { id: id };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProjectDetail(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    dispatch(getProjectCategory());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { projectCategory } = useSelector((state: any) => state.auth);
  const { control, handleSubmit, reset } = useForm({
    mode: "onSubmit",
    defaultValues: {
      id: projectDetail?.id,
      projectName: projectDetail?.projectName,
      categoryId: categoryId || projectCategory?.id,
      creator: projectDetail?.creator?.id,
      description: description,
    },
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
  const handleClickOption = async (item: any) => {
    setCategoryId(item.id);
    setCategoryName(item.projectCategoryName);
  };
  function handleValue(value: string, defaultValue: string) {
    if (value !== "") {
      return value;
    } else {
      return defaultValue;
    }
  }
  const handleEditProject = async (values: any) => {
    console.log(values);
    try {
      let value = {
        ...values,
        id: projectDetail?.id,
        projectName: values.projectName,
        categoryId: categoryId || projectDetail?.projectCategory?.id,
        creator: projectDetail?.creator?.id,
        description: description || projectDetail.description,
      };
      dispatch(updateProjectInfo(value));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (projectDetail) {
      reset({
        id: projectDetail?.id,
        projectName: projectDetail?.projectName,
        categoryId: categoryId || projectDetail?.projectCategory?.id,
        creator: projectDetail?.creator?.id,
        description: description || projectDetail.description,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectDetail]);
  return (
    <div className=" min-h-screen flex justify-start">
      <DashboardSidebar></DashboardSidebar>
      <DashboardMain></DashboardMain>
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-medium">Edit Project</h1>
        <form onSubmit={handleSubmit(handleEditProject)}>
          {projectDetail && (
            <Fragment>
              <div className="flex items-center gap-x-5 mt-10">
                <Field>
                  <Label>Project Id</Label>
                  <Input control={control} name="id" disabled></Input>
                </Field>
                <Field>
                  <Label>Project name</Label>
                  <Input control={control} name="projectName"></Input>
                </Field>
                <Field>
                  <Label>Project Category</Label>
                  <Dropdown>
                    <Dropdown.Select
                      placeholder={
                        categoryName || projectDetail?.projectCategory?.name
                      }
                    ></Dropdown.Select>
                    <Dropdown.List>
                      <Dropdown.Option>
                        {projectCategory?.length > 0 &&
                          projectCategory.map((item: any) => {
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
              </div>
              <Field kind="full">
                <Label>Description</Label>
                <div className="w-full entry-content">
                  <ReactQuill
                    modules={modules}
                    theme="snow"
                    value={handleValue(description, projectDetail.description)}
                    onChange={setDescription}
                  />
                </div>
              </Field>
              <Button type="submit" className="bg-blue-500 text-white ml-auto">
                Submit
              </Button>
            </Fragment>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
