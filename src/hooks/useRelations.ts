import { Control, useFieldArray } from 'react-hook-form';
import { Fields } from '../types/form-types/form-types';
import { IApplicant } from '../types/global-types/global-types';

export const useRelations = (control: Control<Fields, any>) => {
  const { append, remove } = useFieldArray({
    name: 'relations',
  });

  const onAddOption = (option: IApplicant) => {
    append(option);
  };

  return {
    onAddOption,
  };
};
