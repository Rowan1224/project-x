import React, { useState, useEffect } from 'react';
import Icon from '@material-ui/core/Icon';

const Counter = () => {
    const [count, setCount] = useState(1);

    const handleAddOne = () => setCount(count + 1);
    const handleMinusOne = () => count > 1 ? setCount(count - 1) : setCount(1);

    // componentDidMount
    useEffect(() => {
        const json = localStorage.getItem("count");
        const localCount = parseInt(json, 10);
    
        if(!isNaN(localCount))
            setCount(localCount);
    }, [])

    // componentDidUpdate
    useEffect(() => {
        const json = localStorage.getItem("count");
        const localCount = parseInt(json, 10);

        if(localCount !== count)
            localStorage.setItem("count", count);
    }, [count])

    return (
        <div>
            <Icon
                color="primary"
                style={{ verticalAlign: "middle", fontSize: "19px" }}
                onClick={ handleAddOne }
                className="mb-1"
            >
                add_circle
            </Icon>
            <strong className="px-1">{ count }</strong>
            <Icon
                color="error"
                style={{ verticalAlign: "middle", fontSize: "19px" }}
                onClick={ handleMinusOne }
                className="mb-1"
            >
                remove_circle
            </Icon>
        </div>
    );
}
 
export default Counter;