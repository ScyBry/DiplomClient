import { useForm } from 'react-hook-form';

export const AddTeacherForm = () => {
  const { register } = useForm({
    mode: 'onChange',
  });

  return <form></form>;
};
