import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { ScrollView, StyleSheet } from "react-native";
import { useAuth } from '../../hooks/useAuth.js';

import PerfilScreen from "../../screens/PerfilScreen";
import Login from "../../screens/AuthenticateUserScreens/Login";
import Register from "../../screens/AuthenticateUserScreens/Register";

const Tab = createMaterialTopTabNavigator();

const AuthenticateUser = ({ navigation }) => {
    const { auth } = useAuth();

    if (auth)
        return <PerfilScreen navigation={navigation} />

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Tab.Navigator>
                <Tab.Screen
                    name="Login"
                    component={Login}
                    options={{
                        title: 'Entrar',
                        tabBarActiveTintColor: 'white',
                        tabBarStyle: styles.firtScreen.TabBar,
                        tabBarLabelStyle: styles.title,
                        tabBarIndicatorContainerStyle: styles.firtScreen.IndicatorContainer,
                        tabBarIndicatorStyle: styles.indicatorStyle
                    }}
                />
                <Tab.Screen
                    name="Register"
                    component={Register}
                    options={{
                        title: 'Cadastrar',
                        tabBarActiveTintColor: 'white',
                        tabBarStyle: styles.secondScreen.TabBar,
                        tabBarLabelStyle: styles.title,
                        tabBarIndicatorContainerStyle: styles.secondScreen.IndicatorContainer,
                        tabBarIndicatorStyle: styles.indicatorStyle
                    }}
                />
            </Tab.Navigator>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        paddingTop: 20,
        paddingHorizontal: 10,
        paddingBottom: 120,
        minHeight: '100%'
    },
    title: {
        fontWeight: '900'
    },
    indicatorStyle: {
        backgroundColor: 'red',
        width: '100%'
    },
    firtScreen: {
        TabBar: {
            backgroundColor: '#212121'
        },
        IndicatorContainer: {
            backgroundColor: '#111',
            width: '50%'
        }
    },
    secondScreen: {
        TabBar: {
            backgroundColor: '#111'
        },
        IndicatorContainer: {
            backgroundColor: '#212121',
            width: '50%'
        }
    }
})

export default AuthenticateUser;