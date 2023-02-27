import { ContainerButtons, ButtonGoBack } from './styles';
import { AntDesign } from '@expo/vector-icons';

const HeaderGoBack = ({ navigation, children }) => {
    return (
        <ContainerButtons>
            <ButtonGoBack
                activeOpacity={0.6}
                onPress={() => navigation.goBack()}
            >
                <AntDesign name="arrowleft" size={28} color="white" />
            </ButtonGoBack>
            {children}
        </ContainerButtons>
    )
}

export default HeaderGoBack