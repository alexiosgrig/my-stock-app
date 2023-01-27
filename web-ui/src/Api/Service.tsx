import axios from "axios";
import IGetStockSymbol from "../Interface/IGetStockSymbol";
import {IGetFinancialReports} from "../Interface/IGetFinancialReports";

const token = 'c7eaef2ad3ifpe0p8dkg'

const Service = {
    getStockBySymbol: async (symbol: string) => {
        try {
            const res = await axios.get<IGetStockSymbol>(`https://finnhub.io/api/v1/stock/profile2`, {
                params: {symbol: symbol, token: token},
            })
            return res.data
        } catch (error) {
            console.log(error)
        }

    },

    getStockFinancialReport: async (symbol: string | undefined, quarter?: string, fromDate?: string, toDate?: string) => {
        try {
            const res = await axios.get<IGetFinancialReports[]>(`https://finnhub.io/api/v1/stock/financials-reported`, {
                params: {symbol: symbol, quarter: quarter, from: fromDate, to: toDate, token: token},
            })
            return res.data
        } catch (error) {
            console.log(error)
        }
    }

}

export default Service;