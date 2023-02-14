import { View } from 'react-native';
import { CarouselImage, CarouselTitle } from './styles';

const CarouselCardItem = ({ item, index }) => {
  const urlImage = item.backdrop_path || item.poster_path;
  return (
    <View key={index}>
      <CarouselImage
        source={{ uri: `https://image.tmdb.org/t/p/w500${urlImage}` }}
      />
      <CarouselTitle numberOfLines={1}>{item.title || item.name}</CarouselTitle>
    </View>
  )
}

export default CarouselCardItem