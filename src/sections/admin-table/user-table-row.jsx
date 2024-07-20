import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import { TableRow, TableCell, Checkbox, IconButton } from '@mui/material';
// import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
// import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';

import Iconify from 'src/components/iconify';

export default function UserTableRow({
  selected,
  full_name,
  company_name,
  email_verified,
  status,
  handleClick,
  avatarUrl, // Assuming this is provided elsewhere in your app
}) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow
        hover
        tabIndex={-1}
        role="checkbox"
        selected={selected}
        style={{ cursor: 'pointer' }}
        onClick={handleClick} // Handle click on the whole row
      >
        <TableCell padding="checkbox" onClick={(e) => e.stopPropagation()}>
          <Checkbox disableRipple checked={selected} onChange={() => {}} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={full_name} src={avatarUrl} />
            <Typography variant="subtitle2" noWrap>
              {full_name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{company_name}</TableCell>

        <TableCell align="center">{email_verified ? 'Yes' : 'No'}</TableCell>

        <TableCell>{status}</TableCell>

        <TableCell align="right" onClick={(e) => e.stopPropagation()}>
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
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  avatarUrl: PropTypes.string, // Assuming avatarUrl is a string (URL to avatar image)
  company_name: PropTypes.string.isRequired,
  full_name: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  email_verified: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
  selected: PropTypes.bool,
};
