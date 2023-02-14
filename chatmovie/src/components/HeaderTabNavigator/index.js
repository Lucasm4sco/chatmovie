import { StatusBar } from "react-native";
import { ColorRed, HeaderContainer, Text } from "./styles";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 

const HeaderTabNavigator = () => (
    <HeaderContainer
        paddingTop={StatusBar.currentHeight}
    >
        <StatusBar />
        <Text>C<ColorRed>M</ColorRed></Text>
        <Ionicons name="search" size={28} color="white" />
    </HeaderContainer>
)


export default HeaderTabNavigator;