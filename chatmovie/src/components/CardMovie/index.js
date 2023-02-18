import { CardItem, ImageMovie, ViewAbout, TitleMovie, DescriptionMovie } from "./styles";
import { BASE_URL_IMAGE } from "../../utils/requestsAPI";

const CardMovie = ({ movie, navigation }) => {
    const endpointImage = movie.poster_path || movie.backdrop_path;

    return (
        <CardItem
            activeOpacity={0.6}
            onPress={() => navigation.navigate('MovieDetails', { id: movie.id })}
        >
            <>
                <ImageMovie
                    source={{ uri: `${BASE_URL_IMAGE}/w500${endpointImage}` }}
                />
                <ViewAbout>
                    <TitleMovie numberOfLines={2}>
                        {movie.title || movie.name}
                    </TitleMovie>
                    <DescriptionMovie numberOfLines={4}>
                        {movie.overview ? movie.overview : ''}
                    </DescriptionMovie>
                </ViewAbout>
            </>
        </CardItem>
    )
}

export default CardMovie;