import { useState } from "react";
import { loginFields } from "../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";

import { useNavigate } from "react-router-dom";
const fields = loginFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Login() {
  const [loginState, setLoginState] = useState(fieldsState);
  const navigate = useNavigate();
  const loginHandler = () => {
    navigate("/");
  };

  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch("http://localhost:5000/login", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginState),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let result = await response.json();
      console.log(result);
      if (result.status === "exist") {
        window.location.href = "/"; // Redirect to home page on successful login
        localStorage.setItem("status", "exist");
      } else {
        window.location.href = "/signup"; // Redirect to register page on failed login
      }
    } catch (error) {
      console.error("Error:", error);
    }
    // loginHandler();
    authenticateUser();
  };

  //Handle Login API Integration here
  const authenticateUser = () => {};

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="-space-y-px">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={loginState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
      </div>

      <FormExtra />
      <FormAction handleSubmit={handleSubmit} text="Login" />
    </form>
  );
}
