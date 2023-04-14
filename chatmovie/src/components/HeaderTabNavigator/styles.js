import styled from "styled-components/native";

export const HeaderContainer = styled.View`
    height: 60px;
    background-color: black;
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

export const Button = styled.TouchableOpacity`
    height: 40px;
    width: 40px;
    border-radius: 20px;
    align-items: center;
    justify-content: center;
`

export const ViewModal = styled.View`
    margin: 12px;
    background-color: #121212;
    border-width: 1px;
    border-radius: 10px;
    box-shadow: 0px 2px #000000;
    shadow-color: #000;
    shadow-opacity: 0.25;
    shadow-radius: 4px;
    elevation: 5;
`

export const ContainerButtons = styled.View`
    flex-direction: row;
    align-self: flex-end;
`

export const TextModal = styled.Text`
    color: white;
    font-size: 16px;
    font-weight: 500;
    margin: 10px;
    margin-bottom: 2px;  
    padding: 14px;
    padding-bottom: 31px;
    border-bottom-color: #1F1D1D;
    border-bottom-width: 2px
`

export const TextButton = styled.Text`
    color: white;
    font-weight: 500;
    text-align: center;
    font-size: 15px;
`

export const ButtonModal = styled.TouchableOpacity`
    background-color: ${props => props.bgColor};
    margin: 5px;
    margin-right: ${props => props.marginRight || '5'}px;
    margin-bottom: 10px;
    border-radius: 10px;
    padding: 10px 15px;
    elevation: 2;
`