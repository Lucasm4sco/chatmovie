import styled from "styled-components/native";
import { Feather } from '@expo/vector-icons'; 

export const Container = styled.View`
    background-color: #121212;
    flex: 1
`

export const LimitContainer = styled.View`
    width: 98%;
    max-width: 400px;
    overflow: hidden;
`

export const SearchBar = styled.View`
    margin: 40px 20px;
    height: 50px;
    flex-direction: row;
    max-width: 100%;
    border: 2px solid black;
    border-radius: 5px;
    overflow: hidden
    background-color: rgba(68, 62, 65, 0.84);
`

export const InputSearch = styled.TextInput`
    height: 100%;
    width: 90%
    font-size: 16px;
    padding: 0 5px;
    color: white;
    
`

export const IconSearch = styled(Feather)`
    heigth: 100%;
    width: 10%;
    padding: 10px 0px;
    flex-grow: 1;
`

// Tab Bar

export const ContainerTabBar = styled.View`
    flex-direction: row;
    padding: 20px
`

export const ButtonNavigate = styled.TouchableOpacity`
    background-color: ${props => props.bgCollor};
    padding: 5px 8px;
    margin-right: 5px;
    flex-direction: row;
`

export const TextButtonNavigate = styled.Text`
    color: white
`

export const TextAlertRequests = styled.Text`
    background-color: white;
    color: black;
    margin: 0  0 0 5px;
    padding: 0 5px;
    border-radius: 50px;
    font-size: 13px;
`