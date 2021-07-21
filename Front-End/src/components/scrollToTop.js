import React, { useState, useEffect } from 'react'
import { useWindowScroll } from 'react-use'
import '../styles/component.css'

const ScrollToTop = () => {

    const {y : pageOffSet} = useWindowScroll();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if(pageOffSet > 100){
            setVisible(true);
        }else{
            setVisible(false);
        }
    }, [pageOffSet])

    if (!visible) {
        return false;
    }

    const ToTop = () => window.scrollTo({
        top: 0,
        behavior: "smooth"
    })

    return (
        <div className="scrollToTop">
            <i style={{fontSize: '50px', cursor: 'pointer'}} className='fas' onClick={ToTop} >&#xf0aa;</i>
        </div>
    )
}

export default ScrollToTop
