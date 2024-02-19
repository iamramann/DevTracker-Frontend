import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import apis from "../apis";
import CustomInput from "../components/CustomInput";
import CustomTextarea from "../components/CustomTextarea";
import CustomButton from "../components/CustomButton";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "@material-tailwind/react";
import { toast } from "react-toastify";

export default function DetailsForm() {
  const [tasks, setTasks] = useState([]);
  const [associates, setAssociates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const notify = (message, type) => toast(message, { type });

  useEffect(() => {
    const { getTaskTypes, getAssociates } = apis;
    Promise.allSettled([getTaskTypes(), getAssociates()]).then(
      ([tasksResult, associatesResult]) => {
        setTasks(tasksResult.value);
        setAssociates(associatesResult.value);
      }
    );
  }, []);

  return (
    <div className="w-full h-dvh flex items-center justify-center flex-col">
      <div className="row-1-heading py-3">
        <Breadcrumbs className="px-0">
          <Link to="#">Home</Link>
          <Link to="/dashboard" className="opacity-60">
            Dashboard
          </Link>
        </Breadcrumbs>
      </div>
      <div className="form-section w-5/6 lg:w-4/6 p-2">
        <Formik
          initialValues={{
            title: "",
            description: "",
            taskId: "-1",
            associateId: "-1",
            timeTaken: 1,
            dateAdded: "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.title) {
              errors.title = "Title is required.";
            } else if (!values.description) {
              errors.description = "Description is required.";
            } else if (values.taskId === "-1") {
              errors.taskId = "Select task type.";
            } else if (values.associateId === "-1") {
              errors.associateId = "Select associate type.";
            } else if (!values.dateAdded) {
              errors.dateAdded = "Select date.";
            }
            return errors;
          }}
          onSubmit={(values, { resetForm }) => {
            setIsLoading(true);
            apis
              .addWorkDetails(values)
              .then((data) => {
                console.log(data);
                notify(data, "success");
                setIsLoading(false);
                resetForm();
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        >
          {({ errors, touched }) => (
            <Form className="">
              <div className="lg:grid grid-cols-2 grid-rows-1 gap-4">
                <div className="">
                  <div className="m-2">
                    <Field
                      name="title"
                      as={CustomInput}
                      label="Title"
                      error={errors.title && touched.title}
                    />
                    <ErrorMessage name="name" />
                  </div>
                  <div className="m-2">
                    <Field
                      name="description"
                      as={CustomTextarea}
                      error={errors.description && touched.description}
                    />
                  </div>
                </div>
                <div className="">
                  <div className="m-2">
                    <Field
                      name="taskId"
                      as="select"
                      className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                        errors.taskId && touched.taskId
                          ? "focus:border-red-500 focus:ring-red-500 border-red-500"
                          : "focus:border-blue-500 focus:ring-blue-500"
                      }`}
                    >
                      <option key={-1} value="-1">
                        {"Please select task type".toUpperCase()}
                      </option>
                      {tasks &&
                        tasks.map(({ id, taskType }) => (
                          <option key={id} value={id.toString()}>
                            {taskType.toUpperCase()}
                          </option>
                        ))}
                    </Field>
                  </div>
                  <div className="m-2">
                    <Field
                      name="associateId"
                      as="select"
                      className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                        errors.associateId && touched.associateId
                          ? "focus:border-red-500 focus:ring-red-500 border-red-500"
                          : "focus:border-blue-500 focus:ring-blue-500"
                      }`}
                    >
                      <option key={-1} value="-1">
                        {"Please select an option".toUpperCase()}
                      </option>
                      {associates &&
                        associates.map(({ id, associateWith }) => (
                          <option key={id} value={id.toString()}>
                            {associateWith.toUpperCase()}
                          </option>
                        ))}
                    </Field>
                  </div>
                  <div className="m-2">
                    <Field
                      name="timeTaken"
                      min={1}
                      as={CustomInput}
                      type="number"
                      label="Time Taken"
                    />
                  </div>
                  <div className="m-2">
                    <Field
                      name="dateAdded"
                      as={CustomInput}
                      type="date"
                      error={errors.dateAdded && touched.dateAdded}
                      label="Date Added"
                    />
                  </div>
                </div>
              </div>
              <div>
                <CustomButton loading={isLoading} />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
