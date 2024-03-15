import React from 'react';
import { IApplicant } from '../../types/global-types/global-types';
import AddButton from '../ui/add-button';

interface ISelectedProps {
  props: React.HTMLAttributes<HTMLLIElement>;
  toggleModal: () => void;
  selectedApplicants?: IApplicant;
}

const SelectedList: React.FC<ISelectedProps> = ({
  props,
  selectedApplicants,
  toggleModal,
}) => {
  return (
    <>
      <AddButton onClick={toggleModal} />
      <li {...props} key={selectedApplicants?.id}>{selectedApplicants?.name}</li>
    </>
  );
};

export default SelectedList;
