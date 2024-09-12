import React from "react";
import scss from "./SignUpPage.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
interface IformInput {
  email: string;
  password: string;
  username: string;
  photo: string;
}
const SignUpPage: React.FC = () => {
  const { register, handleSubmit } = useForm<IformInput>();
  const onSubmit: SubmitHandler<IformInput> = async (inputData) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_AUTH_URL}/auth/sign-up`,
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
    } catch (error) {
      const typeError = error as AxiosError;
      console.table(typeError.response?.data);
    }
  };
  return (
    <div className={scss.SignUpPage}>
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
            <label>Username</label>
            <input type="text" {...register("username", { required: true })} />
            <label>Photo</label>
            <input type="text" {...register("photo", { required: true })} />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
