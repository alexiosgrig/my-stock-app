import {useSelector} from "react-redux";
import {RootState} from "../store/store";

export const getCountSelector = () => useSelector((state: RootState) => state.counter.value)
