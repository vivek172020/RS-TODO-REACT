import React from 'react';

function Title({ children, ...rest }) {
    return (
        <p className="title" {...rest}>
            {children}
        </p>
    );
}

export default Title;

