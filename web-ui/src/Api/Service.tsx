import axios from "axios";
import IGetStockSymbol from "../Interface/IGetStockSymbol";

const token = 'c7eaef2ad3ifpe0p8dkg'

const Service = {
    getStockBySymbol: async (stock: string) => {
        const res = await axios.get<IGetStockSymbol>(`https://finnhub.io/api/v1/stock/profile2?symbol=${stock}&token=${token}`)
        return res.data
    }

}

export default Service;