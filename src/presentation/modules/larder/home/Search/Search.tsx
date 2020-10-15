import React from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Icon,
  CircularProgress,
} from '@material-ui/core';
import { enhance } from 'presentation/hocs';
import { QueryStatus } from 'react-query';

interface Props {
  value: string,
  status: QueryStatus,
  onChange: (v: string) => void,
  onSubmit: (evt: any) => any,
}

const Search = ({
  value,
  status,
  onChange,
  onSubmit,
}: Props) => (
  <form onSubmit={onSubmit}>
    <Box mb={1.5}>
      <TextField
        id="larder_search_input"
        fullWidth
        label="Search or add"
        value={value}
        onChange={(evt) => onChange(evt.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment
              position="end"
            >
              <IconButton type="submit">
                {status === QueryStatus.Idle ? (
                  <Icon>add</Icon>
                ) : (
                  <CircularProgress size={18}/>
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  </form>
);

export default enhance('Search')(Search);
