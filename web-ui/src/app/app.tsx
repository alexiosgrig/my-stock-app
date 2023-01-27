// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Routing from "../Routes/Routing";
import {BrowserRouter} from "react-router-dom";

export function App() {

    return (
        <BrowserRouter>
            <Routing/>
        </BrowserRouter>

    );
}

export default App;
