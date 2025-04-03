"use client"
import { useState } from "react";
import CipherMenu from "@/app/components/cipherMenu/cipherMenu";
import CryptographicTextArea from "@/app/components/cryptographicTextArea/cryptographicTextArea";
import { Button, Col, Container, Form, InputGroup, Row, Stack } from "react-bootstrap";
import {ModuloInvert} from "@/app/utilities/mathUtils";
import InputTextArea from "@/app/components/inputTextArea/inputTextArea";
import AffineCipherKey from "@/app/components/cipherKeys/affineCipherKey/affineCipherKey";

const Home = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [alphabet, setAlphabet] = useState("abcdefghijklmnopqrstuvwxyz");

    const [plaintext, setPlaintext] = useState("test");
    const [ciphertext, setCiphertext] = useState("");
    const [lastUsedPlaintext, setLastUsedPlaintext] = useState("");
    const [lastUsedCiphertext, setLastUsedCiphertext] = useState("");

    const [key, setKey] = useState({
        A: "",
        b: ""
    });

    const [keyValid, setKeyValid] = useState(true);
    const [textValid, setTextValid] = useState(true);


    const encrypt = (plaintext, key) => {
        var encryptedChars = [];

        var asciiIndexInput = 'a'.charCodeAt(0);
        var asciiIndexOutput = 'A'.charCodeAt(0);

        plaintext.split("").forEach((character) => {
            var charCode = character.charCodeAt(0);
            encryptedChars.push(String.fromCharCode(((charCode - asciiIndexInput) * key.A + key.b) % 26 + asciiIndexOutput));
        })

        return encryptedChars.join("");
    }

    const decrypt = (ciphertext, key) => {
        var decryptedChars = [];

        var asciiIndexInput = 'A'.charCodeAt(0);
        var asciiIndexOutput = 'a'.charCodeAt(0);
        var ainv = ModuloInvert(key.A, 26)

        ciphertext.split("").forEach((character) => {
            var charCode = character.charCodeAt(0);
            decryptedChars.push(String.fromCharCode((ainv * (charCode - asciiIndexInput - key.b) % 26 + 26) % 26 + asciiIndexOutput));
        })

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
        <Container className="mt-5">
            <Row>
                <CipherMenu activeTab={activeTab} setActiveTab={setActiveTab}>Affine Cipher</CipherMenu>
            </Row>

            <Row className="mt-5 border rounded p-2">
            <Col xs={12} sm={12} md={12} lg={6} xl={6}  xxl={6} className="d-flex align-items-center mb-1">
                    {activeTab == 0 ? 
                        <InputTextArea value={plaintext} label="Plaintext" lastUsedValue={lastUsedPlaintext} alphabet={alphabet} 
                        handleChange={(value) => setPlaintext(value)} isValid={textValid} handleIsValidChange={(value) => setTextValid(value)}/>
                        : 
                        <InputTextArea value={ciphertext} label="Ciphertext" lastUsedValue={lastUsedCiphertext} alphabet={alphabet} 
                        handleChange={(value) => setCiphertext(value)} isValid={textValid} handleIsValidChange={(value) => setTextValid(value)}/>
                    }
                </Col>
                <Col xs={12} sm={12} md={12} lg={6} xl={6}  xxl={6} 
                className="d-flex align-items-start justify-content-xs-center justify-content-sm-center justify-content-md-center justify-content-lg-end justify-content-xl-end justify-conten-xxl-end">
                    <AffineCipherKey keyValue={key} handleKeyValueChange={(value) => setKey(value)} isValid={keyValid} 
                    handleIsValidChange={(value) => setKeyValid(value)}alphabet={alphabet} />
                </Col>
            </Row>

            <Row className="mt-3 mb-3">
                <Col xs={5}></Col>
                <Col className="d-flex justify-content-center align-items-center">
                    <Button variant="primary" size="lg" disabled={!(textValid && keyValid)} 
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
                <Col></Col>
                <Col xs={6} className="d-flex align-items-center mb-1">
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
                <Col></Col>
            </Row>
        </Container>
    )
}

export default Home;