import styled from "styled-components/native";

export const Container = styled.ScrollView`
    background: #1e1e20;
    padding: 10px;
    height: 100%;
    max-width: 400px;
`

export const Label = styled.Text`
    width: 90%;
    color: white;
    font-size: 17px;
    font-weight: bold;
    padding: 10px;
`

export const Input = styled.TextInput`
    width: 90%;
    font-size: 16px;
    padding: 10px 10px;
    border: 1px solid gray;
    border-radius: 10px;
    color: #AAA
    margin: 5px 0 20px;
`

export const Button = styled.TouchableOpacity`
    width: 90%;
    justify-content: center;
    align-items: center;
    padding: 12px;
    border-radius: 100px;
    background-color: red;
    margin: 20px 0;
`

export const TitleButton = styled.Text`
    font-size: 18px;
    font-weight: 700;
    color: white;
`

export const ContainerLink = styled.View`
    flex-direction: row;
    margin: 10px;
`

export const Paragraph = styled.Text`
    font-size: 14px;  
    color: #d5d5d5;
`

export const TextLink = styled.Text`
    color: red;
    font-weight: 700;
`