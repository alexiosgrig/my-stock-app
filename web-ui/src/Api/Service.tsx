import axios from "axios";
import IGetStockSymbol from "../Interface/IGetStockSymbol";

const token = 'c7eaef2ad3ifpe0p8dkg'

const Service = {
    getStockBySymbol: async (symbol: string) => {
        const res = await axios.get<IGetStockSymbol>(`https://finnhub.io/api/v1/stock/profile2`, {
            params: {symbol: symbol, token: token},
        })
        return res.data
    },

    getStockFinancial: async (symbol: string, quarter?: 'annual' | 'quarterly', fromDate?: Date, toDate?: Date) => {
        const res = await axios.get(`https://finnhub.io/api/v1/stock/financials-reported?symbol=AAPL&token=c7eaef2ad3ifpe0p8dkg`, {
            params: {symbol: symbol, quarter: quarter, from: fromDate, to: toDate},
        })
    }

}

export default Service;