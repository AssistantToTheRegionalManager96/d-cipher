import { Col, Container, Form, InputGroup, Row, Stack } from "react-bootstrap";
import { useState } from "react";
import KeyGrid from "../../grids/keyGrid/keyGrid";

const PermutationCipherKey = ({keyValue, handleKeyValueChange}) => {
    const minLength = 1;
    const maxLength = 100;
    const keyLength = Object.keys(keyValue).length;

    const [keyLengthDisplay, setKeyLengthDisplay] = useState(keyLength);
    const [keyLengthValid, setKeyLengthValid] = useState(true);

    const handleLengthChange = (value) => {
        var newLength = parseInt(value);
        console.log(value);

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

        var keyArray = Object.entries(keyValue);

        if (newLength == keyArray.length) {
            setKeyLengthDisplay(newLength);
            setKeyLengthValid(true);
            return;
        }
        else if (newLength < keyArray.length) {
            while(newLength < keyArray.length) {
                var last = keyArray.pop();

                var idx = keyArray.findIndex((element) => element[1] == last[0]);
                ~idx && (keyArray[idx][1] = last[1]);
            }
        }
        else {
            for (var i = keyArray.length; i < newLength; i++) {
                keyArray.push([i.toString(), i.toString()])
            }
        }

        handleKeyValueChange(Object.fromEntries(keyArray));
        setKeyLengthDisplay(newLength);
        setKeyLengthValid(true);
    }

    return (
    <Form.Group as={Container}>
        <Form.Label as={Row}>
            Key
        </Form.Label>
        <InputGroup as={Row} className="w-auto mb-2">
            <Col className="d-flex align-items-center p-0">
                Length ({minLength}-{maxLength}):
            </Col>
            <Col className="p-0">
                <Form.Control className={keyLengthValid ? "" : "is-invalid"} type="number" placeholder={keyLength} value={keyLengthDisplay} 
                onChange={(e) => handleLengthChange(e.target.value)}/>
                <Form.Control.Feedback type="invalid">Provide input in range ({minLength}-{maxLength})</Form.Control.Feedback>
            </Col>
        </InputGroup>
        <InputGroup className="p-0">
            <Col className={"p-0"}>
                <KeyGrid keyValue={keyValue} showLabels={true} handleKeyUpdate={(value) => handleKeyValueChange(value)}  itemsPerRow={10} />
            </Col>
        </InputGroup>
    </Form.Group>
    )
}

export default PermutationCipherKey;