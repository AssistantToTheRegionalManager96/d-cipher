"use client"
import { useState } from "react";
import CipherMenu from "@/app/components/cipherMenu/cipherMenu";
import CryptographicTextArea from "@/app/components/cryptographicTextArea/cryptographicTextArea";
import { Button, Col, Container, Form, InputGroup, Row, Stack } from "react-bootstrap";
import GuidelineArrow from "@/app/components/guidelineArrow/guidelineArrow";


const Home = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [plaintext, setPlaintext] = useState("");
    const [ciphertext, setCiphertext] = useState("");
    const [lastUsedPlaintext, setLastUsedPlaintext] = useState("");
    const [lastUsedCiphertext, setLastUsedCiphertext] = useState("");
    const [key, setKey] = useState(0);

    const encrypt = (plaintext, key) => {
        var encryptedChars = [];

        var asciiIndexInput = 'a'.charCodeAt(0);
        var asciiIndexOutput = 'A'.charCodeAt(0);

        plaintext.split("").forEach((character) => {
            var charCode = character.charCodeAt(0);
            encryptedChars.push(String.fromCharCode((charCode - asciiIndexInput + key) % 26 + asciiIndexOutput));
        })

        return encryptedChars.join("");
    }

    const decrypt = (ciphertext, key) => {
        var decryptedChars = [];

        var asciiIndexInput = 'A'.charCodeAt(0);
        var asciiIndexOutput = 'a'.charCodeAt(0);

        ciphertext.split("").forEach((character) => {
            var charCode = character.charCodeAt(0);
            decryptedChars.push(String.fromCharCode(((charCode - asciiIndexInput - key) % 26 + 26) % 26 + asciiIndexOutput));
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
                <CipherMenu activeTab={activeTab} setActiveTab={setActiveTab}>Caesar Cipher</CipherMenu>
            </Row>

            <Form as={Row} className="mt-5">
                <Col xs={12} sm={12} md={12} lg={12} xl={4}  xxl={4} className="d-flex align-items-center mb-1">
                    {activeTab == 0 ? 
                    <CryptographicTextArea mode="plaintext" value={plaintext} lastUsedValue={lastUsedPlaintext} handleChange={(newValue) => setPlaintext(newValue)}/> 
                    : <CryptographicTextArea mode="ciphertext" value={ciphertext} lastUsedValue={lastUsedCiphertext} handleChange={(newValue) => setCiphertext(newValue)}/> }
                </Col>

                <Col xs={12} sm={12} md={12} lg={12} xl={1}  xxl={1} className="d-flex align-items-center justify-content-center mb-1">
                    <GuidelineArrow/>
                </Col>

                <Col xs={12} sm={12} md={12} lg={12} xl={2}  xxl={2} className="d-flex align-items-center justify-content-center mb-5 ps-0 pe-0">
                    <Form.Group className="ps-0 pe-0">
                        <Form.Label>
                            Key
                        </Form.Label>
                        <div className="d-flex flex-xl-column flex-xxl-column gap-1">
                            <InputGroup>
                                <Form.Control type="number" value={key} onChange={(e) =>  {if (e.target.value < 1024) setKey(parseInt(e.target.value))}}></Form.Control>
                                <InputGroup.Text>mod 26</InputGroup.Text>
                            </InputGroup>
                            <Button variant="primary" disabled={(activeTab == 0 && plaintext == "") || (activeTab == 1 && ciphertext == "")} 
                            onClick={handleRunButton}>{activeTab == 0 ? "Encrypt" : "Decrypt"}</Button>
                        </div>
                    </Form.Group>
                </Col>

                <Col xs={12} sm={12} md={12} lg={12} xl={1}  xxl={1} className="d-flex align-items-center justify-content-center mb-1">
                    <GuidelineArrow/>
                </Col>

                <Col xs={12} sm={12} md={12} lg={12} xl={4}  xxl={4} className="d-flex align-items-center mb-1">
                {activeTab == 0 ? 
                    <CryptographicTextArea active={false} mode="ciphertext" value={lastUsedCiphertext} lastUsedValue={lastUsedCiphertext}/>
                    : <CryptographicTextArea active={false} mode="plaintext" value={lastUsedPlaintext} lastUsedValue={lastUsedPlaintext}/>}
                </Col>
            </Form>
        </Container>
    )
}

export default Home;