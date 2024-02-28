import { FC } from 'react';
import { departmentApi } from '../../../services/department.service';
import { IGroup } from '../../../types/types';
import { Modal } from '../../Modal/Modal';
import { Button } from '../../buttons/FormButton/FormButton';
import styles from './ApproveModal.module.sass';

type ApproveModalProps = {
  group?: IGroup;
  departmentName: string;
  isOpen: boolean;
  onClose: any;
};

export const ApproveModal: FC<ApproveModalProps> = ({
  group,
  departmentName,
  isOpen,
  onClose,
}) => {
  const [deleteGroup, {}] = departmentApi.useDeleteGroupMutation();

  const handleDelete = () => {
    deleteGroup(group?.id);
    onClose(true);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.form__wrapper}>
        <p>
          Вы действительно хотите удалить группу {group?.name} из
          {departmentName}?
        </p>
        <Button
          onClick={handleDelete}
          type="submit"
          text="Удалить"
          variant="contained"
          isValid
        />
      </div>
    </Modal>
  );
};
