"use client"
import { useState } from "react";
import CipherMenu from "@/app/components/cipherMenu/cipherMenu";
import CryptographicTextArea from "@/app/components/cryptographicTextArea/cryptographicTextArea";
import { Button, Col, Container, Form, InputGroup, Row, Stack } from "react-bootstrap";
import GuidelineArrow from "@/app/components/guidelineArrow/guidelineArrow";
import InvertMod from "@/app/utilities/mathUtils";

const Home = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [plaintext, setPlaintext] = useState("");
    const [ciphertext, setCiphertext] = useState("");
    const [lastUsedPlaintext, setLastUsedPlaintext] = useState("");
    const [lastUsedCiphertext, setLastUsedCiphertext] = useState("");
    const [key, setKey] = useState({
        A: "",
        b: ""
    });

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
        var ainv = InvertMod(key.A, 26)

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
                    <CryptographicTextArea mode="plaintext" value={plaintext} lastUsedValue={lastUsedPlaintext} handleChange={(newValue) => setPlaintext(newValue)}/> 
                    : <CryptographicTextArea mode="ciphertext" value={ciphertext} lastUsedValue={lastUsedCiphertext} handleChange={(newValue) => setCiphertext(newValue)}/> }
                </Col>
                <Col xs={12} sm={12} md={12} lg={6} xl={6}  xxl={6} 
                className="d-flex align-items-start justify-content-xs-center justify-content-sm-center justify-content-md-center justify-content-lg-end justify-content-xl-end justify-conten-xxl-end">
                    <Form.Group>
                        <Form.Label>
                            Key
                        </Form.Label>
                            <InputGroup>
                                <Form.Control type="number" value={key.A} min={1} max={26} step={2}  placeholder="A"
                                onChange={(e) => {if (e.target.value % 2 != 0 && e.target.value < 26) setKey({...key, A: parseInt(e.target.value)})}}></Form.Control>
                                <InputGroup.Text>x + </InputGroup.Text>
                                <Form.Control type="number" value={key.b} onChange={(e) => setKey({...key, b: parseInt(e.target.value)})} placeholder="b"></Form.Control>
                            </InputGroup>
                    </Form.Group>
                </Col>
            </Row>

            <Row className="mt-3 mb-3">
                <Col xs={5}></Col>
                <Col className="d-flex justify-content-center align-items-center">
                    <Button variant="primary" size="lg" disabled={(activeTab == 0 && plaintext == "") || (activeTab == 1 && ciphertext == "")} 
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
        </Container>
    )
}

export default Home;