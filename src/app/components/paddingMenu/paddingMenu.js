import { useEffect } from "react";
import {  Col, Container, Form, Row, Stack } from "react-bootstrap";


const PaddingMenu = ({paddingType, handlePaddingTypeChange, alphabet, specificCharacter, handleSpecificCharacterChange, isValid, handleIsValidChange}) => {
    var regex = new RegExp(`[^${alphabet}]`, 'gi');

    const handleSpecificCharacterInput = (inputValue) => {
        var newValue = inputValue.replace(regex, '');
        if (newValue.length > 1) return;
        handleSpecificCharacterChange(newValue);
    }

    useEffect(() => {
        if (paddingType == 1 && specificCharacter.length != 1) {
            handleIsValidChange(false);

        }
            
        else handleIsValidChange(true);
    })

    return (
        <Form.Group as={Container}>
            <Form.Label as={Row}>Padding</Form.Label>
            <Row>
                <Col className="d-flex p-0 ms-1 mb-1 align-items-center">
                    <Form.Check type="radio" label="Random characters" name="paddingType" checked={paddingType == 0} onChange={() => handlePaddingTypeChange(0)}/>
                </Col>
                <Col>
                </Col>
            </Row>
            <Row>
                <Col className="d-flex p-0 ms-1 mb-1 align-items-center">
                    <Form.Check type="radio" label="Specific Character:" name="paddingType" checked={paddingType == 1} onChange={() => handlePaddingTypeChange(1)}/>
                </Col>
                <Col className="p-0 ms-1 mb-1">
                    <Form.Control className={isValid ? "" : "is-invalid"} type="text" maxLength={1} disabled={paddingType == 0} 
                    value={specificCharacter} onChange={(e) => handleSpecificCharacterInput(e.target.value)}/>
                    <Form.Control.Feedback type="invalid">Insert valid padding character</Form.Control.Feedback>
                </Col>
            </Row>
        </Form.Group>
    )
}

export default PaddingMenu;