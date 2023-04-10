import styled from 'styled-components/native';

export const ContainerMessages = styled.ScrollView`
    flex: 1;
    background-color: #121212;
`

export const CardMessage = styled.TouchableOpacity`
    width: 100%;
    max-width: 400px;
    height: 110px;
    justify-content: space-between;
    padding: 12px 10px;
    background-color: #242121;
    margin-top: 7px;
    border-radius: 5px;
`

export const ContainerRow = styled.View`
    flex-direction: row;
    justify-content: ${props => props.content};
    width: ${props => props.width}%;
` 

export const ImageProfileUser = styled.Image`
    width: 45px;
    height: 45px;
    border-radius: 25px;
`

export const UserName = styled.Text`
    font-size: 16px;
    margin: 8px 12px;
    font-weight: 600;
    color: white;
`

export const TextMessage = styled.Text`
    margin: 0px 10px;
    font-size: 16px;
    color: #B8B8B8;
`

export const MessageNotVisualized = styled.View`
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: red;
    margin: 10px;
`

export const CenterContent = styled.View`
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
`

export const TextWithoutMessage = styled.Text`
    font-size: 16px;
    color: ${props => props.color};
    margin: 2px 20px;
`

export const WithoutMessage = styled.Text`
    text-align-vertical: center;
    font-size: 16px;
    color: #AAA;
`

export const TextColorRed = styled.Text`
    font-size: 16px;
    color: red;
`

export const ButtonSendFirstMessage = styled.TouchableOpacity`

`