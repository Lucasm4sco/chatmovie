import styled from "styled-components/native";

export const StatusBar = styled.View`
    height: ${props => props.height}px;
    width: 100%;
    background-color: black;
`

export const Container = styled.ScrollView`
    flex: 1;
    background-color: #121212;
`

export const ButtonFavorite = styled.TouchableOpacity`
    height: 40px;
    width: 40px;
    border-radius: 25px;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border: 1px solid white;
    margin: 5px 15px;
`

export const ImageMovie = styled.Image`
    height: 250px;
    width: 100%;
    max-width: 400px;
    rezise-mode: cover;
`

export const TitleMovie = styled.Text`
    font-size: 22px;
    margin: 20px 0px 20px 30px;
    width: 100%;
    max-width: 400px;
    font-weight: bold;
    color: white
`

export const ContainerGenres = styled.View`
    width: 100%;
    max-width: 400px;
    flex-direction: row;
    flex-wrap: wrap;
`

export const Genre = styled.Text`
    padding: 10px 15px;
    background-color: red;
    margin: 5px 10px;
    color: white;
    font-weight: bold;
    border-radius: 5px
`

export const SubTitle = styled.Text`
    font-size: 20px;
    margin: 5px;
    max-width: 400px;
    font-weight: bold;
    color: white
`

export const TextYearMovie = styled.Text`
    margin: 20px 10px;
    font-size: 17px;
    color: white;
    background-color: #133463;
    padding: 5px 10px;
    font-weight: 700;
    border-radius: 2px;
`

export const ViewLimitContent = styled.View`
    width: 95%;
    max-width: 400px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

export const DescriptionMovie = styled.Text`
    font-size: 16px;
    margin: 20px;
    margin-bottom: 0px;
    width: 95%;
    max-width: 400px;
    color: white;
    text-align: ${props => props.textAlign};
`

export const TextShowMore = styled.Text`
    font-size: 17px;
    color: red;
    padding: 5px;
    font-weight: bold;
`
