// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Routing from "../Routes/Routing";
import {BrowserRouter} from "react-router-dom";
import {Provider} from 'react-redux'
import {store} from "../store/store";
import TopAppBar from "../Components/TopAppBar";

export function App() {

    return (
        <Provider store={store}>
            <BrowserRouter>
                <TopAppBar>
                    <Routing/>
                </TopAppBar>
            </BrowserRouter>
        </Provider>
    )
}

export default App;
