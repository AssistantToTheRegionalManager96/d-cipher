"use client"
import { useState } from "react";
import CipherMenu from "@/app/components/cipherMenu/cipherMenu";
import CryptographicTextArea from "@/app/components/cryptographicTextArea/cryptographicTextArea";
import { Button, Col, Container, Form, InputGroup, Row, Stack } from "react-bootstrap";
import InputTextArea from "@/app/components/inputTextArea/inputTextArea";


const Home = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [alphabet, setAlphabet] = useState("abcdefghijklmnopqrstuvwxyz");

    const [plaintext, setPlaintext] = useState("test");
    const [ciphertext, setCiphertext] = useState("");
    const [lastUsedPlaintext, setLastUsedPlaintext] = useState("");
    const [lastUsedCiphertext, setLastUsedCiphertext] = useState("");

    const [key, setKey] = useState(0);

    const [textValid, setTextValid] = useState(true);

    const encrypt = (input, key) => {
        var encryptedChars = [];
        var alphabetChars = alphabet.split("");

        for (var i = 0; i < input.length; i++) {
            encryptedChars.push(alphabetChars[(alphabetChars.indexOf(input.charAt(i)) + key) % alphabetChars.length]);
        }

        return encryptedChars.join("");
    }

    const decrypt = (input, key) => {
        var decryptedChars = [];
        var alphabetChars = alphabet.split("");

        for (var i = 0; i < input.length; i++) {
            decryptedChars.push(alphabetChars[((alphabetChars.indexOf(input.charAt(i)) - key) % alphabetChars.length + alphabetChars.length) % alphabetChars.length]);
        }

        return decryptedChars.join("");
    }

    const handleRunButton = () => {
        try {
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
        catch (error) {
            console.log(error);
        }
    }

    return (
        <Container className="mt-5">
            <Row>
                <CipherMenu activeTab={activeTab} setActiveTab={setActiveTab}>Caesar Cipher</CipherMenu>
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
                className="d-flex align-items-start justify-content-start">
                    <Form.Group>
                        <Form.Label>
                            Key
                        </Form.Label>
                        <InputGroup>
                            <Form.Control type="number" value={key} onChange={(e) =>  {if (e.target.value < 1024) setKey(parseInt(e.target.value))}}></Form.Control>
                            <InputGroup.Text>mod 26</InputGroup.Text>
                        </InputGroup>
                    </Form.Group>
                </Col>
            </Row>

            <Row className="mt-3 mb-3">
                <Col xs={5}></Col>
                <Col className="d-flex justify-content-center align-items-center">
                    <Button variant="primary" size="lg" disabled={!(textValid)} 
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