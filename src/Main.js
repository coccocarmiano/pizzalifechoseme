import salento from './salento.txt'

import {
    Container,
    Row,
    Col,
    Form,
    Button,
} from 'react-bootstrap';

import {
    useEffect,
    useState
} from 'react';

const SALENTO = async () => {
    return fetch(salento)
        .then(res => res.text())
        .then(txt => txt.split('\n'));
}

const MainPhrase = () => {
    const inlineDisplay = { display: "inline" };
    const position = { position: "absolute", bottom: "0px" };
    return (
        <Row className="d-inline-flex pt-3 col-sm-8 offset-sm-2">
            <h3 className="d-flex align-items-end">La </h3>
            <h1 className="d-flex align-items-end font-weight-bold fade-in">PizzaLife</h1>
            <h3 className="d-flex align-items-end"> ti ha scelto?</h3>
        </Row>
    )
}
const CenterDiv = (props) => {
    return (<div align={"center"}>{props.txt}</div>);
}

const TextBefore = (props) => {
    return <CenterDiv txt={props.comune ? `Risultati per ${props.comune}:` : "Inizia a Digiatare."} />
}

const StylishButton = (props) => {

    const [name, CAP] = [props.cityName || '_NONAME', props.CAP || '_NOCAP'];

    return (
        <Button className="w-100 px-1 mt-1" variant="dark">
            <Container fluid>
                <Row>
                    <Col>
                        <h5 className="font-weight-bold text-left p-0 my-1">
                            {name}
                        </h5>
                    </Col>
                    <Col className="d-flex my-1 text-muted align-items-center justify-content-end">
                        {CAP}
                    </Col>
                </Row>
            </Container>
        </Button>
    );
}

const UserInteraction = (props) => {

    const [input, setInput] = useState('');
    const [ready, setReady] = useState(false);
    const [list, setList] = useState([])
    const regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;

    const onChange = (evt) => setInput(evt.target.value);

    useEffect(async () => {
        const data = await SALENTO();
        const cityAndCaps = data.map(e => { let x = e.split(','); return [x[0], x[2]]; });
        setList(cityAndCaps);
        setReady(true);
    }, [])

    return (
        <Container fluid>
            <Row className="pt-3">
                <Form.Control type="text" placeholder="Inserisci il tuo comune" onChange={onChange} />
            </Row>
            <hr />
            <TextBefore comune={input} />
            {input === '' || !ready ? '' :
                list
                    .filter(
                        elem => {
                            let [city, cap] = [...elem];
                            return city.toLowerCase()
                            .replace(regex, '')
                            .includes(input.toLowerCase().replace(regex, '')) ||
                            cap?.includes(input);
                        })
                    .map(elem => <StylishButton cityName={elem[0]} CAP={elem[1]} />)}
        </Container>
    );
}

const Main = (props) => {
    const [done, setDone] = useState(false);

    return (
        <Container className="text-light">
            <MainPhrase />
            <UserInteraction />
        </Container>
    )
}

export default Main;