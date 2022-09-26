import React from 'react';
import { Box, TextField, Typography, Button } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import styled from '@emotion/styled';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import { exportRecords } from '../../services/recordService';

const StyledBox = styled(Box)(({ theme }) => ({
	width: '100%',
	display: 'flex',
	justifyContent: 'flex-end',
	marginBottom: '1rem',
	gap: '1rem',
}));

const RecordsHeader = ({ date, setDate }) => {
	const handleChange = (newValue) => {
		setDate(newValue);
	};

	const handleClick = async () => {
		const response = await exportRecords(
			date,
			{ responseType: 'arrayBuffer' },
			{ headers: { 'Content-Type': 'blob' } }
		);
		const url = URL.createObjectURL(new Blob([response.data]));
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', Date.now().toString() + '.csv');
		document.body.appendChild(link);
		link.click();
	};
	return (
		<StyledBox>
			<LocalizationProvider dateAdapter={AdapterMoment}>
				<DesktopDatePicker
					label="Diena"
					inputFormat="MM/DD/YYYY"
					value={date}
					onChange={handleChange}
					renderInput={(params) => <TextField {...params} />}
				/>
			</LocalizationProvider>

			<Button variant="contained" onClick={handleClick}>
				<ImportExportIcon />
				<Typography>Eksportuoti</Typography>
			</Button>
		</StyledBox>
	);
};

export default RecordsHeader;
