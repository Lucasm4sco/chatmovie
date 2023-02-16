import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { CarouselImage, CarouselTitle } from './styles';
import { BASE_URL_IMAGE } from '../../utils/requestsAPI';

const ButtonNavigate = ({ children, id }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => navigation.navigate('MovieDetails', { id })}
      key={id}
    >
      {children}
    </TouchableOpacity>
  )
}

const CarouselCardItem = ({ item, index }) => {
  const endpointImage = item.backdrop_path || item.poster_path;

  return (
    <ButtonNavigate key={index} id={item.id}>
      <CarouselImage
        source={{ uri: `${BASE_URL_IMAGE}/w500${endpointImage}` }}
      />
      <CarouselTitle numberOfLines={1}>{item.title || item.name}</CarouselTitle>
    </ButtonNavigate>
  )
}

export default CarouselCardItem