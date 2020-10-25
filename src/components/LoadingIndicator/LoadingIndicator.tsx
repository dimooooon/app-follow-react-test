import React, { useEffect, useRef, useState } from 'react';
import { LOADING_INDICATOR_DELAY } from '../../common/constants';

import './LoadingIndicator.css';

interface ILoadingIndicatorProps {
    isVisible: boolean;
}

function LoadingIndicator(props: ILoadingIndicatorProps) {
    //const [isVisible, setIsVisible] = useState(false);
    const isVisible = useRef(props.isVisible);
    // isVisibleRef.current = isVisible;

    useEffect(() => {
        if (!props.isVisible) {
            isVisible.current = false;
        }
        else {
            // in order to not show loading indicators for fast operations (it looks odd)
            window.setTimeout(() => {
                isVisible.current = true;
            }, LOADING_INDICATOR_DELAY);
        }
    }, [props.isVisible]);

    if (!isVisible.current) {
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
