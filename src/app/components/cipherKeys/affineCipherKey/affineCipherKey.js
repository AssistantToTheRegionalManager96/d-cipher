import { Col, Container, Form, InputGroup, Row, Stack } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Determinant, GreatestCommonDenominator } from "@/app/utilities/mathUtils";

const AffineCipherKey = ({keyValue, handleKeyValueChange, isValid, handleIsValidChange, alphabet}) => {

    const [aValid, setAValid] = useState(true);
    const [bValid, setBValid] = useState(true);

    const [aDisplay, setADisplay] = useState(keyValue.A);
    const [bDisplay, setBDisplay] = useState(keyValue.b);

    const handleAInput = (input) => {
        var inputValue = parseInt(input);

        if (isNaN(inputValue)) {
            setADisplay("");
            setAValid(false);
        }
        else if (GreatestCommonDenominator(inputValue, alphabet.length) != 1) {
            setADisplay(inputValue);
            setAValid(false);
        }
        else {
            handleKeyValueChange({...keyValue, A: inputValue})
            setADisplay(inputValue);
            setAValid(true);
        }
    }

    const handleBInput = (input) => {
        var inputValue = parseInt(input);

        if (isNaN(inputValue)) {
            setBDisplay("");
            setBValid(false);
        }
        else {
            handleKeyValueChange({...keyValue, b: inputValue})
            setBDisplay(inputValue);
            setBValid(true);
        }
    }

    useEffect(() => {
        handleIsValidChange(aValid && bValid);
    })

    return (
    <Form.Group as={Container}>
        <Form.Label as={Row}>
            Key
        </Form.Label>
        <Row>
            <Col xs={6} sm={5} className="ps-0">
                <InputGroup hasValidation>
                    <InputGroup.Text>A</InputGroup.Text>
                    <Form.Control className={aValid ? "" : "is-invalid"} type="number" min={1} max={alphabet.length - 1} placeholder={keyValue.A} 
                    value={aDisplay} onChange={(e) => {handleAInput(e.target.value)}}></Form.Control>
                    <Form.Control.Feedback type="invalid">A must be co-prime to the length of the alphabet used</Form.Control.Feedback>
                </InputGroup>
            </Col>
            <Col xs={6} sm={5}>
                <InputGroup hasValidation>
                    <InputGroup.Text>b</InputGroup.Text>
                    <Form.Control className={bValid ? "" : "is-invalid"} type="number" value={bDisplay} min={-1024} max={1024} 
                    onChange={(e) => {handleBInput(e.target.value)}} placeholder={keyValue.b} />
                    <Form.Control.Feedback type="invalid">b must be an integer between -1024 and 1024</Form.Control.Feedback>
                </InputGroup>
            </Col>
        </Row>


    </Form.Group>
    )
}

export default AffineCipherKey;