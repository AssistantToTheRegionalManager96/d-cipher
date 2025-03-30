import { Col, Container, Form, InputGroup, Row, Stack } from "react-bootstrap";
import KeyMatrix from "@/app/components/grids/keyMatrix/keyMatrix";
import { useEffect, useState } from "react";
import { Determinant, GreatestCommonDenominator } from "@/app/utilities/mathUtils";

const HillCipherKey = ({keyValue, handleKeyValueChange, isValid, handleIsValidChange}) => {

    const minLength = 2;
    const maxLength = 20;

    const [keyLengthDisplay, setKeyLengthDisplay] = useState(keyValue.length);
    const [keyLengthValid, setKeyLengthValid] = useState(true);

    const handleLengthChange = (value) => {
        var newLength = parseInt(value);

        if (isNaN(newLength)) {
            setKeyLengthDisplay("");
            setKeyLengthValid(false);
            return;
        }
        else if (newLength > maxLength || newLength < minLength) {
            setKeyLengthDisplay(newLength);
            setKeyLengthValid(false);
            return;
        }

        var newKeyValue = JSON.parse(JSON.stringify(keyValue));

        if (newLength > keyValue.length) {
            for (var i = keyValue.length; i < newLength; i++) {
                newKeyValue.forEach(row => {
                    row.push(0);
                })

                newKeyValue.push(new Array(i + 1).fill(0))
            }
        }
        else {
            newKeyValue = newKeyValue.slice(0, newLength);
            newKeyValue.forEach((row, index) => {
                newKeyValue[index] = row.slice(0, newLength);
            })
        }

        setKeyLengthDisplay(newLength);
        handleKeyValueChange(newKeyValue);
        setKeyLengthValid(true);
    }

    useEffect(() => {
        try {
            var det = Determinant(keyValue);
            if (GreatestCommonDenominator(det, 26) != 1) handleIsValidChange(false);
            else handleIsValidChange(true);
        }
        catch (error) {
            handleIsValidChange(false);
        }
    })

    return (
    <Form.Group as={Container}>
        <Form.Label as={Row}>
            Key
        </Form.Label>
        <InputGroup as={Row} className="w-auto mb-2">
            <Col className="d-flex align-items-center p-0">
                Matrix side length ({minLength}-{maxLength}):
            </Col>
            <Col className="p-0">
                <Form.Control className={keyLengthValid ? "" : "is-invalid"} type="number" placeholder={keyValue.length} value={keyLengthDisplay} 
                onChange={(e) => handleLengthChange(e.target.value)}/>
                <Form.Control.Feedback type="invalid">Provide input in range ({minLength}-{maxLength})</Form.Control.Feedback>
            </Col>
        </InputGroup>
        <InputGroup className="p-0" hasValidation>
            <Col className={"p-0" + (isValid ? "" : "is-invalid border border-danger rounded-1")}>
                <KeyMatrix keyValue={keyValue} showLabels={false} handleKeyUpdate={(keyValue) => handleKeyValueChange(keyValue)} itemsPerRow={keyValue.length} />
                <Form.Control.Feedback type="invalid">Matrix must be invertible</Form.Control.Feedback>
            </Col>
        </InputGroup>
    </Form.Group>


    )
}

export default HillCipherKey;