"use client";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { EStatus } from '../enum/EStatus';
import { useState } from 'react';

export default function StatusSelect({onSelectChanged}: {onSelectChanged: (data: EStatus) => EStatus}) {
  const [status, setStatus]: [EStatus, React.Dispatch<any>] = useState(EStatus.ALL);

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(+event.target.value);
    onSelectChanged(+event.target.value);
  };

  return (
    <Box sx={{ minWidth: 150 }}>
      <FormControl fullWidth>
        <InputLabel>Status</InputLabel>
        <Select
          value={status.toString()}
          onChange={handleChange}
        >
          <MenuItem value={EStatus.ALL}>All</MenuItem>
          <MenuItem value={EStatus.ACTIVE}>Active</MenuItem>
          <MenuItem value={EStatus.COMPLETED}>Completed</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}