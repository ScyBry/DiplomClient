import { FC } from 'react';
import styles from './PageHeader.module.sass';

type PageHeaderProps = {
  title?: string;
};

export const PageHeader: FC<PageHeaderProps> = ({ title }) => {
  return (
    <header className={styles.page_header}>
      <div className={styles.header__title}>
        <h1>
          Группа: <span>{title}</span>
        </h1>
      </div>
    </header>
  );
};
