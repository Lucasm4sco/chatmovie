import { StatusBar } from "react-native";
import { ColorRed, HeaderContainer, Text, ButtonSearch } from "./styles";
import { Ionicons } from '@expo/vector-icons';

const HeaderTabNavigator = ({ navigation, route }) => (
    <HeaderContainer
        paddingTop={StatusBar.currentHeight}
    >
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
    </HeaderContainer>
)

export default HeaderTabNavigator;