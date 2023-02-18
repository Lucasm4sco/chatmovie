import styled from "styled-components/native";

export const CardItem = styled.TouchableOpacity`
    height: 180px;
    width: 100%;
    padding: 10px;
    border: 1px solid #441a19;
    margin-bottom: 40px;
    border-radius: 10px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

export const ImageMovie = styled.Image`
    width: 110px;
    height: 160px;
`

export const ViewAbout = styled.View`
    flex: 1;
    padding: 5px 10px 5px 20px;
    height: 100%;
`

export const TitleMovie = styled.Text`
    font-size: 18px;
    height: 50px;
    color: white;
    font-weight: bold;
    margin-bottom: 30px;
`

export const DescriptionMovie = styled.Text`
    font-size: 14px;
    color: #AAA;
`