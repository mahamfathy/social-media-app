import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  type DefaultValues,
  type FieldValues,
  type Resolver,
} from "react-hook-form";
import type { ZodSchema } from "zod";

interface CustomFormProps<T extends FieldValues> {
  schema: ZodSchema<T>;
  defaultValues: T;
}

export const useCustomForm = <T extends FieldValues>({
  schema,
  defaultValues,
}: CustomFormProps<T>) => {
  return useForm<T>({
    mode: "onTouched",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema as any) as unknown as Resolver<T>,
    defaultValues: defaultValues as DefaultValues<T>,
  });
};
