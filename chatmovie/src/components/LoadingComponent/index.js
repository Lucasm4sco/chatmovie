import { Container, CarouselFeature, TitleFeature, MoviesFeature } from './styles';

const LoadingComponent = (props) => {
    return (
        <Container
            {...props}
            showsVerticalScrollIndicator={false}
            endFillColor='#AAA'   
        >   
            <CarouselFeature 
                shimmerColors={['#444', '#555', '#444']}
            />    
            <TitleFeature
                shimmerColors={['#444', '#555', '#444']}
            />   
            <MoviesFeature
                shimmerColors={['#444', '#555', '#444']}
            /> 
            <TitleFeature
                shimmerColors={['#444', '#555', '#444']}
            />   
            <MoviesFeature
                shimmerColors={['#444', '#555', '#444']}
            />  
            <TitleFeature
                shimmerColors={['#444', '#555', '#444']}
            />         
        </Container>
    )
}

export default LoadingComponent