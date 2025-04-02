import { useEffect } from "react";
import { Button, Col, Container, Form, InputGroup, Row, Stack } from "react-bootstrap";

const InputTextArea = ({value, isValid, handleIsValidChange, lastUsedValue, label, alphabet, handleChange, maxLength = 5000, active = true, rowCount = 5, checkForChanges = true}) => {
    
    var regex = new RegExp(`[^${alphabet}]`, 'gi');
    
    const handleInput = (inputValue) => {
        var newValue = inputValue.replace(regex, '');
        if (newValue.length > maxLength) return;
        handleChange(newValue);
    }

    useEffect(() => {
        handleIsValidChange(value.length > 0 && value.length < maxLength)
    })

    return (
        <Form.Group as={Container}>
            <InputGroup as={Row} className="w-auto" hasValidation>
                <Form.Label>
                    {`${label} (${maxLength - value.length} characters left)`}
                </Form.Label>
                <Form.Control as="textarea" className={isValid ? "" : "is-invalid"} rows={rowCount} value={value} disabled={!active} onChange={(e) => {handleInput(e.target.value)}} />
                <Form.Control.Feedback type="invalid">Insert valid text</Form.Control.Feedback>
            </InputGroup>
            <Row className="mt-1">
                <Col xs={9} sm={9} md={9} lg={9} xl={9} xxl={9} className="d-flex justify-content-start align-items-center ps-0">
                {checkForChanges && lastUsedValue != "" && lastUsedValue != value ? `The ${label} has changed since last operation` : ""}
                </Col>
                <Col xs={3} sm={3} md={3} lg={3} xl={3} xxl={3} className="d-flex justify-content-end align-items-center pe-0">
                    <Button variant="danger" onClick={() => handleChange("")} disabled={!active}>Clear</Button>
                </Col>
            </Row>

        </Form.Group>
    )

}

export default InputTextArea;