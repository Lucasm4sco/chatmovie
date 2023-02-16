import { FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ListMovieSection, TitleSection, ImageMovie } from "./styles";
import { BASE_URL_IMAGE } from "../../utils/requestsAPI";

const ListMovieRow = ({ items, title, isPoster }) => {
    const navigation = useNavigation();

    if (!items?.length)
        return

    const renderItem = ({ item }) => {
        const endpointImage = isPoster
            ? item.poster_path || item.backdrop_path
            : item.backdrop_path || item.poster_path;

        return (
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => navigation.navigate('MovieDetails', { id: item.id })}
            >
                <ImageMovie
                    source={{ uri: `${BASE_URL_IMAGE}/w500${endpointImage}` }}
                />
            </TouchableOpacity>
        )
    }

    return (
        <ListMovieSection>
            <TitleSection>{title}</TitleSection>
            <FlatList
                horizontal
                data={items}
                renderItem={renderItem}
                keyExtractor={item => (item.name || item.title) + Math.random()}
            />
        </ListMovieSection>
    )
}

export default ListMovieRow;