import { SliderWrapper, SliderItemWrapper } from './Slider.style';
import React, { memo } from 'react'

const Slider = memo(({children, className, ...props}) => {

    const AllClasses = ['slick__slider']
    if(className){
        AllClasses.push(className)
    }

    return ( 
        <SliderWrapper className={AllClasses.join(' ')} {...props}>
            {children}
        </SliderWrapper>
    )
})

const SliderItem = memo(({children, className}) => {
    console.log(children,'children2')
    const AllClasses = ['slick__slider__item']
    if(className){
        AllClasses.push(className)
    }

    return (
        <SliderItemWrapper className={AllClasses.join(className)}>
            {children}
        </SliderItemWrapper>
    )
})

export  {Slider, SliderItem};