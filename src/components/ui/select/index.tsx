import { Autocomplete, Box, TextField } from '@mui/material';
import styles from './style.module.css';
import React from 'react';
import SelectedList from '../../selected-list';
import CustomModal from '../../modal';
import { useModal } from '../../modal/hooks/useModal';
import { useSelect } from './hooks/useSelect';
import { IApplicant } from '../../../types/global-types/global-types';
import { Control, Controller, FieldErrors, useFormContext, useFieldArray } from 'react-hook-form';
import AddButton from '../add-button';
import { Fields } from '../../../types/form-types/form-types';
import { IModalSearchVal } from './hooks/useSelect'
import { useRelations } from '../../../hooks/useRelations'

interface ICustomSelectProps {
  label: 'Relations' | 'Positions';
  options?: IApplicant[];
  id: 'positions' | 'relations';
  multiple: boolean;
  control: Control<Fields, any>;
  errors: FieldErrors<Fields>;
  handleChangeSelected?: (val: IApplicant) => void
}

const CustomSelect: React.FC<ICustomSelectProps> = ({
  label,
  options,
  id,
  multiple,
  control,
  errors,
  handleChangeSelected
}) => {
  const { showModal, toggleModal } = useModal();
  const { onAddOption } = useRelations()


  return (
    <Box className={styles.customSelect}>
      {options && (
        <Controller
          name={id}
          control={control}
          rules={{ required: 'This field cannot be empty' }}
          render={({ field }) => {
            return (
              <Autocomplete
                {...field}
                id={id}
                options={options}
                sx={{ width: 300 }}
                value={field.value || []}
                onChange={(_, value) => field.onChange(value)}
                renderInput={(params) => (
                  <TextField {...params} error={!!errors[id]} label={label} helperText={errors[id]?.message} />
                )}
                multiple={multiple}
                getOptionLabel={(option) => option.name || ''}
                noOptionsText={<AddButton onClick={toggleModal} />}
                renderOption={(props, option) => {
                  return props.id === 'relations-option-0' ? (
                    <React.Fragment key={option.id}>
                      <SelectedList
                        props={props}
                        toggleModal={toggleModal}
                        selectedApplicants={option}
                      />
                    </React.Fragment>
                  ) : (
                    <li key={option.id} {...props}>{option.name}</li>
                  );
                }}
              />
            );
          }}
        />
      )}

      <CustomModal
        showModal={showModal}
        toggleModal={toggleModal}
        id={id}
        handleChangeSelected={handleChangeSelected}
        onAddOption={onAddOption}
      />
    </Box>
  );
};

export default CustomSelect;
