import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TouchableOpacity, ActivityIndicator as Spinner } from "react-native";
import { Label, Input, Button, TitleButton, ContainerLink, Paragraph, TextLink, ContainerError, ErrorMessage } from "./styles";
import { Register as RegisterAction } from "../../slices/authSlice";
import ContainerForm from "./ContainerForm";

const Register = ({ navigation }) => {
    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { register } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const handleSubmit = () => {
        if(register.loading)
            return

        const userData = {
            name,
            user_name: userName,
            email,
            password,
            confirm_password: confirmPassword
        }

        dispatch(RegisterAction(userData));
    }

    return (
        <ContainerForm error={register?.error}>
            {register?.error && (
                <ContainerError>
                    <ErrorMessage>
                        {register.error}
                    </ErrorMessage>
                </ContainerError>
            )}
            <Label> Nome Completo: </Label>
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
            <Label> Username: </Label>
            <Input
                autoComplete='username'
                cursorColor='red'
                inputMode='text'
                placeholder='Crie um username'
                placeholderTextColor='#aaa'
                selectionColor='red'
                value={userName || ''}
                onChangeText={text => setUserName(text)}
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
                value={email || ''}
                onChangeText={text => setEmail(text)}
            />
            <Label> Senha: </Label>
            <Input
                secureTextEntry
                cursorColor='red'
                inputMode='text'
                placeholder='Crie uma senha'
                placeholderTextColor='#aaa'
                selectionColor='red'
                value={password || ''}
                onChangeText={text => setPassword(text)}
            />
            <Label> Confirmar senha: </Label>
            <Input
                secureTextEntry
                cursorColor='red'
                inputMode='text'
                placeholder='Digite sua senha novamente'
                placeholderTextColor='#aaa'
                selectionColor='red'
                value={confirmPassword || ''}
                onChangeText={text => setConfirmPassword(text)}
                onSubmitEditing={handleSubmit}
            />
            <Button 
                activeOpacity={0.6}
                onPress={handleSubmit}
                >
                {register?.loading ? (
                    <Spinner
                        size="large"
                        color="white"
                        animating
                    />
                ) : (
                    <TitleButton>
                        Cadastrar
                    </TitleButton>
                )}
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