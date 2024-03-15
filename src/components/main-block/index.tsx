import CustomSelect from '../ui/select';
import { useApplicantsData } from '../../hooks/useApplicantsData';
import { useSelectedOptions } from '../../hooks/useSelectedOptions';
import styles from './style.module.css';
import loading from '../../assets/Loading.gif';
import { Box, Button, TextField } from '@mui/material';
import InputFields from '../input-fields';
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form';
import { Fields } from '../../types/form-types/form-types';
import { Textarea } from '@mui/joy';


const MainBlock = () => {
  const { positions, positionsLoading, relationsLoading } =
    useApplicantsData();
  const { selectedOptions, handleChangeSelected } = useSelectedOptions()

  const methods = useForm<Fields>();
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    setValue, reset
  } = methods


  const submit: SubmitHandler<Fields> = (fieldsData: Fields) => {
    console.log(fieldsData)
    reset()
  }

  return (
    <FormProvider {...methods}>
      <form className={styles.main} onSubmit={handleSubmit((fieldsData) => submit(fieldsData))}>
        {positionsLoading && relationsLoading ? (
          <img src={loading} className={styles.loader} />
        ) : (
          <Box className={styles.container}>
            <Box className={styles.top}>
              <CustomSelect
                id='relations'
                label='Relations'
                options={selectedOptions}
                multiple
                control={control}
                errors={errors}
                handleChangeSelected={handleChangeSelected}
              />
              <Box className={styles.fieldBlock}>
                <TextField
                  {...register('name', { required: true })}
                  className={styles.field} variant='standard' placeholder='Name'
                  error={!!errors['name']}
                />
                {
                  errors.name && errors.name.type === "required" && errors.name === 'name' && (
                    <span className={styles.errorText}>This field cannot be empty</span>
                  )
                }
              </Box>
            </Box>
            <Box className={styles.bottom}>
              <CustomSelect
                id='positions'
                label='Positions'
                options={positions.data}
                multiple={false}
                control={control}
                errors={errors}
              />
              <Box className={styles.fieldBlock}>
                <Textarea
                  {...register('description', { required: true })}
                  className={styles.field}
                  placeholder='Description'
                  variant='outlined'
                  maxRows={2}
                  sx={{ height: '54px' }}
                  error={!!errors['description']}
                />
                {errors.description && errors.description.type === "required" && (
                  <span className={styles.errorText}>This field cannot be empty</span>
                )}
              </Box>
            </Box>
          </Box>
        )}

        {!positionsLoading && !relationsLoading && (
          <Box className={styles.submitButton}>
            <Button variant='contained' type='submit'>Submit</Button>
          </Box>
        )}
      </form>
    </FormProvider>
  );
};

export default MainBlock;
