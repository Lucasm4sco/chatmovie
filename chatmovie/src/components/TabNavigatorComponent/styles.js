import styled from "styled-components/native";

export const NavContainer = styled.View`
    position: absolute;
    bottom: 5%;
    left: ${props => props.halfScreen}px;
    width: ${props => props.width}px;
    height: 60px;
    background: black;
    flex-direction: row;
    border-radius: 20px;
    overflow: hidden;
    border: 1px solid #441a19;
`

export const ButtonNavigator = styled.TouchableHighlight`
    width: 60px;
    height: 100%;
    align-items: center;
    justify-content: center;
`