import styled from "styled-components/native";

export const HeaderContainer = styled.View`
    height: 90px;
    background-color: black;
    padding-top: ${props => props.paddingTop}px;
    border-bottom-width: 1px;
    border-bottom-color: #441a19;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-horizontal: 25px;
`

export const Text = styled.Text`
    color: white;
    font-family: Acme;
    font-size: 32px;
`

export const ColorRed = styled.Text`
    color: #c30f0e;
`

export const ButtonSearch = styled.TouchableOpacity`
    height: 40px;
    width: 40px;
    border-radius: 20px;
    align-items: center;
    justify-content: center;
`