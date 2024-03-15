import { useState } from 'react';
import { IApplicant } from '../../../types/global-types/global-types';

export const useNewOption = () => {
  const [selected, setSelected] = useState<IApplicant | null>(null);

  return { selected, setSelected };
};
