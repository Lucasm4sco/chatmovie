import styled from 'styled-components/native';

export const ContainerScreen = styled.View`
    flex: 1;
    background-color: #121212;
`

export const HeaderMessage = styled.View`
    width: 100%;
    height: 70px;
    background: #090707;
    flex-shrink: 0;
    flex-direction: row;
    align-items: center;
    padding: 0px 25px;
    border-radius: 5px;
`

export const ImageProfile = styled.Image`
    width: 42px;
    height: 42px;
    border-radius: 25px;
    border: 1px solid black;
`

export const UserName = styled.Text`
    color: white;
    font-size: 18px;
    font-weight: 500;
    top: -3px;
    flex-grow: 1;
    padding-left: 12px;
    padding-right: 20px;
    max-width: 75%;
`

export const ButtonClose = styled.TouchableHighlight`
    width: 50px;
    height: 50px;
    border-radius: 25px;
    justify-content: center;
    align-items: center;
`

export const ContainerBody = styled.ScrollView`
    flex: 1;
    flex-grow: 1;
`

export const TextWithoutMessage = styled.Text`
    font-size: 16px;
    color: #AAA;
    margin: 30px;
    text-align: center;
`

export const MessageComponent = styled.View`
    min-width: 150px;
    max-width: 60%;
    background-color: #242121;
    padding: 5px;
    margin: 20px;
    border: 1px solid black;
    border-radius: 13px;
    align-self: ${props => props.isMyMessage ? 'flex-end' : 'flex-start'};
    border-left-width: ${props => props.isMyMessage ? '1px' : '3px'};
    border-right-width: ${props => props.isMyMessage ? '3px' : '1px'};
`

export const TextMessage = styled.Text`
    max-width: 100%;
    margin: 5px 15px 5px 6px;
    color: white;
    font-size: 16px;
    flex-wrap: wrap;
`

export const TimeMessage = styled.Text`   
    color: #565555;
    font-weight: 500;   
    font-size: 12px;
    align-self: flex-end;
    padding: 6px 8px 0;
`

export const ContainerForm = styled.View`
    width: 100%;
    height: 80px;
    flex-shrink: 0;
    flex-direction: row;
    padding: 5px 8px 0 15px;
`

export const Input = styled.TextInput`
    width: 90%;
    height: 48px;
    background-color: #302D2D;
    border-radius: 10px;
    border: 1px solid black;
    padding: 0 12px;
    font-size: 18px;
    flex-shrink: 1;
    color: white
`

export const ButtonSendMessage = styled.TouchableHighlight`
    width: 50px;
    height: 48px;
    border-radius: 25px;
    background-color: red;
    flex-shrink: 0;
    margin: 0 5px;
    padding: 10px 0px 0 16px;
`