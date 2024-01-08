import React from 'react';

function Button({ type, variant = 'primary', children, ...rest }) {
    console.log({ ...rest })
    console.log({ children })
    return (
        <button
            type={type === 'submit' ? 'submit' : 'button'}
            className='button button--primary'
            {...rest}
        >
            {children}
        </button>
    );
}


function SelectButton({ children, id, ...rest }) {
    return (
        <select
            id={id}
            className='button'
            {...rest}
        >
            {children}
        </select>
    );
}

export { SelectButton };
export default Button;
