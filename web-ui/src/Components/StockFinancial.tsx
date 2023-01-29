import * as React from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TextField from '@mui/material/TextField';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle,
    FormControl, Grid, IconButton,
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
    date.setDate(date.getDate() - 7);
    const [dateFrom, setDateFrom] = useState<any>(date);
    const [dateTo, setDateTo] = useState<any>(new Date());
    const [frequency, setFrequency] = useState<string>('annual');
    const [stock, setStock] = useState('')
    const [stockData, setStockData] = useState<IGetFinancialReports[] | undefined>()
    const [openModal, setOpenModal] = useState(false)

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
        const res = await Service.getStockFinancialReport(stock.toUpperCase(), frequency, updateDateFrom, updateDateTo)
        setStockData(res.data)
    }

    const isModalOpen = () => {
        setOpenModal(true)
    }

    const closeModal = () => {
        setOpenModal(false)
    }
    useEffect(() => {
        if (frequency.length > 0 && stock.length > 0) {
            getStockFinancialData()
        }
        console.log(updateDateTo, updateDateFrom, stockData)
    }, [dateFrom, dateTo, stock, frequency])

    const reports = stockData?.length && stockData?.map(data => data.report)
    const bs = reports?.map(e => e.bs)
    console.log(bs);

    return (
        <Grid container spacing={8}>
            <Grid item xs={12}>
                <TextField size={'small'} title={'Stock'} onChange={(e) => handleStockNameChange(e)}
                           label={'Please input a stock ticker'} autoFocus required inputProps={{maxLength: 4}}/>
            </Grid>
            <Grid item xs={4}>
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
                            maxDate={new Date()}
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
            </Grid>
            <Grid item xs={12}>
                <FormControl sx={{m: 1, minWidth: 120}} size="small">
                    <InputLabel id="demo-select-small">Frequency</InputLabel>
                    <Select
                        labelId="frequency-id"
                        id="frequency-id"
                        value={frequency}
                        label={frequency}
                        onChange={handleChange}
                    >
                        <MenuItem value={'quarterly'}>Quarterly</MenuItem>
                        <MenuItem value={'annual'}>Annual</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <Table size='medium' aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Year</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {stockData && stockData.length ? stockData?.map(data =>
                            (
                                <TableRow>
                                    <TableCell>{data.year.toString()}</TableCell>
                                    <TableCell>
                                        <IconButton aria-label={'arrow'} size={'large'} onClick={isModalOpen}>
                                            <ArrowForwardIosIcon fontSize="small"/>
                                        </IconButton>
                                    </TableCell>

                                </TableRow>
                            )
                        ) : <TableRow>
                        </TableRow>}
                    </TableBody>
                </Table>
            </Grid>
            <Dialog
                keepMounted
                open={openModal}
                onClose={closeModal}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description">
                <DialogTitle>{"Use Google's location service?"}</DialogTitle>
                <DialogContent>
                    <Table size='medium' aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Year</TableCell>
                            </TableRow>
                        </TableHead>
                        {/*<TableBody>*/}
                        {/*    {bs && bs.length ? bs?.map(bsData =>*/}
                        {/*        bs.map(*/}
                        {/*            <TableRow>*/}
                        {/*                <TableCell>bsData.</TableCell>*/}
                        {/*                <TableCell>*/}
                        {/*                    <IconButton aria-label={'arrow'} size={'large'} onClick={isModalOpen}>*/}
                        {/*                        <ArrowForwardIosIcon fontSize="small"/>*/}
                        {/*                    </IconButton>*/}
                        {/*                </TableCell>*/}

                        {/*            </TableRow>*/}
                        {/*        )*/}
                        {/*    ) : <TableRow>*/}
                        {/*    </TableRow>}*/}
                        {/*</TableBody>*/}
                    </Table>
                </DialogContent>
                <DialogActions>
                    <Button>Disagree</Button>
                    <Button>Agree</Button>
                </DialogActions>
            </Dialog>

        </Grid>

    )
}

export default StockFinancial