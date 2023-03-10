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
    height: 100%;
    width: 85%;
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