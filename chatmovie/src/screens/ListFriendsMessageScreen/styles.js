import styled from "styled-components/native";

export const Header = styled.View`
    width: 100%;
    height: 65px;
    background-color: black;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0px 10px;
`

export const ButtonGoBack = styled.TouchableHighlight`
    height: 50px;
    width: 50px;
    border-radius: 25px;
    align-items: center;
    justify-content: center;
    background-color: transparent;
`

export const ContainerScreen = styled.ScrollView`
    flex: 1;
    background-color: #121212;
`

export const CenterContent = styled.View`
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
`

export const TextWithoutMessage = styled.Text`
    font-size: 16px;
    color: #aaa;
    margin: 0 20px;
`

export const TextColorRed = styled.Text`
    font-size: 16px;
    color: red;
    text-align: center;
`

export const CardUser = styled.TouchableOpacity`
    width: 100%;
    max-width: 400px;
    height: 80px;
    flex-direction: row;
    justify-content: flex-start;
    padding: 12px 10px;
    background-color: #242121;
    margin-top: 9px;
    border-radius: 5px;
`

export const ImageProfileUser = styled.Image`
    width: 55px;
    height: 55px;
    border-radius: 35px;
`

export const UserName = styled.Text`
    font-size: 16px;
    margin: 8px 12px;
    font-weight: 600;
    color: white;
`