import z from 'zod';

export const departmentSchema = z.object({
  name: z.string().min(1, { message: 'Введите название отделения' }),
});
export type DepartmentSchemaType = z.infer<typeof departmentSchema>;

export const groupSchema = z.object({
  departmentId: z.string().min(1, { message: 'Выберите отделение' }),
  name: z
    .string()
    .min(1, { message: 'Введите название группы' })
    .max(100, { message: 'Название группы не должно превышать 100 символов' }),
});
export type GroupSchemaType = z.infer<typeof groupSchema>;

export const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: 'Введите адрес электронной почты' })
      .max(100, { message: 'Адрес почты не должен превышать 100 символов' })
      .email({ message: 'Введите действительный адрес электронной почты' }),

    username: z
      .string()
      .min(3, {
        message: 'Имя пользователя должно содержать не менее 3 символов',
      })
      .max(100, {
        message: 'Имя пользователя не должно превышать 100 символов',
      }),

    password: z
      .string()
      .min(6, { message: 'Пароль должен содержать не менее 6 символов' })
      .max(100, { message: 'Пароль не должен превышать 100 символов' }),
    repeatPassword: z
      .string()
      .max(100, { message: 'Пароль не должен превышать 100 символов' }),
  })
  .refine(data => data.password === data.repeatPassword, {
    message: 'Пароли должны совпадать',
    path: ['repeatPassword'],
  });
export type RegisterSchemaType = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  emailOrUsername: z
    .string()
    .min(1, { message: 'Введите адрес электронной почты или имя пользователя' })
    .max(100, { message: 'Не более 100 символов' }),
  password: z
    .string()
    .min(6, { message: 'Пароль должен содержать не менее 6 символов' })
    .max(100, { message: 'Пароль не должен превышать 100 символов' }),
});
export type LoginSchemaType = z.infer<typeof loginSchema>;

export const addTeacherSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'Имя не может быть пустым' })
    .max(100, { message: 'Имя не должно превышать 100 символов' }),
  lastName: z
    .string()
    .min(1, { message: 'Фамилия не может быть пустым' })
    .max(100, { message: 'Фамилия не должна превышать 100 символов' }),
  surname: z
    .string()
    .min(1, { message: 'Отчество не может быть пустым' })
    .max(100, { message: 'Отчество не должна превышать 100 символов' }),
  totalHours: z.string(),
});
export type AddTeacherSchemaType = z.infer<typeof addTeacherSchema>;

export const subjectSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Название предмета не должно быть пустым' })
    .max(100, {
      message: 'Название предмета не должно превышать 100 символов',
    }),
  hoursPerGroup: z.string().min(1, { message: 'Поле не может быть пустым' }),
});
export type SubjectSchemaType = z.infer<typeof subjectSchema>;
