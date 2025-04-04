"use client";
import { useRouter } from "next/navigation";
import * as React from "react";
import * as z from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthForm from "@/components/common/auth/AuthForm";
import { userRegisterSchema } from "@/Schemas/zod/customer/userRegisterZodSchema";
import { Roles } from "@/enum/enumexports";
import axios from "axios";

type RegisterFormVal = z.infer<typeof userRegisterSchema>;

export default function Register() {
  const router = useRouter();
  const [errMessage, setErrMessage] = React.useState<string | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [registerSuccess, setRegisterSuccess] = React.useState<boolean>(false);
  const registerForm = useForm<RegisterFormVal>({
    resolver: zodResolver(userRegisterSchema),
    defaultValues: {
      username: "",
      name: "",
      email: "",
      password: "",
      role: Roles.CUSTOMER,
    },
  });
  const onRegisterSubmit: SubmitHandler<RegisterFormVal> = async (data) => {
    console.log(data); //TODO remove
    setIsLoading(true);
    setErrMessage(undefined);
    try {
      const registerUser = await axios.post(
        `/api/v1/customer/user/register/`,
        data
      );
      console.log(registerUser); //TODO remove
      setIsLoading(false);
      if (registerUser.status === 200) {
        setRegisterSuccess(true);
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        setErrMessage(registerUser.data.message);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error connecting to the database or fetching data", error);
      if (axios.isAxiosError(error) && error.response) {
        setErrMessage(error.response.data.message);
      }
    }
  };
  return (
    <AuthForm
      form={registerForm}
      formTitle="Register"
      formDescription="Enter your credentials below to create a new account"
      formFields={[
        {
          name: "name",
          label: "Name",
          placeholder: "Enter name",
        },

        {
          name: "username",
          label: "Username",
          placeholder: "Enter username",
        },
        {
          name: "email",
          label: "Email",
          placeholder: "Enter email",
        },
        {
          name: "password",
          label: "Password",
          placeholder: "Enter password",
          type: "password",
        },
      ]}
      onSubmit={onRegisterSubmit}
      buttonText="Register"
      isLoading={isLoading}
      loginSuccess={registerSuccess}
      errorMessage={errMessage}
      successMessage="Registration successful! Redirecting..."
      footerText="Already have an account?"
      footerLink={{
        label: "Login",
        href: "/login",
      }}
    />
  );
}
