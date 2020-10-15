import React, { useMemo } from 'react';
import {
  Typography,
  Divider,
  TextField,
  Box,
  InputAdornment,
  Icon,
  Grid,
  Button,
} from '@material-ui/core';
import { Stock } from 'core/larder';
import { formatQuantity } from 'domain/selectors';
import { QueryStatus } from 'react-query';

interface Props extends Omit<Stock, 'type'> {
  hasOwnUnit: boolean,
  value: string,
  status: QueryStatus,
  onChange: (evt: any) => any,
  onSubmit: (positive: boolean) => any,
  onClose: () => any,
}

const Form = ({
  hasOwnUnit,
  value,
  category,
  name,
  quantity,
  unit,
  status,
  onChange,
  onSubmit,
  onClose,
}: Props) => {
  const icon = category?.icon ?? 'help';
  const amount = useMemo(() => formatQuantity(quantity, unit), [ quantity, unit ]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(true);
      }}
    >
      <Box>
        <Typography variant="h4">
          <Grid container>
            <Grid item xs md={1}>
              <Icon>{icon}</Icon>
            </Grid>
            <Grid item xs md={9}>
              <span>{name}</span>
            </Grid>
            <Grid item xs md={2}>
              <span>{amount}</span>
            </Grid>
          </Grid>
        </Typography>
        <Divider
          style={{
            marginTop: 12,
            marginBottom: 12,
          }}
        />
        <Box mb={2}>
          <TextField
            fullWidth
            label="Amount"
            value={value}
            required={true}
            onChange={onChange}
            InputProps={{
              endAdornment: !hasOwnUnit && (
                <InputAdornment position="end">
                  <span>g</span>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box>
          <Grid container direction="row-reverse">
            <Grid item xs={12} md={3}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                disabled={status === QueryStatus.Loading}
                onClick={() => onSubmit(true)}
              >
                Add
              </Button>
            </Grid>
            <Grid item xs={12} md={3}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                disabled={status === QueryStatus.Loading}
                onClick={() => onSubmit(false)}
              >
                Remove
              </Button>
            </Grid>
            <Grid item xs={false} md={3}></Grid>
            <Grid item xs={12} md={3}>
              <Button
                variant="outlined"
                fullWidth
                disabled={status === QueryStatus.Loading}
                onClick={onClose}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </form>
  );
};
Form.displayName = 'Form';

export default Form;
