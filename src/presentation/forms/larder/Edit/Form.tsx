import React from 'react';
import {
  Typography,
  TextField,
  Box,
  Grid,
  Button,
} from '@material-ui/core';
import {
  Formik,
  Form,
  Field,
} from 'formik';
import { Link } from 'react-router-dom';
import { Stock } from 'domain/core/larder';
import { enhance } from 'presentation/hocs';
import { formatQuantity } from 'domain/selectors';
import CategoryField from './CategoryField';
import { QueryStatus } from 'react-query';

interface Props extends Omit<Stock, 'type'> {
  status: QueryStatus,
  onSubmit: (...args: any[]) => any,
  onDelete: () => any,
}

// TODO: disable fields/buttons when submitting
// TODO: disable fields/buttons when deleting

const EditForm = (props: Props) => {
  const initialValues = {
    name: props.name,
    amount: formatQuantity(props.quantity, props.unit, props.unit),
    category: props.category?.id,
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={props.onSubmit}
    >
      <Form>
        <Box mb={2}>
          <Typography variant="h4">Edit {props.name}</Typography>
          <Grid container>
            <Grid item xs={12}>
              <Box mb={2}>
                <Field
                  as={TextField}
                  name="name"
                  fullWidth
                  label="Name"
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box mb={2}>
                <Field
                  as={TextField}
                  name="amount"
                  fullWidth
                  label="Amount"
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box mb={2}>
                <Field
                  as={CategoryField}
                  label="Category"
                  name="category"
                />
              </Box>
            </Grid>
          </Grid>
          <Box>
            <Grid container>
              <Grid item xs={false} md={3}/>
              <Grid item xs={12} md={3}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={status === QueryStatus.Loading}
                >
                  Save
                </Button>
              </Grid>
              <Grid item xs={12} md={3}>
                <Button
                  variant="outlined"
                  fullWidth
                  component={Link}
                  to="/larder"
                  disabled={status === QueryStatus.Loading}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item xs={12} md={3}>
                <Button
                  variant="text"
                  fullWidth
                  color="secondary"
                  disabled={status === QueryStatus.Loading}
                  onClick={props.onDelete}
                >
                  Delete
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Form>
    </Formik>
  );
};

export default enhance('EditForm')(EditForm);
