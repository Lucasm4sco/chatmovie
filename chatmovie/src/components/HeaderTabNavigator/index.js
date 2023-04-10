import { StatusBar } from "react-native";
import { ColorRed, HeaderContainer, Text, Button } from "./styles";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useDispatch } from "react-redux";
import { removeDataStorage } from "../../utils/storage";
import { reset } from "../../slices/authSlice";
import { resetDataUsers } from "../../slices/userSlice";

const HeaderTabNavigator = ({ navigation, route, auth }) => {
    const dispatch = useDispatch()

    const logout = () => {
        removeDataStorage();
        dispatch(reset());
        dispatch(resetDataUsers());
    }

    return (
        <HeaderContainer>
            <StatusBar />
            <Text>C<ColorRed>M</ColorRed></Text>
            {route.name === 'Home' && (
                <Button
                    activeOpacity={0.6}
                    onPress={() => navigation.navigate('Search')}
                >
                    <Ionicons name="search" size={28} color="white" />
                </Button>
            )}
            {auth && route.name === 'Authenticate' && (
                <Button
                    activeOpacity={0.6}
                    onPress={logout}
                >
                    <MaterialIcons name="login" size={28} color="white" />
                </Button>
            )}
            {auth && route.name === 'Messages' && (
                <Button
                    activeOpacity={0.6}
        
                >
                    <MaterialIcons name="add" size={32} color="white" />
                </Button>
            )}
        </HeaderContainer>
    )
}

export default HeaderTabNavigator;