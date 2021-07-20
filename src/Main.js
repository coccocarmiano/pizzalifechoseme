import salento from './salento.json'

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

const load_salento = async () => {
    return salento;
}

const MainPhrase = () => {
    return (
        <Row>
            <Col className="d-inline-flex pt-3">
                <h3 className="d-flex align-items-end">La </h3>
                <h1 className="d-flex align-items-end font-weight-bold fade-in">PizzaLife</h1>
                <h3 className="d-flex align-items-end"> ti ha scelto?</h3>
            </Col>
        </Row>
    )
}
const CenterDiv = (props) => {
    return (<div align={"center"} hidden={props.hidden}>{props.txt}</div>);
}

const TextBefore = (props) => {
    return <CenterDiv txt={props.comune ? `Risultati per ${props.comune}:` : "Inizia a Digiatare."} hidden={props.hidden} />
}

const StylishButton = (props) => {

    const city = props.city.city;
    const cap = props.city.CAP;

    return (
        <Button className="w-100 px-1 mt-1 fade-in-fast" variant="dark" onClick={() => props.onClick(props.city)} hidden={props.hidden}>
            <Container fluid>
                <Row>
                    <Col>
                        <h5 className="font-weight-bold text-left p-0 my-1">
                            {city}
                        </h5>
                    </Col>
                    <Col className="d-flex my-1 text-muted align-items-center justify-content-end">
                        {cap}
                    </Col>
                </Row>
            </Container>
        </Button>
    );
}

const CityNameBig = (props) => {
    if (!props.selected)
        return '';
    const style = { fontSize: "3.5em" };
    return (<div>
        <span className="fade-in d-flex flex-wrap" style={style}>{props.selected.city}</span>
    </div>);
}

const CityStats = (props) => {
    if (!props.selected)
        return ''
    const city = props.selected;
    const cities = props.salento;
    const mean = 0.945
    const std = 0.493
    const above = (mean+std).toFixed(2);
    const under = (mean-std).toFixed(2);
    let phrase = '';
    let i = 0;
    let j = 0;
    let NN = parseFloat(city.NN);
    let NN2 = 0;

    for (i = 0; i < cities.length; i++){
        NN2 = parseFloat(cities[i].NN)
        console.log(NN, "<", NN2, NN < NN2)
        if (NN < NN2)
            j++;
    }



    return (
        <>
            <div className="d-inline-flex fade-in-slow">
                <span style={{fontSize: "2m"}}><h1>#{j + 1}</h1></span>
                <span><h4>su {i}</h4></span>
            </div>
            <div>
                <span>{city.city} ha {city.NN.replace('.', ',')} pizzerie ogni 1000 abitanti.</span>
                <br/>
                <br/>
                <span>{city.city} è </span>
                <span style={{color: 'green'}}>{ NN >= above ? 'sopra la media' : '' } </span>
                <span style={{color: 'red'}}>{ NN <= under ? 'sotto la media' : '' } </span>
                <span style={{color: 'yellow'}}>{ NN > under && NN < above ? 'nella media' : '' } </span>
                <span> rispetto al Salento. ({`${under}-${above}`})</span>
                <br/>
                <br/>
                { NN < above && NN > under ? <img className="w-100" src="https://i.gifer.com/origin/fd/fd16a4d1761fde0ab ca4a77f952a6f28.gif"/> : '' }
                { NN >= above ? <img className="w-100" src="https://media1.tenor.com/images/ccd013ec58d4ada1055ae4726173e6a4/tenor.gif?itemid=10355985"/> : '' }
                { NN <= under ? <img className="w-100" src="https://media.tenor.com/images/1dc29a769911552cca1e4c5cd83c4590/tenor.gif"/> : '' }
                
            </div>
        </>
    )
}

const UserInteraction = (props) => {

    const [input, setInput] = useState('');
    const [salento, setSalento] = useState({});
    const regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
    const [selected, setSelected] = useState(false);

    const onChange = (evt) => setInput(evt.target.value);

    useEffect(async () => {
        const _temp = await load_salento().then(_obj => setSalento(_obj), (err) => console.log(err));
    }, [])

    return (
        <Container fluid>
            <Row className="pt-3">
                <Form.Control className="fade-out" type="text" placeholder="Inserisci il tuo comune" onChange={onChange} hidden={selected} />
            </Row>
            <hr />
            <TextBefore comune={input} hidden={selected} />
            {input.length < 3 || !salento ? '' :
                salento.
                    filter(elem => elem.city.replace(regex, '').toLowerCase()
                        .includes(input.replace(regex, '').toLowerCase())
                        || elem.CAP.includes(input))
                    .map(elem => <StylishButton city={elem} key={elem.key} hidden={selected} onClick={setSelected} />)}
            <CityNameBig selected={selected} />
            <CityStats selected={selected} salento={salento} />
            <br />
            <br />
        </Container>
    );
}

const Main = (props) => {
    return (
        <Container className="text-light">
            <MainPhrase />
            <UserInteraction />
        </Container>
    )
}

export default Main;