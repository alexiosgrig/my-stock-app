import React from "react";
import {Routes, Route} from 'react-router-dom'
import StockInformation from "../Components/StockInformation";
import StockFinancial from "../Components/StockFinancial";
import LoginForm from "../Components/LoginForm";

const Routing = () => {
    return (<Routes>
        <Route path={'/'} element={<LoginForm/>}/>
        <Route path={'/stock-information'} element={<StockInformation/>}/>
        <Route path={'/stock-financials'} element={<StockFinancial/>}/>
    </Routes>)

}

export default Routing