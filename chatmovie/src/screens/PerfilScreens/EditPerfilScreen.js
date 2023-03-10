import { useState, useEffect } from "react";
import { Container, LimitContainer, CenterContent, CoverImage, PerfilPicture } from "./styles";
import { ActivityIndicator as Spinner } from 'react-native';
import { Header, ButtonGoBack, ButtonUpdateUser, UpdateUserText, ErrorMessage, ButtonChangePhoto, Label, Input, InputDisabled } from "./stylesEditPerfil";
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from "../../slices/userSlice";
import Requests from "../../utils/requestsAPI";
import * as ImagePicker from 'expo-image-picker';

import iconeUser from '../../assets/icons/user.png';

const EditProfileScreen = ({ navigation }) => {
    const { user, update } = useSelector(state => state.user);

    if (!user)
        return null;

    const cover_image_user = user.cover_image && { uri: Requests.getURLImage('capa', user.cover_image) };
    const profile_picture_user = user.profile_picture ? ({ uri: Requests.getURLImage('perfil', user.profile_picture) }) : iconeUser;

    const dispatch = useDispatch();
    const [imageDataForm, setImageDataForm] = useState({
        cover_image: null,
        profile_picture: null
    });
    const [coverImage, setCoverImage] = useState(cover_image_user);
    const [profilePicture, setProfilePicture] = useState(profile_picture_user);
    const [name, setName] = useState(user?.name);
    const [userName, setUserName] = useState(user?.user_name);
    const [bio, setBio] = useState(user?.bio);

    const handleImageDataForm = (key, path) => {
        const fileURL = path;
        const fileName = fileURL.split("/").pop();
        const ext = fileURL.split(".").pop();

        const newImageData = { ...imageDataForm }
        newImageData[key] = {
            uri: fileURL,
            name: fileName,
            type: "image/" + ext
        }
        setImageDataForm(newImageData);
    }

    const chooseImage = async (field) => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: field === 'cover_image' ? [4, 2] : [4, 4],
            quality: 1,
        });

        if (result.canceled)
            return

        if (field === 'cover_image') {
            handleImageDataForm('cover_image', result.assets[0].uri);
            return setCoverImage({ ...result.assets[0] });
        }

        handleImageDataForm('profile_picture', result.assets[0].uri);
        return setProfilePicture({ ...result.assets[0] });
    }

    const updateUser = () => {
        const userData = new FormData();
        const profilePictureHasChanged = JSON.stringify(profilePicture) !== JSON.stringify(profile_picture_user);
        const coverImageHasChanged = JSON.stringify(coverImage) !== JSON.stringify(cover_image_user);

        if (profilePictureHasChanged)
            userData.append('profile_picture', imageDataForm.profile_picture);

        if (coverImageHasChanged)
            userData.append('cover_image', imageDataForm.cover_image);

        userData.append('name', name);
        userData.append('user_name', userName);
        userData.append('bio', bio);
        dispatch(updateUserProfile(userData));
    }

    useEffect(() => {
        if (update.success)
            navigation.goBack();
    }, [update.success])

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
                    onPress={updateUser}
                >
                    {update.loading ? (
                        <Spinner
                            size='small'
                            color="white"
                            animating
                        />
                    ) : (
                        <UpdateUserText>
                            Salvar
                        </UpdateUserText>
                    )}
                </ButtonUpdateUser>
            </Header>
            {update.error && <ErrorMessage>{update.error}</ErrorMessage>}
            <Container
                contentContainerStyle={{
                    alignItems: 'center',
                    paddingTop: 5,
                    paddingBottom: 90
                }}
            >
                <LimitContainer>
                    <CoverImage source={coverImage}>
                        <ButtonChangePhoto
                            activeOpacity={0.6}
                            onPress={() => chooseImage('cover_image')}
                        >
                            <FontAwesome5 name="edit" size={24} color="white" />
                        </ButtonChangePhoto>
                    </CoverImage>
                    <CenterContent>
                        <PerfilPicture source={profilePicture}>
                            <ButtonChangePhoto
                                activeOpacity={0.6}
                                onPress={() => chooseImage('profile_picture')}
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