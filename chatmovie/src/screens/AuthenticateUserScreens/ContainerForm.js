import { useRef, useEffect } from 'react';
import { KeyboardAvoidingView } from "react-native";
import { Container } from "./styles";
import { useDispatch } from 'react-redux';

const ContainerForm = ({ children, error }) => {
    const scrollRef = useRef();
    const dispatch = useDispatch()

    useEffect(() => {
        if(error)
            scrollRef?.current?.scrollTo({x: 0, y: 0, animated: true});

    }, [error])

    return (
        <KeyboardAvoidingView
            behavior="height"
            keyboardVerticalOffset={150}
            contentContainerStyle={{ flex: 1 }}
        >
            <Container
                contentContainerStyle={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100%',
                    paddingBottom: 20
                }}
                ref={scrollRef}
            >
                {children}
            </Container>
        </KeyboardAvoidingView>
    )
}
export default ContainerForm;