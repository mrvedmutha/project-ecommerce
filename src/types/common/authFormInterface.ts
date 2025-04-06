import { UseFormReturn, FieldValues, SubmitHandler } from "react-hook-form";
export interface IAuthForm<T extends FieldValues> {
  form: UseFormReturn<T>;
  formTitle: string;
  formDescription: string;
  formFields: {
    name: keyof T;
    label: string;
    placeholder: string;
    type?: string;
  }[];
  onSubmit: SubmitHandler<T>;
  buttonText: string;
  isLoading: boolean;
  loginSuccess: boolean;
  successMessage?: string;
  errorMessage?: string;
  footerText?: string;
  footerLink?: {
    label: string;
    href: string;
  };
}
