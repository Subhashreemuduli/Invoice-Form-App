import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleLogin = (values) => {
    if (values.username === "admin" && values.password === "password") {
      localStorage.setItem("user", JSON.stringify(values.username));
      navigate("/dashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleLogin}
    >
      {({ isSubmitting }) => (
        <div className="flex justify-center">
          <Form className=" flex bg-black absolute flex-col mt-36  px-8 py-8 rounded-lg bg-opacity-85 md:w-[400px] mx-[10%] text-white">
            <h2 className="p-3 my-3 text-2xl font-bold">Login</h2>
            {error && <p className="error">{error}</p>}
            <div className="p-4 my-3 rounded-md md:text-md text-sm">
              <label className="text-lg">Username:</label>
              <Field
                type="text"
                name="username"
                className=" ml-2 h-8 w-auto text-black text-lg pl-2"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-500 mt-4 text-lg"
              />
            </div>
            <div className="p-4 my-3 rounded-md md:text-md text-sm -mt-2">
              <label className="text-lg">Password:</label>
              <Field
                type="password"
                name="password"
                className="ml-3 h-8 w-auto text-black text-lg pl-2"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 mt-4 text-lg"
              />
            </div>
            <button
              className="p-3 mt-4  bg-red-600  font-semibold rounded-md text-lg"
              type="submit"
              disabled={isSubmitting}
            >
              Login
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default LoginForm;
