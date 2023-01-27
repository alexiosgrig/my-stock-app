import React, {useEffect, useState} from "react";
import {Button, Table, TableBody, TableCell, TableHead, TableRow, TextField} from "@mui/material";
import Service from "../Api/Service";
import IGetStockSymbol from "../Interface/IGetStockSymbol";

const StockInformation = () => {

    const [stock, setStock] = useState<IGetStockSymbol>()
    const [stockTicker, setStockTicker] = useState<string>('')

    useEffect(() => {
        stockTicker !== '' && getStockBySymbol()
    }, [stockTicker])

    const getStockBySymbol = async () => {
        try {
            const res = await Service.getStockBySymbol(stockTicker)
            setStock(res)
        } catch (e) {
            console.log(e)
        }
    }

    const handleChange = (e: any) => {
        setStockTicker(e?.target?.value)
    }


    return (
        <>
            <TextField size={'small'} title={'Stock'} onChange={(e) => handleChange(e)}
                       label={'Please input a stock ticker'} autoFocus required inputProps={{maxLength: 4}}/>
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
                            {stock?.ticker}
                        </TableCell>
                        <TableCell align="right">{stock?.name}</TableCell>
                        <TableCell align="right">{stock?.country}</TableCell>
                        <TableCell align="right">{stock?.ipo}</TableCell>
                        <TableCell> <Button title={'text'}/> </TableCell>

                    </TableRow>
                </TableBody>
            </Table>
        </>
    )
}
export default StockInformation