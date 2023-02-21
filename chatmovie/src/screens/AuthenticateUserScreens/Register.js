import { TouchableOpacity } from "react-native";
import { Label, Input, Button, TitleButton, ContainerLink, Paragraph, TextLink } from "./styles";
import ContainerForm from "./ContainerForm";

const Register = ({ navigation }) => {
    return (
        <ContainerForm>
            <Label> Nome Completo: </Label>
            <Input
                autoComplete='name'
                cursorColor='red'
                inputMode='text'
                placeholder='Digite seu nome completo'
                placeholderTextColor='#aaa'
                selectionColor='red'
            />
            <Label> Username: </Label>
            <Input
                autoComplete='username'
                cursorColor='red'
                inputMode='text'
                placeholder='Crie um username'
                placeholderTextColor='#aaa'
                selectionColor='red'
            />
            <Label> E-mail: </Label>
            <Input
                autoComplete='email'
                cursorColor='red'
                inputMode='email'
                keyboardType='email-address'
                placeholder='Digite seu e-mail'
                placeholderTextColor='#aaa'
                selectionColor='red'
            />
            <Label> Senha: </Label>
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
                    Cadastrar
                </TitleButton>
            </Button>
            <ContainerLink>
                <Paragraph>
                    Já tem conta?
                </Paragraph>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}
                >
                    <TextLink> Faça Login </TextLink>
                </TouchableOpacity>
            </ContainerLink>
        </ContainerForm>
    )
}

export default Register;