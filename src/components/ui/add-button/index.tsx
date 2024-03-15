import { Box, Button } from '@mui/material';
import styles from './style.module.css';
import React from 'react';

interface ISelectButtonProps {
  onClick: () => void;
}

const AddButton: React.FC<ISelectButtonProps> = ({ onClick }) => {
  return (
    <Box className={styles.buttonWrapper}>
      <Button variant='contained' onClick={onClick}>
        Add New Relation
      </Button>
    </Box>
  );
};

export default AddButton;
