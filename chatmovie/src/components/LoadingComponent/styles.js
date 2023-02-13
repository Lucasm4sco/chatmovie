import styled from 'styled-components/native';

import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import { LinearGradient } from 'expo-linear-gradient';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

export const Container = styled.ScrollView`
    flex: 1;
    background: #121212;
    padding: 20px
    border-color: black;
`

export const CarouselFeature = styled(ShimmerPlaceHolder)`
    height: 300px;
    max-height: 30%;
    width: 100%;
    border-radius: 10px;
    margin-bottom: 30px
`

export const TitleFeature = styled(ShimmerPlaceHolder)`
    height: 50px;
    width: 60%;
    border-radius: 10px;
    margin-bottom: 30px
`

export const MoviesFeature = styled(ShimmerPlaceHolder)`
    height: 100px;
    max-height: 30%;
    width: 90%;
    border-radius: 10px;
    margin-bottom: 30px;
`