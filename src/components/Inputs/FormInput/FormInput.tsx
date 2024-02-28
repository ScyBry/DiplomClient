import { FC } from 'react';
import styles from './styles.module.sass';
import classNames from 'classnames';

type FormInputProps = {
  placeholder: string;
  label?: string;
  register: any;
  error: any;
};

export const FormInput: FC<FormInputProps> = ({
  placeholder,
  label,
  register,
  error,
}) => {
  return (
    <div className={styles.input}>
      {label && <label htmlFor="">{label}</label>}

      <input
        className={classNames({
          [styles.error]: error,
        })}
        {...register}
        type="text"
        placeholder={placeholder}
      />

      {error && error.message && <span>{error.message}</span>}
    </div>
  );
};
