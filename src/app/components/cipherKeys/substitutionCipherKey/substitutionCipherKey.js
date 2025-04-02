import { Col, Container, Form, InputGroup, Row, Stack } from "react-bootstrap";
import { useState } from "react";
import KeyGrid from "../../grids/keyGrid/keyGrid";

const SubstitutionCipherKey = ({keyValue, handleKeyValueChange}) => {
    return (
    <Form.Group as={Container}>
        <Form.Label as={Row}>
            Key
        </Form.Label>
        <InputGroup className="p-0">
            <Col className={"p-0"}>
                <KeyGrid keyValue={keyValue} showLabels={true} handleKeyUpdate={(value) => handleKeyValueChange(value)}  itemsPerRow={10} />
            </Col>
        </InputGroup>
    </Form.Group>
    )
}

export default SubstitutionCipherKey;