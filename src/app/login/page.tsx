"use client";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import * as React from "react";
import * as z from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthForm from "@/components/common/auth/AuthForm";
import { loginSchema } from "@/Schemas/zod/auth/loginZodSchema";
import { Roles } from "@/enum/enumexports";

type FormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const router = useRouter();
  const [errMessage, setErrMessage] = React.useState<string | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [loginSuccess, setLoginSuccess] = React.useState<boolean>(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onLoginSubmit: SubmitHandler<FormValues> = async (data) => {
    setErrMessage(undefined);
    setIsLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    });

    setIsLoading(false);

    if (res?.error) {
      setErrMessage("Invalid email or password");
      return;
    }

    const session = await getSession();
    if (session) {
      setLoginSuccess(true);
      setTimeout(() => {
        const userRole = session.user.role;
        if (
          userRole === Roles.SUPERADMIN ||
          userRole === Roles.ADMIN ||
          userRole === Roles.EDITOR ||
          userRole === Roles.INVENTORY ||
          userRole === Roles.MARKETER
        ) {
          router.push("/admin/dashboard");
        } else if (userRole === Roles.CUSTOMER) {
          router.push("/cx/dashboard");
        } else {
          router.push("/");
        }
      }, 1000);
    }
  };

  return (
    <AuthForm
      form={form}
      formTitle="Login"
      formDescription="Enter your credentials below to login your account."
      formFields={[
        {
          name: "identifier",
          label: "Email",
          placeholder: "Enter Email Address",
        },
        {
          name: "password",
          label: "Password",
          placeholder: "Enter Password",
          type: "password",
        },
      ]}
      onSubmit={onLoginSubmit}
      buttonText="Login"
      isLoading={isLoading}
      loginSuccess={loginSuccess}
      errorMessage={errMessage}
      successMessage="Login successful! Redirecting..."
      footerText="Don't have an account?"
      footerLink={{ label: "Register", href: "/register" }}
    />
  );
};

export default Login;
