import React, { useCallback, useState } from 'react';
import {
  Menu as MuiMenu,
  MenuItem,
  IconButton,
  Icon,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { enhance } from 'presentation/hocs';

// TODO: add to shopping list
// TODO: find recipes

interface Props {
  id: string,
  onClear: () => any,
}

const Menu = ({
  id,
  onClear,
}: Props) => {
  const [ el, setEl ] = useState(void 0);

  const handleOpen = useCallback((evt) => {
    setEl(evt.currentTarget);
  }, [ setEl ]);

  const handleClose = useCallback(() => {
    setEl(void 0);
  }, [ setEl ]);

  return (
    <>
      <IconButton
        id={`stock_item_${id}_menu_button`}
        onClick={handleOpen}
      >
        <Icon>menu</Icon>
      </IconButton>
      <MuiMenu
        anchorEl={el}
        open={Boolean(el)}
        onClose={handleClose}
      >
        <MenuItem
          component={Link}
          to={`/larder/${id}/edit`}
        >
            Edit
        </MenuItem>
        <MenuItem onClick={() => {
          onClear();
          handleClose();
        }}>
          Clear
        </MenuItem>
        <MenuItem>
          Add to shopping list
        </MenuItem>
        <MenuItem>
          Find recipes
        </MenuItem>
      </MuiMenu>
    </>
  );
};

export default enhance('Menu')(Menu);
