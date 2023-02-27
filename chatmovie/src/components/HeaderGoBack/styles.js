import styled from "styled-components/native";

export const ContainerButtons = styled.View`
    width: 100%;
    height: 65px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0px 10px;
    background-color: #111212;
    overflow: hidden;
    shadow-color: black;
    shadow-radius: 10px;
    shadow-opacity: 1;
`

export const ButtonGoBack = styled.TouchableHighlight`
    height: 50px;
    width: 50px;
    border-radius: 25px;
    align-items: center;
    justify-content: center;
    background-color: transparent;
`