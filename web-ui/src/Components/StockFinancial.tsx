import * as React from 'react';
import TextField from '@mui/material/TextField';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from "@mui/material";
import {DesktopDatePicker} from "@mui/x-date-pickers";
import {useEffect, useState} from "react";
import Service from "../Api/Service";
import {IGetFinancialReports} from "../Interface/IGetFinancialReports";

const StockFinancial = () => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    const [dateFrom, setDateFrom] = useState<any>(new Date());
    const [dateTo, setDateTo] = useState<any>(date);
    const [frequency, setFrequency] = useState<string>();
    const [stock, setStock] = useState('annual')
    const [data, setData] = useState<IGetFinancialReports[] | undefined>()

    // @ts-ignore
    const updateDateTo = new Date(dateTo).toISOString().split('T')[0];
    updateDateTo.substring(0, 10)
    // @ts-ignore
    const updateDateFrom = new Date(dateFrom).toISOString().split('T')[0].substring(0, 10);
    updateDateFrom.substring(0, 10)

    const handleChange = (event: any) => {
        setFrequency(event?.target?.value)
    }

    const handleStockNameChange = (event: any) => {
        setStock(event?.target?.value)
    }

    const getStockFinancialData = async () => {
        const res = await Service.getStockFinancialReport(stock, frequency, updateDateFrom, updateDateTo)
        setData(res)
    }
    useEffect(() => {
        getStockFinancialData()
        console.log(updateDateTo, updateDateFrom, data)
    }, [dateFrom, dateTo, stock])


    return (
        <>
            <TextField size={'small'} title={'Stock'} onChange={(e) => handleStockNameChange(e)}
                       label={'Please input a stock ticker'} autoFocus required inputProps={{maxLength: 4}}/>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                    <DesktopDatePicker
                        label="Date from"
                        inputFormat="yyyy/MM/dd"
                        value={dateFrom}
                        onChange={(event) => {
                            setDateFrom(event)
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <DesktopDatePicker
                        label="Date to"
                        inputFormat="yyyy/MM/dd"
                        value={dateTo}
                        onChange={(event) => {
                            setDateTo(event)
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </Stack>
            </LocalizationProvider>
            <FormControl sx={{m: 1, minWidth: 120}} size="small">
                <InputLabel id="demo-select-small">Frequency</InputLabel>
                <Select
                    labelId="frequency-id"
                    id="frequency-id"
                    value={'frequency'}
                    label="Frequency"
                    onChange={handleChange}
                >
                    <MenuItem value={'quarterly'}>Quarterly</MenuItem>
                    <MenuItem value={'annual'}>Annual</MenuItem>
                </Select>
            </FormControl>

            <Table sx={{minWidth: 650}} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Ticker</TableCell>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">Country</TableCell>
                        <TableCell align="right">IPO</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow
                        key={'HI'}
                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                    >
                        <TableCell component="th" scope="row">
                            {}
                        </TableCell>
                        <TableCell align="right">{}</TableCell>
                        <TableCell align="right">{}</TableCell>
                        <TableCell align="right">{}</TableCell>
                        <TableCell> <Button title={'text'}/> </TableCell>

                    </TableRow>
                </TableBody>
            </Table>

        </>

    )
}

export default StockFinancial