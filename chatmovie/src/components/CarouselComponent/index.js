import { useState, useRef } from 'react';
import { useWindowDimensions } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import CarouselCardItem from './CarouselCardItem';

const CarouselComponent = ({ movies }) => {
    const [index, setIndex] = useState(0);
    const isCarousel = useRef();
    const window = useWindowDimensions();
    const widthCarousel = window.width > 540 ? 500 : window.width - 30

    return (
        <>
            <Carousel
                layout="default"
                layoutCardOffset={0}
                data={movies}
                ref={isCarousel}
                renderItem={CarouselCardItem}
                sliderWidth={widthCarousel}
                itemWidth={widthCarousel}
                useScrollView={true}
                onSnapToItem={(index) => setIndex(index)}
            />
            <Pagination
                dotsLength={movies.length}
                activeDotIndex={index}
                carouselRef={isCarousel}
                containerStyle={{
                    top: -10
                }}
                dotStyle={{
                    width: 8,
                    height: 8,
                    borderRadius: 5,
                    backgroundColor: '#AAA'
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
                tappableDots={true}
            />
        </>
    )
}


export default CarouselComponent