"use client"
import { useState } from "react";
import CipherMenu from "@/app/components/cipherMenu/cipherMenu";
import { Button, Col, Container, Form, InputGroup, Row, Stack } from "react-bootstrap";
import {LUDecompose, ForwardSolve, BackwardSolve, Determinant, GreatestCommonDenominator} from "@/app/utilities/mathUtils";
import PaddingMenu from "@/app/components/paddingMenu/paddingMenu";
import InputTextArea from "@/app/components/inputTextArea/inputTextArea";
import HillCipherKey from "@/app/components/cipherKeys/hillCipherKey/hillCipherKey";


const Home = () => {
    const [activeTab, setActiveTab] = useState(0);

    const [plaintext, setPlaintext] = useState("Test");
    const [ciphertext, setCiphertext] = useState("");
    const [lastUsedPlaintext, setLastUsedPlaintext] = useState("");
    const [lastUsedCiphertext, setLastUsedCiphertext] = useState("");

    const [paddingType, setPaddingType] = useState(0);
    const [key, setKey] = useState([
        [1, 2],
        [3, 5]
    ]);

    const [keyValid, setKeyValid] = useState(true);
    const [textValid, setTextValid] = useState(true);
    const [paddingValid, setPaddingValid] = useState(true);

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
                    <InputTextArea value={plaintext} label="Plaintext" lastUsedValue={lastUsedPlaintext} alphabet="abcdefghijklmnopqrstuvwxyz" 
                    handleChange={(value) => setPlaintext(value)} isValid={textValid} handleIsValidChange={(value) => setTextValid(value)}/>
                    : 
                    <InputTextArea value={ciphertext} label="Ciphertext" lastUsedValue={lastUsedCiphertext} alphabet="abcdefghijklmnopqrstuvwxyz" 
                    handleChange={(value) => setCiphertext(value)} />
                }
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
                            <Col>
                                <HillCipherKey keyValue={key} handleKeyValueChange={(value) => setKey(value)} isValid={keyValid} handleIsValidChange={(value) => setKeyValid(value)} />
                            </Col>
                        </Row>
                    </Container>
                    

                </Col>
            </Row>

            <Row className="mt-3 mb-3">
                <Col xs={5}></Col>
                <Col className="d-flex justify-content-center align-items-center">
                    <Button variant="primary" size="lg" disabled={!(textValid && keyValid && paddingValid)} 
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
                        <Form.Group as={Stack}>
                            <Form.Label>Ciphertext</Form.Label>
                            <Form.Control as="textarea" rows={5} value={ciphertext} disabled />
                        </Form.Group>
                        :
                        <Form.Group as={Stack}>
                            <Form.Label>Plaintext</Form.Label>
                            <Form.Control as="textarea" rows={5} value={plaintext} disabled />
                        </Form.Group>

                    }
                </Col>
            </Row>

        </Form>
    )
}

export default Home;