import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function ProductFormulaTableRow({
  selected,
  data,
  handleClick,
  handleActivateRow,
  handleEdit
}) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleButtonActivation = () => {
    setOpen(null);
    handleActivateRow();
  }

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" 
          // padding="none"
          >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2" noWrap>
              {data.product.name}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell component="th" scope="row" 
          // padding="none"
          >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2" noWrap>
              {data.ingridient.name}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell>{data.quantity}</TableCell>
        <TableCell>{data.total_amount}</TableCell>
        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleEdit}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleButtonActivation} sx={{ color: 'error.main' }}>
          
          {data.deleted_at ? (
            <>
              <ToggleOnIcon /> Active
            </>
          ) : (
            <>
              <ToggleOffIcon /> Deactivate
            </>
          )}
        </MenuItem>
      </Popover>
    </>
  );
}

ProductFormulaTableRow.propTypes = {
  data: PropTypes.object,
  handleClick: PropTypes.func,
  handleEdit: PropTypes.func,
  handleActivateRow: PropTypes.func,
  selected: PropTypes.any,
};
