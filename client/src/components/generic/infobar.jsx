import React from 'react';

const Infobar = (props) => {
    const text = " " + props.text;
    const text_color = text ? text : " text-dark";

    return (
        <div className='text-center mt-5'>
            <h2 className={'bg-light border p-3 my-5 shadow' + text_color}>
                { props.children }
            </h2>
        </div>
    );
}
 
export default Infobar;