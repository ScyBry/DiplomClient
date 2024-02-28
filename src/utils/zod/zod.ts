import z from 'zod';

export const departmentSchema = z.object({
  name: z.string().min(1, { message: 'Название отделения обязательно' }),
});
export type DepartmentSchemaType = z.infer<typeof departmentSchema>;

export const groupSchema = z.object({
  name: z.string().min(1, { message: 'Название группы обязательно' }),
  departmentId: z.string().min(1, { message: 'Выбор отделения обязателен' }),
});
export type GroupSchemaType = z.infer<typeof groupSchema>;
