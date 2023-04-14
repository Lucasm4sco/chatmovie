import { useState } from "react";
import { StatusBar, Modal } from "react-native";
import { ColorRed, HeaderContainer, Text, Button, ViewModal, TextModal, ContainerButtons, ButtonModal, TextButton } from "./styles";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useDispatch } from "react-redux";
import { removeDataStorage } from "../../utils/storage";
import { reset } from "../../slices/authSlice";
import { resetDataUsers } from "../../slices/userSlice";
import { messageActions } from "../../slices/messageSlice";

const HeaderTabNavigator = ({ navigation, route, auth }) => {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch()

    const logout = async () => {
        await Promise.all([
            Promise.resolve(removeDataStorage()),
            dispatch(reset()),
            dispatch(resetDataUsers()),
            dispatch(messageActions.resetAllMessages()),
        ]);

        setShowModal(false);
    }

    return (
        <HeaderContainer>
            <StatusBar />
            <Text>C<ColorRed>M</ColorRed></Text>
            {route.name === 'Home' && (
                <Button
                    activeOpacity={0.6}
                    onPress={() => navigation.navigate('Search')}
                >
                    <Ionicons name="search" size={28} color="white" />
                </Button>
            )}
            {auth && route.name === 'Authenticate' && (
                <Button
                    activeOpacity={0.6}
                    onPress={() => setShowModal(true)}
                >
                    <MaterialIcons name="login" size={28} color="white" />
                </Button>
            )}
            {auth && route.name === 'Messages' && (
                <Button
                    activeOpacity={0.6}

                >
                    <MaterialIcons name="add" size={32} color="white" />
                </Button>
            )}
            <Modal
                animationType="fade"
                transparent={true}
                visible={showModal}
                onRequestClose={() => setShowModal(false)}
            >
                <ViewModal>
                    <TextModal>Deseja deixar sua conta?</TextModal>
                    <ContainerButtons>
                        <ButtonModal
                            bgColor='black'
                            onPress={() => setShowModal(false)}
                        >
                            <TextButton>Cancelar</TextButton>
                        </ButtonModal>
                        <ButtonModal
                            bgColor='red'
                            onPress={logout}
                        >
                            <TextButton>Sair</TextButton>
                        </ButtonModal>
                    </ContainerButtons>
                </ViewModal>
            </Modal>
        </HeaderContainer>
    )
}

export default HeaderTabNavigator;