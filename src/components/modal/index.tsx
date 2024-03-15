import {
  Autocomplete,
  Box,
  Button,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import styles from './style.module.css';
import { useSelect } from '../ui/select/hooks/useSelect';
import { useApplicantsData } from '../../hooks/useApplicantsData';
import { useNewOption } from './hooks/useNewOption'
import { IApplicant } from '../../types/global-types/global-types'

interface IModalProps {
  showModal: boolean;
  toggleModal: () => void;
  id: 'positions' | 'relations';
  handleChangeSelected: (val: IApplicant) => void
  onAddOption: (val: IApplicant) => void
}

const CustomModal: React.FC<IModalProps> = ({
  showModal,
  toggleModal,
  id,
  handleChangeSelected,
  onAddOption
}) => {

  const { selected, setSelected } = useNewOption()
  const { relations } = useApplicantsData();
  const { cancelSelectedValue, addSelectedValue } =
    useSelect({
      toggleModal,
      onAddOption,
      handleChangeSelected, selected
    });

  return (
    <Modal
      open={showModal}
      onClose={toggleModal}
      aria-labelledby='modal-title'
      aria-describedby='modal-description'
    >
      <Box className={styles.modalContent}>
        <Typography id='modal-title' variant='h6' component='h2'>
          Add Relation
        </Typography>
        <Box id='modal-description' className={styles.modalDescription}>
          {Boolean(relations.data?.length) && relations.data && (
            <Autocomplete
              id={id}
              options={relations.data}
              sx={{ width: 300 }}
              onChange={(_, newVal) => setSelected(newVal)}
              renderInput={(params) => (
                <TextField {...params} label={`Add new Relation`} />
              )}
              getOptionLabel={(option) => option.name || ''}
            />
          )}
        </Box>
        <Box id='modal-actions' className={styles.modalActions}>
          <Button variant='contained' disabled={!selected} onClick={addSelectedValue} >
            Add
          </Button>
          <Button variant='contained' onClick={cancelSelectedValue}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CustomModal;
