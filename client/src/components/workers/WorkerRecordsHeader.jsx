import React from 'react';
import { Box, TextField, Typography, Button } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import styled from '@emotion/styled';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import { exportByRange } from '../../services/recordService';

const StyledBox = styled(Box)(({ theme }) => ({
	width: '100%',
	display: 'flex',
	justifyContent: 'flex-end',
	marginBottom: '1rem',
	gap: '1rem',
	'@media (max-width: 700px)': {
		flexDirection: 'column',
		alignItems: 'center',
	},
}));

const DatesBox = styled(Box)(({ theme }) => ({
	display: 'flex',
	gap: '1rem',
}));

const WorkerRecordsHeader = ({ workerId, date, setDate }) => {
	const handleFromChange = (newValue) => {
		setDate({ ...date, from: newValue });
	};

	const handleToChange = (newValue) => {
		setDate({ ...date, to: newValue });
	};

	const handleClick = async () => {
		const response = await exportByRange(
			workerId,
			date.from,
			date.to,
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
			<DatesBox>
				<LocalizationProvider dateAdapter={AdapterMoment}>
					<DesktopDatePicker
						label="Nuo"
						inputFormat="MM/DD/YYYY"
						name="from"
						value={date.from}
						onChange={handleFromChange}
						renderInput={(params) => <TextField {...params} />}
					/>
				</LocalizationProvider>
				<LocalizationProvider dateAdapter={AdapterMoment}>
					<DesktopDatePicker
						label="Iki"
						inputFormat="MM/DD/YYYY"
						name="to"
						value={date.to}
						onChange={handleToChange}
						renderInput={(params) => <TextField {...params} />}
					/>
				</LocalizationProvider>
			</DatesBox>

			<Button variant="contained" onClick={handleClick}>
				<ImportExportIcon />
				<Typography>Eksportuoti</Typography>
			</Button>
		</StyledBox>
	);
};

export default WorkerRecordsHeader;
