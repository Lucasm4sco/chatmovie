import { KeyboardAvoidingView } from "react-native";
import { Container } from "./styles";

const ContainerForm = ({ children }) => (
    <KeyboardAvoidingView
        behavior="height"
        keyboardVerticalOffset={185}
        contentContainerStyle={{ flex: 1 }}
    >
        <Container contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100%',
            paddingBottom: 20
        }}>
            {children}
        </Container>
    </KeyboardAvoidingView>
)

export default ContainerForm;