import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { Container, LimitContainer, SearchBar, InputSearch, IconSearch, ContainerTabBar, ButtonNavigate, TextButtonNavigate, TextAlertRequests } from "./styles"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import ListUsers from "../../components/ListUsers";
import ListUsersRequest from "../../components/ListUsers/ListUsersRequest";
import ListFriends from "../../components/ListUsers/listFriends";
import { getFriends } from "../../slices/userSlice";

const Tab = createMaterialTopTabNavigator();

const TabBarNavigation = ({ navigation, state }) => {
    const { friend_requests } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const isActiveRoute = (route) => {
        const routes = {
            'list-users': state.index === 0,
            'list-users-request': state.index === 1,
            'list-friends': state.index === 2
        }
        return routes[route]
    }

    useEffect(() => {
        dispatch(getFriends())
    }, [])

    return (
        <ContainerTabBar>
            <ButtonNavigate
                bgCollor={isActiveRoute('list-users') ? 'red' : '#8A2323'}
                onPress={() => navigation.navigate('list-users')}
            >
                <TextButtonNavigate>
                    Usuários
                </TextButtonNavigate>
            </ButtonNavigate>
            <ButtonNavigate
                bgCollor={isActiveRoute('list-users-request') ? 'red' : '#8A2323'}
                onPress={() => navigation.navigate('list-users-request')}
            >
                {friend_requests?.length ? (
                    <>
                        <TextButtonNavigate>
                            Solicitações
                        </TextButtonNavigate>
                        <TextAlertRequests>
                            {friend_requests.length >= 100 ? '+99' : friend_requests.length}
                        </TextAlertRequests>
                    </>
                ) : (
                    <TextButtonNavigate>
                        Solicitações
                    </TextButtonNavigate>
                )}

            </ButtonNavigate>
            <ButtonNavigate
                bgCollor={isActiveRoute('list-friends') ? 'red' : '#8A2323'}
                onPress={() => navigation.navigate('list-friends')}
            >
                <TextButtonNavigate>
                    Amigos
                </TextButtonNavigate>
            </ButtonNavigate>
        </ContainerTabBar>
    )
}

const UsersScreen = () => {
    const [search, setSearch] = useState('');

    return (
        <Container>
            <LimitContainer>
                <SearchBar>
                    <InputSearch
                        cursorColor='white'
                        selectionColor='red'
                        placeholder='Pesquise por usuários...'
                        placeholderTextColor='#ccc'
                        value={search || ''}
                        onChangeText={text => setSearch(text)}
                    />
                    <IconSearch name="search" size={24} color="#ccc" />
                </SearchBar>
            </LimitContainer>
            <Tab.Navigator
                tabBar={props => <TabBarNavigation {...props} />}
                screenOptions={{
                    swipeEnabled: false
                }}
            >
                <Tab.Screen name='list-users' component={ListUsers} />
                <Tab.Screen name='list-users-request' component={ListUsersRequest} />
                <Tab.Screen name='list-friends' component={ListFriends} />
            </Tab.Navigator>
        </Container>
    )
}

export default UsersScreen