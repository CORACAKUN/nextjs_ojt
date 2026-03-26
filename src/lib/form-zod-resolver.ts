import type { FieldErrors, FieldValues, Resolver } from "react-hook-form";
import type { ZodType } from "zod";

export function createZodResolver<TFieldValues extends FieldValues>(
  schema: ZodType<TFieldValues, TFieldValues>
): Resolver<TFieldValues> {
  return async (values, context, options) => {
    void context;
    void options;

    const result = await schema.safeParseAsync(values);

    if (result.success) {
      return {
        values: result.data,
        errors: {},
      };
    }

    const errors: FieldErrors<TFieldValues> = {};

    for (const issue of result.error.issues) {
      const path = issue.path.join(".");

      if (!path || errors[path]) {
        continue;
      }

      errors[path] = {
        type: issue.code,
        message: issue.message,
      };
    }

    return {
      values: {} as TFieldValues,
      errors: errors as FieldErrors<TFieldValues>,
    };
  };
}
