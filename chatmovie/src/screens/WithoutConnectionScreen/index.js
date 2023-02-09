import { Container, Message, Icon } from './styles.js';
import imgNoConnexion from '../../assets/icons/no-wifi.png';

const WithoutConnectionScreen = () => (
    <Container>
        <Icon source={imgNoConnexion} />
        <Message>Ops... Verifique sua conexão com a internet </Message>
    </Container>
);

export default WithoutConnectionScreen;