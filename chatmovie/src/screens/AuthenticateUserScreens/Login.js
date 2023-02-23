import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TouchableOpacity, ActivityIndicator as Spinner } from "react-native";
import { Label, Input, Button, TitleButton, Paragraph, ContainerLink, TextLink, ContainerError, ErrorMessage } from "./styles"
import { Login as LoginAction } from "../../slices/authSlice";
import ContainerForm from "./ContainerForm";

const Login = ({ navigation }) => {
    const [loginValue, setLoginValue] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const handleSubmit = () => {
        if (login.loading)
            return

        const userData = { login: loginValue, password };
        dispatch(LoginAction(userData));
    }

    return (
        <ContainerForm error={login?.error}>
            {login?.error && (
                <ContainerError>
                    <ErrorMessage>{login.error}</ErrorMessage>
                </ContainerError>
            )}
            <Label>Login: </Label>
            <Input
                autoComplete='email'
                cursorColor='red'
                inputMode='email'
                keyboardType='email-address'
                placeholder='E-mail ou nome de usuário'
                placeholderTextColor='#aaa'
                selectionColor='red'
                value={loginValue || ''}
                onChangeText={text => setLoginValue(text)}
            />
            <Label>Senha: </Label>
            <Input
                secureTextEntry
                cursorColor='red'
                inputMode='text'
                placeholder='Senha de usuário'
                placeholderTextColor='#aaa'
                selectionColor='red'
                value={password || ''}
                onChangeText={text => setPassword(text)}
            />
            <Button
                activeOpacity={0.6}
                onPress={handleSubmit}
            >
                {login?.loading ? (
                    <Spinner
                        size="large"
                        color="white"
                        animating
                    />
                ) : (
                    <TitleButton>
                        Entrar
                    </TitleButton>
                )}
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