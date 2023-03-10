import styled from "styled-components/native";

export const ContainerUsers = styled.ScrollView`
    background-color: #121212
`

export const CardUser = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: space-between;
    background-color: #242121;
    border: 1px solid black;
    width: 98%;
    max-width: 400px;
    height: 65px;
    padding: 10px;
    border-radius: 5px;
    margin: 8px 0
`

export const ContainerInfoUser = styled.View`
    height: ${props => props.autoHeight ? 'auto' : '100%'};
    width: ${props => props.width}%;
    flex-direction: row;
    align-items:center;
`

export const ContainerAddIcon = styled.View`
    height: 100%;
    width: 15%;
    justify-content: center;
    align-items:center;
`

export const UserImage = styled.Image`
    height: 40px;
    width: 40px;
    border-radius: 20px
`

export const UserName = styled.Text`
    color: white;
    height: 100%;
    font-weight: 600;
    font-size: 16px;
    margin: 8px 0 0 15px
`

export const ButtonAdd = styled.TouchableOpacity`
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
`

// friend requests components

export const CardUserRequest = styled.TouchableOpacity`
    background-color: #242121;
    border: 1px solid black;
    width: 98%;
    max-width: 400px;
    height: 130px;
    padding: 15px;
    border-radius: 5px;
    margin: 8px 0
`

export const UserNameCardRequest = styled.Text`
    color: white;
    font-weight: 600;
    font-size: 16px;
    margin: 0 0 2px 20px
`

export const ContainerButtons = styled.View`
    flex-direction: row;
    flex: 1;
    margin: 18px 10px 0; 
    justify-content: space-between;
    align-items: center
`

export const ButtonAcionRequest = styled.TouchableOpacity`
    background-color: ${props => props.bgCollor};
    padding: 8px;
    width: 45%
`

export const TextButtonAction = styled.Text`
    color: white;
    font-size: 15px;
    font-weight: 700
    font-family: Roboto
    text-align: center;
`