import { StatusBar } from "react-native";
import { ColorRed, HeaderContainer, Text, ButtonSearch } from "./styles";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useDispatch } from "react-redux";
import { removeDataStorage } from "../../utils/storage";
import { reset } from "../../slices/authSlice";

const HeaderTabNavigator = ({ navigation, route, auth }) => {
    const dispatch = useDispatch()

    const logout = () => {
        removeDataStorage();
        dispatch(reset());
    }

    return (
        <HeaderContainer>
            <StatusBar />
            <Text>C<ColorRed>M</ColorRed></Text>
            {route.name === 'Home' && (
                <ButtonSearch
                    activeOpacity={0.6}
                    onPress={() => navigation.navigate('Search')}
                >
                    <Ionicons name="search" size={28} color="white" />
                </ButtonSearch>
            )}
            {auth && route.name === 'Authenticate' && (
                <ButtonSearch
                    activeOpacity={0.6}
                    onPress={logout}
                >
                    <MaterialIcons name="login" size={24} color="white" />
                </ButtonSearch>
            )}
        </HeaderContainer>
    )
}

export default HeaderTabNavigator;