import { Container, Title } from "@mantine/core";
import '../styles/Header.scss';

const Header: React.FC = () => {
    return (
        <Container id="header_container">
            <Title id="headertext" order={2} color="white" align="center">Currency Converter</Title>
            <Title id="subheadertext" order={5} color="gray" align="center">Created by Alexander Arizola</Title>
        </Container>
    )
}

export default Header;
