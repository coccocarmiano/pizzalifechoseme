import {
    Container,
    Row,
    Col,
    Form,
} from 'react-bootstrap';

const MainPhrase = () => {
    const inlineDisplay = { display: "inline" };
    const position = { position: "absolute", bottom: "0px" };
    return (
        <Row className="d-inline-flex">
            <h3 className="d-flex align-items-end">La </h3>
            <h1 className="d-flex align-items-end font-weight-bold fade-in">PizzaLife</h1>
            <h3 className="d-flex align-items-end"> ti ha scelto?</h3>
        </Row>
    )
}

const Main = (props) => {
    return (
        <Container className="text-light">
            <Row>
                <Col className="col-sm-6 offset-sm-3 pt-3">
                    <MainPhrase />
                </Col>
            </Row>
            <Row>
                <Col className="col-10 offset-1">
                    <Form.Control type="text" placeholder="Inserisci il tuo comune"/>
                </Col>
            </Row>
        </Container>
    )
}

export default Main;