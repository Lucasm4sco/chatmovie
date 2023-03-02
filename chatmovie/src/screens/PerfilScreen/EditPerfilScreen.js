import { useState } from "react";
import { Container, LimitContainer, CenterContent, CoverImage, PerfilPicture } from "./styles";
import { Header, ButtonGoBack, ButtonUpdateUser, UpdateUserText, ButtonChangePhoto, Label, Input, InputDisabled } from "./stylesEditPerfil";
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import Requests from "../../utils/requestsAPI";

import iconeUser from '../../assets/icons/user.png';

const EditProfileScreen = ({ route, navigation }) => {
    const { user } = route.params;
    const cover_image_user = user?.cover_image && Requests.getURLImage('capa', user.cover_image)
    const profile_picture_user = user?.profile_picture ? ({ uri: Requests.getURLImage('perfil', user.profile_picture) }) : iconeUser;

    const dispatch = useDispatch();
    const [coverImage, setCoverImage] = useState(cover_image_user);
    const [profilePicture, setProfilePicture] = useState(profile_picture_user);
    const [name, setName] = useState(user?.name);
    const [userName, setUserName] = useState(user?.user_name);
    const [bio, setBio] = useState(user?.bio);

    if (!user)
        return null;

    return (
        <>
            <Header>
                <ButtonGoBack
                    activeOpacity={0.6}
                    underlayColor='rgba(204, 22, 22, 0.78)'
                    onPress={() => navigation.goBack()}
                >
                    <AntDesign name="close" size={24} color="white" />
                </ButtonGoBack>
                <ButtonUpdateUser
                    activeOpacity={0.6}
                >
                    <UpdateUserText>Salvar</UpdateUserText>
                </ButtonUpdateUser>
            </Header>
            <Container
                contentContainerStyle={{
                    alignItems: 'center',
                    paddingTop: 5,
                    paddingBottom: 90
                }}
            >
                <LimitContainer>
                    {coverImage ? (
                        <CoverImage
                            source={{ uri: coverImage }}
                        >
                            <ButtonChangePhoto
                                activeOpacity={0.6}
                                onPress={() => { }}
                            >
                                <FontAwesome5 name="edit" size={24} color="white" />
                            </ButtonChangePhoto>
                        </CoverImage>
                    ) : (
                        <CoverImage>
                            <ButtonChangePhoto
                                activeOpacity={0.6}
                                onPress={() => { }}
                            >
                                <FontAwesome5 name="edit" size={24} color="white" />
                            </ButtonChangePhoto>
                        </CoverImage>
                    )}
                    <CenterContent>
                        <PerfilPicture source={profilePicture}>
                            <ButtonChangePhoto
                                activeOpacity={0.6}
                                onPress={() => { }}
                            >
                                <FontAwesome5 name="edit" size={15} color="white" />
                            </ButtonChangePhoto>
                        </PerfilPicture>
                    </CenterContent>
                    <Label>Nome: </Label>
                    <Input
                        autoComplete='name'
                        cursorColor='red'
                        inputMode='text'
                        placeholder='Digite seu nome completo'
                        placeholderTextColor='#aaa'
                        selectionColor='red'
                        value={name || ''}
                        onChangeText={text => setName(text)}
                    />
                    <Label>Username: </Label>
                    <Input
                        autoComplete='username'
                        cursorColor='red'
                        inputMode='text'
                        placeholder='Digite seu novo username'
                        placeholderTextColor='#aaa'
                        selectionColor='red'
                        value={userName || ''}
                        onChangeText={text => setUserName(text)}
                    />
                    <Label>Email: </Label>
                    <InputDisabled
                        editable={false}
                        readOnly
                        selectionColor='red'
                        value={user?.email || ''}
                        onChangeText={text => setEmail(text)}
                    />
                    <Label>Bio: </Label>
                    <Input
                        cursorColor='red'
                        inputMode='text'
                        placeholder='Crie uma biografia'
                        placeholderTextColor='#aaa'
                        selectionColor='red'
                        value={bio || ''}
                        onChangeText={text => setBio(text)}
                        multiline={true}
                        numberOfLines={3}
                        style={{
                            textAlignVertical: "top"
                        }}
                    />
                </LimitContainer>
            </Container>
        </>
    )
}

export default EditProfileScreen;