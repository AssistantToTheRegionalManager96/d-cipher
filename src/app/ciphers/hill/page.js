"use client"
import { useState } from "react";
import CipherMenu from "@/app/components/cipherMenu/cipherMenu";
import CryptographicTextArea from "@/app/components/cryptographicTextArea/cryptographicTextArea";
import { Button, Col, Container, Form, InputGroup, Row, Stack } from "react-bootstrap";
import KeyMatrix from "@/app/components/keyMatrix/keyMatrix";
import {LUDecompose, ForwardSolve, BackwardSolve, Determinant, GreatestCommonDenominator} from "@/app/utilities/mathUtils";
import PaddingMenu from "@/app/components/paddingMenu/paddingMenu";


const Home = () => {
    const [activeTab, setActiveTab] = useState(0);

    const [plaintext, setPlaintext] = useState("");
    const [ciphertext, setCiphertext] = useState("");
    const [lastUsedPlaintext, setLastUsedPlaintext] = useState("");
    const [lastUsedCiphertext, setLastUsedCiphertext] = useState("");

    const [paddingType, setPaddingType] = useState(0);

    const [keyLength, setKeyLength] = useState(2);
    const [keyLengthDisplay, setKeyLengthDisplay] = useState(keyLength);
    const [key, setKey] = useState([
        [0, 0],
        [0, 0]
    ]);

    const [keyValid, setKeyValid] = useState(true);
    const [inputValid, setInputValid] = useState(false);

    const keyMinLength = 2;
    const keyMaxLength = 20;

    const encrypt = (plaintext, key) => {
        var encryptedChars = [];

        var asciiIndexInput = 'a'.charCodeAt(0);
        var asciiIndexOutput = 'A'.charCodeAt(0);

        var k = 0;

        while (k < plaintext.length) {
            for (var i = 0; i < key.length; i++) {
                var sum = 0;
                for (var j = 0; j < key.length; j++) {
                    sum = sum + key[j][i] * (plaintext.charCodeAt(k + j) - asciiIndexInput);
                }

                encryptedChars[k+ i] = String.fromCharCode((sum % 26) + asciiIndexOutput);
            }

            k = k + key.length;
        }

        return encryptedChars.join("");
    }

    const decrypt = (ciphertext, key) => {
        var decryptedChars = [];

        var asciiIndexInput = 'A'.charCodeAt(0);
        var asciiIndexOutput = 'a'.charCodeAt(0);

        try {
            var matrices = LUDecompose(key);

            for (var i = 0; i < ciphertext.length; i = i + key.length) {
                var y = ciphertext.slice(i, i + key.length).split("").map(c => c.charCodeAt(0) - asciiIndexInput);
    
                var b = ForwardSolve(matrices.upper, y, 26);
                var x = BackwardSolve(matrices.lower, b, 26);
    
                for (var j = 0; j < x.length; j++) {
                    decryptedChars[i + j] = String.fromCharCode(x[j] + asciiIndexOutput);
                }
            }
        }
        catch (ex) {
            console.log(ex) // Insert error handling here
        }



        return decryptedChars.join("");
    }

    const handleKeyLengthChange = (element) => {
        var length = parseInt(element.value);

        if (isNaN(length)) {
            setKeyLengthDisplay("");
            element.classList.add("is-invalid");
            return;
        }
        else if (length > keyMaxLength || length < keyMinLength) {
            setKeyLengthDisplay(length);
            element.classList.add("is-invalid");
            return;
        }

        var newKey = JSON.parse(JSON.stringify(key));

        if (length > keyLength) {
            for (var i = keyLength; i < length; i++) {
                newKey.forEach(row => {
                    row.push(0);
                })

                newKey.push(new Array(i + 1).fill(0))
            }
        }
        else {
            newKey = newKey.slice(0, length);
            newKey.forEach((row, index) => {
                newKey[index] = row.slice(0, length);
            })
        }

        setKey(newKey);
        setKeyLength(length);
        setKeyLengthDisplay(length);
        element.classList.remove("is-invalid");
    }

    const handleKeyLoseFocus = (e) => {
        try {
            var det = Determinant(key);
            if (GreatestCommonDenominator(det, 26) != 1) setKeyValid(false);
            else setKeyValid(true);
        }
        catch {
            setKeyValid(false);
        }
    }

    const handleRunButton = () => {
        if (activeTab == 0) {
            var encryptedText = encrypt(plaintext, key);

            setLastUsedCiphertext(encryptedText);
            setCiphertext(encryptedText);
            setLastUsedPlaintext(plaintext);
        }
        else {
            var decryptedText = decrypt(ciphertext, key);

            setLastUsedPlaintext(decryptedText);
            setPlaintext(decryptedText);
            setLastUsedCiphertext(ciphertext);
        }
    }

    return (
        <Form as={Container} noValidate className="mt-5">
            <Row>
                <CipherMenu activeTab={activeTab} setActiveTab={setActiveTab}>Hill Cipher</CipherMenu>
            </Row>

            <Row className="mt-5 border rounded p-2">
                <Col xs={12} sm={12} md={12} lg={6} xl={6}  xxl={6} className="d-flex align-items-center mb-1">
                    {activeTab == 0 ? 
                    <CryptographicTextArea mode="plaintext" value={plaintext} lastUsedValue={lastUsedPlaintext} handleChange={(newValue) => setPlaintext(newValue)}/> 
                    : <CryptographicTextArea mode="ciphertext" value={ciphertext} lastUsedValue={lastUsedCiphertext} handleChange={(newValue) => setCiphertext(newValue)}/> }
                </Col>
                <Col xs={12} sm={12} md={12} lg={6} xl={6}  xxl={6} 
                className="d-flex align-items-start justify-content-xs-center justify-content-sm-center justify-content-md-center justify-content-lg-end justify-content-xl-end justify-conten-xxl-end">
                    <Container>
                        <Row>
                            <Col>
                                <PaddingMenu paddingType={paddingType} handlePaddingTypeChange={(type) => setPaddingType(type)}/>
                            </Col>
                        </Row>
                        <Row>
                            <Form.Group>
                                <Form.Label>
                                    Key
                                </Form.Label>

                                <InputGroup className="mb-1" hasValidation>
                                    <InputGroup.Text>Size (2 - 10)</InputGroup.Text>
                                    <Form.Control type="number" placeholder={keyLength} value={keyLengthDisplay} onChange={(e) => handleKeyLengthChange(e.target)}></Form.Control>
                                    <Form.Control.Feedback type="invalid">Provide input in range ({keyMinLength}-{keyMaxLength})</Form.Control.Feedback>
                                </InputGroup>
                                <InputGroup hasValidation>
                                    <KeyMatrix keyValue={key} isValid={keyValid} showLabels={false} handleKeyUpdate={(keyValue) => setKey(keyValue)} onBlur={(e) => handleKeyLoseFocus(e)} allowDuplicates={true}  itemsPerRow={keyLength} />
                                    <Form.Control.Feedback type="invalid">Matrix must be invertible</Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Row>
                    </Container>
                    

                </Col>
            </Row>

            <Row className="mt-3 mb-3">
                <Col xs={5}></Col>
                <Col className="d-flex justify-content-center align-items-center">
                    <Button variant="primary" size="lg" disabled={!inputValid} 
                            onClick={handleRunButton}>{activeTab == 0 ? "Encrypt" : "Decrypt"}</Button>
                </Col>
                <Col xs={5}></Col>
            </Row>

            <Row>
                <Col xs={5}>
                </Col>
                <Col className="d-flex justify-content-center align-items-center">
                    <i className="bi bi-arrow-down h1"></i>
                </Col>
                <Col xs={5}>
                </Col>
            </Row>

            <Row>
                <Col xs={12} sm={12} md={12} lg={6} xl={6}  xxl={6} className="d-flex align-items-center mb-1">
                    {activeTab == 0 ? 
                        <CryptographicTextArea active={false} mode="ciphertext" value={lastUsedCiphertext} lastUsedValue={lastUsedCiphertext}/>
                        : <CryptographicTextArea active={false} mode="plaintext" value={lastUsedPlaintext} lastUsedValue={lastUsedPlaintext}/>}
                </Col>
            </Row>

        </Form>
    )
}

export default Home;