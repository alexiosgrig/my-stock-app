import React from "react";
import {Routes, Route} from 'react-router-dom'
import DataTable from "../Components/DataTable";

const Routing = () => {
    return (<Routes>
        <Route path={'/'} element={<DataTable/>}/>
    </Routes>)

}

export default Routing