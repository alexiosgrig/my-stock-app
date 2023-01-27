import React, {useEffect, useRef, useState} from "react";
import {Table, TableBody, TableCell, TableHead, TableRow, TextField} from "@mui/material";
import Service from "../Api/Service";
import IGetStockSymbol from "../Interface/IGetStockSymbol";

const DataTable = () => {

    const [stock, setStock] = useState<IGetStockSymbol>()
    const textInputRef = useRef<HTMLDivElement>()

    const getStockBySymbol = async () => {
        const res = await Service.getStockBySymbol('AAPL')
        setStock(res)
        console.log(res)
    }

    useEffect(() => {
        getStockBySymbol()
        console.log(textInputRef)
    }, [])


    return (
        <>
            <TextField size={'small'} title={'Stock'} disabled={false} onChange={(e) => console.log(e)}/>
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
                    </TableRow>
                </TableBody>
            </Table>
        </>
    )
}

export default DataTable