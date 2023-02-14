import { useWindowDimensions } from "react-native";
import { NavContainer, ButtonNavigator } from "./styles";

import { createListRoutes } from './listTabRoutes';

const TabNavigatorComponent = ({ state, navigation, auth }) => {
    const window = useWindowDimensions();
    const listRoutes = createListRoutes(auth);
    const widthNavigator = listRoutes?.length * 60;
    const centerNavigator = (window.width / 2) - (widthNavigator / 2);

    return (
        <NavContainer
            halfScreen={centerNavigator}
            width={widthNavigator}
        >
            {listRoutes.map((route, index) => {
                const currentRoute = state.routes.filter(routeState => routeState.name === route.name)[0];

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: currentRoute.key,
                        canPreventDefault: true
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate({ name: currentRoute.name, merge: true });
                    }
                }

                const { Icon } = route;

                return (
                    <ButtonNavigator
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        onPress={onPress}
                        key={route.name}
                    >
                        <Icon 
                            color={isFocused? '#c30f0e' : 'gray'}
                        />
                    </ButtonNavigator>
                )
            })}
        </NavContainer>
    )
};

export default TabNavigatorComponent;