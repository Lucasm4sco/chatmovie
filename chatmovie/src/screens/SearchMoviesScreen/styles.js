import styled from 'styled-components/native';

export const Container = styled.ScrollView`
    flex: 1;
    padding: 10px 20px;
    background-color: #121212;
`

export const ContainerHeader = styled.View`
    height: 90px;
    background-color: black;
    padding-top: ${props => props.paddingTop}px;
    border-bottom-width: 1px;
    border-bottom-color: #441a19;
    justify-content: center;
    padding-horizontal: 25px;
`

export const ButtonGoBack = styled.TouchableHighlight`
    height: 50px;
    width: 40px;
    border-radius: 20px;
    align-items: center;
    justify-content: center;
    background-color: transparent;
`

export const ViewLimitContent = styled.View`
    width: 100%;
    max-width: 400px;
    min-height: 100%;
`

export const SearchBarContainer = styled.View`
    width: 90%;
    margin: 40px 5%;
    background: transparent;
    flex-direction: row;
    justify-content: space-between;
    border-radius: 40px;
    overflow: hidden;
    padding: 5px;
    border: 1px solid red;
`

export const SearchBar = styled.TextInput`
    flex: 6;
    padding: 10px;
    padding-right: 0px;
    font-size: 18px;
    color: white;
`

export const ButtonSearch = styled.TouchableOpacity`
    padding: 10px;
    flex: 1;
`

export const TitleQuery = styled.Text`
    font-size: 20px;
    margin: 5px 0 40px 10px;
    color: white;
    text-align: center
`

export const TextRed = styled.Text`
    color: red;
    font-weight: bold;
`

export const WithoutMovies = styled.Text`
    font-size: 18px;
    margin: 70px 0;
    text-align: center;
    width: 100%;
    color: #AAA;
`