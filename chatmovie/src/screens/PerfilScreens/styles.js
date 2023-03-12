import styled from "styled-components/native";

export const Container = styled.ScrollView` 
    background-color: #121212;
`

export const LimitContainer = styled.View`
    width: 98%;
    max-width: 400px;
    overflow: hidden;
`

export const CenterContent = styled.View`
    width: 100%;
    justify-content: center;
    align-items: center;
`

export const CoverImage = styled.ImageBackground`
    width: 100%;
    height: 180px;
    background-color: #37474f;
    border-radius: 5px
    overflow: hidden
`

export const PerfilPicture = styled.ImageBackground`
    width: 105px;
    height: 105px;
    border-radius: 60px;
    border: 2px solid #bfbfbf;
    top: -50px;
    overflow: hidden;
    background-color: black;
`

export const PerfilName = styled.Text`
    font-size: 22px;
    text-align: center;
    top: -35px;
    font-weight: 700;
    color: white
`

export const UserName = styled.Text`
    text-align: center;
    color: red;
    top: -30px;
    margin: 0 20px
`

export const ContainerRow = styled.View`
    flex-direction: row;
    justify-content: center;
    padding: 10px;
    margin-bottom: 8px;
`

export const Button = styled.TouchableOpacity`
    margin: 0 20px;
    flex-direction: row;
    background-color: ${props => props.bgColor};
    padding: 10px 30px;
    border-radius: 6px
    top: -5px;
    align-items: center
`

export const TextButton = styled.Text`
    font-weight: bold;
    color: white;
    margin: 0 5px
`

export const BioContainer = styled.Text`
    padding: 14px 10px;
    color: aliceblue;
    background-color: #441a19;
    border-radius: 5px;
    text-align: center;
    margin: 10px;
`

export const TitleSection = styled.Text`
    font-size: 18px;
    color: #FFF;
    font-weight: bold;
    margin: 20px
`

export const WithoutMovies = styled.Text`
    margin: 14px 20px;
    font-size: 16px;
    text-align: center;
    color: #AAA;
`