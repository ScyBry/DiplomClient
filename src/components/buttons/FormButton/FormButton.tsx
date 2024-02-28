import classNames from 'classnames';
import { ButtonHTMLAttributes, FC } from 'react';
import styles from './styles.module.sass';

type ButtonProps = {
  type: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  text: string;
  icon?: React.ReactNode;
  variant: 'outlined' | 'contained';
  isValid: boolean;
  onClick?: () => void;
};

export const Button: FC<ButtonProps> = ({
  type,
  text,
  icon,
  variant,
  isValid,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={classNames(styles.button, {
        [styles.contained]: variant === 'contained',
        [styles.outlined]: variant === 'outlined',
      })}
      disabled={!isValid}
      type={type}
    >
      {text}
      {icon && icon}
    </button>
  );
};
