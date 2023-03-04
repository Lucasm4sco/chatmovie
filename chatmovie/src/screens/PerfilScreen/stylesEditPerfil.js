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

export const ButtonUpdateUser = styled.TouchableOpacity`
    background-color: red
    padding: 10px 20px;
    border-radius: 20px
`

export const UpdateUserText = styled.Text`
    color: white;
    font-weight: bold;
`

export const ErrorMessage = styled.Text`
    text-align: center
    min-height: 40px;
    padding: 10px 15px;
    background-color: #ff5252;
    font-weight: 600;
    color: #5c0002
`

export const ButtonChangePhoto = styled.TouchableOpacity`
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.53);
    justify-content: center;
    align-items: center;
`

export const Label = styled.Text`
    color: white;
    margin: 2px 7px;
    font-size: 14px;
`

export const Input = styled.TextInput`
    font-size: 16px;
    background-color: rgba(98, 88, 88, .2);
    color: rgba(229, 229, 229, 1);
    min-height: 50px;
    border-radius: 4px
    padding: 10px;
    border: 1px solid black;
    margin: 5px;
    margin-bottom: 15px;
`

export const InputDisabled = styled.TextInput`
    font-size: 16px;
    background-color: rgba(21, 17, 17, 1);
    color: rgba(229, 229, 229, 1);
    height: 50px;
    border-radius: 4px
    padding: 0 10px;
    border: 1px solid black;
    margin: 5px;
    margin-bottom: 15px;
`