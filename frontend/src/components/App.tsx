import {useState} from "react";


 const App = () => {

    let [count, setCount] = useState<number>(0);

    const increment  = ():void => {
        setCount(count + 1)
    }

    const decrement  = ():void => {
        setCount(count - 1)
    }

    const reset  = ():void => {
        setCount(count = 0 )
    }

    return (
        <div>
            <label>Count: {count}</label>
            <button onClick={() => increment()}><span>inc</span></button>
            <button onClick={() => decrement()}><span>dec</span></button>
            <button onClick={() => reset()}><span>reset</span></button>
        </div>
    );
};

export default App;