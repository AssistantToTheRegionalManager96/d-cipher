import { Button, Col, Container, Form, Row } from "react-bootstrap";

const InputTextArea = ({value, lastUsedValue, label, alphabet, handleChange, maxLength = 5000, active = true, rowCount = 5}) => {
    
    var regex = new RegExp(`[^${alphabet}]`, 'gi');
    
    const handleInput = (inputValue) => {
        var newValue = inputValue.replace(regex, '');
        if (newValue.length > maxLength) return;
        handleChange(newValue);
    }


    return (
        <Form.Group as={Container}>
            <Form.Label>
                {`${label} (${maxLength - value.length} characters left)`}
            </Form.Label>
            <Row>
                <Form.Control as="textarea" rows={rowCount} value={value} disabled={!active} onChange={(e) => {handleInput(e.target.value)}} />
            </Row>
            <Row className="mt-1">
                <Col xs={9} sm={9} md={9} lg={9} xl={9} xxl={9} className="d-flex justify-content-start align-items-center ps-0">
                {lastUsedValue != "" && lastUsedValue != value ? `The ${label} has changed since last operation` : ""}
                </Col>
                <Col xs={3} sm={3} md={3} lg={3} xl={3} xxl={3} className="d-flex justify-content-end align-items-center pe-0">
                    <Button variant="danger" onClick={() => handleChange("")} disabled={!active}>Clear</Button>
                </Col>
            </Row>

        </Form.Group>
    )

}

export default InputTextArea;