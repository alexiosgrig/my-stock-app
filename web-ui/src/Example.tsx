import React from 'react'
import {useDispatch} from 'react-redux'
import {increment, decrement} from "./slices/CounterSlice";
import {getCountSelector} from "./selectors/Selectors";

export function Example() {
    const count = getCountSelector()
    const dispatch = useDispatch()

    return (
        <div>
            <div>
                <button
                    aria-label="Increment value"
                    onClick={() => dispatch(increment())}
                >
                    Increment
                </button>
                <span>{count}</span>
                <button
                    aria-label="Decrement value"
                    onClick={() => dispatch(decrement())}
                >
                    Decrement
                </button>
            </div>
        </div>
    )
}

export default Example