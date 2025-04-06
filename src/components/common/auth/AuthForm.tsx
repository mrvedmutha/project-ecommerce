"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import React from "react";
import { FieldValues } from "react-hook-form";
import { IAuthForm } from "@/types/common/authFormInterface";

const AuthForm = <T extends FieldValues>({
  form,
  formTitle,
  formDescription,
  formFields,
  onSubmit,
  buttonText,
  isLoading = false,
  loginSuccess = false,
  errorMessage,
  successMessage,
  footerText,
  footerLink,
}: IAuthForm<T>) => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">{formTitle}</CardTitle>
              <CardDescription>{formDescription}</CardDescription>
            </CardHeader>

            <CardContent className="grid gap-4">
              {errorMessage && (
                <div className="text-red-500 text-center text-sm">
                  {errorMessage}
                </div>
              )}

              {loginSuccess && successMessage && (
                <div className="text-green-600 text-center text-sm font-medium">
                  {successMessage}
                </div>
              )}

              {formFields.map((field) => (
                <div className="grid gap-2 my-2" key={String(field.name)}>
                  <FormField
                    control={form.control}
                    name={field.name as any}
                    render={({ field: formField }) => (
                      <FormItem>
                        <FormLabel>{field.label}</FormLabel>
                        <FormControl>
                          <Input
                            {...formField}
                            placeholder={field.placeholder}
                            type={field.type || "text"}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}

              <div className="grid gap-2">
                <Button
                  type="submit"
                  disabled={isLoading || loginSuccess}
                  className={
                    loginSuccess
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : ""
                  }
                >
                  {loginSuccess
                    ? successMessage
                    : isLoading
                    ? "Loading..."
                    : buttonText}
                </Button>
              </div>
            </CardContent>
          </form>
        </Form>

        {footerText && footerLink && (
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              {footerText}{" "}
              <Link href={footerLink.href} className="text-primary underline">
                {footerLink.label}
              </Link>
            </p>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default AuthForm;
