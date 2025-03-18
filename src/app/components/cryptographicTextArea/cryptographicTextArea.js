import { Button, Col, Container, Form, Row } from "react-bootstrap";

const CryptographicTextArea = ({mode, value, lastUsedValue, handleChange, maxLength = 5000, active = true}) => {

    return (
        <Form.Group as={Container}>
            <Form.Label>
                {`${String(mode).charAt(0).toUpperCase() + String(mode).slice(1)} ${value.length != 0 && active ? `(${maxLength - value.length} characters left)` : ""}`}
            </Form.Label>
            <Row>
                <Form.Control as="textarea" rows={5} value={value} disabled={!active}
                onChange={(e) => {
                    var newValue = e.target.value.replace(/[^a-z]/gi, '');
                    
                    if (newValue.length > maxLength) return;

                    if (mode == "plaintext" || mode == "key") newValue = newValue.toLowerCase();
                    else newValue = newValue.toUpperCase();
                    handleChange(newValue);
                }}>
                </Form.Control>
            </Row>
            {active && 
                <Row className="mt-1">
                    <Col xs={9} sm={9} md={9} lg={9} xl={9} xxl={9} className="d-flex justify-content-start align-items-center ps-0">
                    {lastUsedValue != "" && lastUsedValue != value ? `The ${mode} has changed since last operation` : ""}
                    </Col>
                    <Col xs={3} sm={3} md={3} lg={3} xl={3} xxl={3} className="d-flex justify-content-end align-items-center pe-0">
                        <Button variant="danger" onClick={() => handleChange("")} disabled={!active}>Clear</Button>
                    </Col>
                </Row>
            }

        </Form.Group>
    )

}

export default CryptographicTextArea;