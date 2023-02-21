import { TouchableOpacity } from "react-native";
import { Label, Input, Button, TitleButton, Paragraph, ContainerLink, TextLink } from "./styles"
import ContainerForm from "./ContainerForm";

const Login = ({ navigation }) => {
    return (
        <ContainerForm>
            <Label>E-mail: </Label>
            <Input
                autoComplete='email'
                cursorColor='red'
                inputMode='email'
                keyboardType='email-address'
                placeholder='E-mail de usuário'
                placeholderTextColor='#aaa'
                selectionColor='red'
            />
            <Label>Senha: </Label>
            <Input
                secureTextEntry
                cursorColor='red'
                inputMode='text'
                placeholder='Senha de usuário'
                placeholderTextColor='#aaa'
                selectionColor='red'
            />
            <Button activeOpacity={0.6}>
                <TitleButton>
                    Entrar
                </TitleButton>
            </Button>
            <ContainerLink>
                <Paragraph>
                    Não tem uma conta?
                </Paragraph>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Register')}
                >
                    <TextLink> Cadastrar </TextLink>
                </TouchableOpacity>
            </ContainerLink>
        </ContainerForm>
    )
}

export default Login