import classNames from 'classnames';
import { FC, InputHTMLAttributes } from 'react';
import styles from './styles.module.sass';

type FormInputProps = {
  placeholder: string;
  label?: string;
  register: any;
  error: any;
  type: InputHTMLAttributes<HTMLInputElement>['type'];
};

export const FormInput: FC<FormInputProps> = ({
  placeholder,
  label,
  register,
  error,
  type,
}) => {
  return (
    <div className={styles.input}>
      {label && <label htmlFor="">{label}</label>}

      <input
        className={classNames({
          [styles.error]: error,
        })}
        {...register}
        type={type}
        placeholder={placeholder}
      />

      {error && error.message && <span>{error.message}</span>}
    </div>
  );
};
