import { IApplicant } from '../../../../types/global-types/global-types';

export interface IModalSearchVal {
  name: string;
  id: string;
}
interface IUseSelectProps {
  toggleModal: () => void;
  onAddOption: (val: IApplicant) => void;
  selected: IApplicant | null;
  handleChangeSelected: (val: IApplicant) => void;
}

export const useSelect = ({
  toggleModal,
  onAddOption,
  selected,
  handleChangeSelected,
}: IUseSelectProps) => {
  const cancelSelectedValue = () => {
    toggleModal();
  };

  const addSelectedValue = () => {
    if (selected) {
      handleChangeSelected(selected);
      onAddOption(selected);
      toggleModal();
    }
  };

  return {
    cancelSelectedValue,
    addSelectedValue,
  };
};
