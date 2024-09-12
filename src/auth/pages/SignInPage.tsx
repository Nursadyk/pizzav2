import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import scss from "./SignInPage.module.scss";
import { useNavigate } from "react-router-dom";
interface IformInput {
  email: string;
  password: string;
}
const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<IformInput>();
  const onSubmit: SubmitHandler<IformInput> = async (inputData) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_AUTH_URL}/auth/sign-in`,
        inputData
      );
      if (data) {
        localStorage.setItem("accessToken", JSON.stringify(data.accessToken));
        localStorage.setItem(
          "accessTokenExpiration",
          JSON.stringify(data.accessTokenExpiration)
        );
        localStorage.setItem("refreshToken", JSON.stringify(data.refreshToken));
      }
      navigate("/");
    } catch (error) {
      const typeError = error as AxiosError;
      console.table(typeError.response?.data);
    }
    reset();
  };
  return (
    <div className={scss.SignInPage}>
      <div className="container">
        <div className={scss.content}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>Email</label>
            <input type="email" {...register("email", { required: true })} />
            <label>Password</label>
            <input
              type="password"
              {...register("password", { required: true })}
            />
            <button type="submit">
              {isSubmitting ? "Submitting" : "Send"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
