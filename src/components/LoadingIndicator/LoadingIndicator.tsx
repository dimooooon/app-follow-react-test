import React from 'react';

import './LoadingIndicator.css';

interface ILoadingIndicatorProps {
    isVisible: boolean;
}

function LoadingIndicator(props: ILoadingIndicatorProps) {
    if (!props.isVisible) {
        return null;
    }

    return (
        <div className='loading-indicator'>
            <div className='lds-roller'>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}

export default LoadingIndicator;
