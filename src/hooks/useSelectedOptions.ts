import { useState } from 'react';
import { IApplicant } from '../types/global-types/global-types';

export const useSelectedOptions = () => {
  const [selectedOptions, setSelectedOptions] = useState<IApplicant[]>([]);

  const handleChangeSelected = (val: IApplicant) => {
    setSelectedOptions((prev) => [...prev, val]);
  };

  return { selectedOptions, handleChangeSelected };
};
