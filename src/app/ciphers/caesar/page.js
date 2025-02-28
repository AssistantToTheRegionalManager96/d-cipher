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

    const handleRunButton = () => {
        if (activeTab == 0) {
            var encryptedChars = [];

            plaintext.split("").forEach((character) => {
                encryptedChars.push(String.fromCharCode((character.charCodeAt(0) - 'a'.charCodeAt(0) + key) % 26 + 'A'.charCodeAt(0)))
            })

            setLastUsedCiphertext(encryptedChars.join(""));
            setCiphertext(encryptedChars.join(""));
            setLastUsedPlaintext(plaintext);
        }
        else {
            var decryptedChars = [];

            ciphertext.split("").forEach((character) => {
                decryptedChars.push(String.fromCharCode((character.charCodeAt(0) - 'A'.charCodeAt(0) - key) % 26 + 'a'.charCodeAt(0)))
            })

            setLastUsedPlaintext(decryptedChars.join(""));
            setPlaintext(decryptedChars.join(""));
            setLastUsedCiphertext(ciphertext);
        }
    }

    return (
        <Container className="mt-5">
            <Row>
                <CipherMenu activeTab={activeTab} setActiveTab={setActiveTab}>Caesar Cipher</CipherMenu>
            </Row>

            <Form as={Row} className="mt-5">
                <Col xs={12} sm={12} md={12} lg={12} xl={4}  xxl={4} className="mb-1">
                    {activeTab == 0 ? 
                    <CryptographicTextArea mode="plaintext" value={plaintext} lastUsedValue={lastUsedPlaintext} handleChange={(newValue) => setPlaintext(newValue)}/> 
                    : <CryptographicTextArea mode="ciphertext" value={ciphertext} lastUsedValue={lastUsedCiphertext} handleChange={(newValue) => setCiphertext(newValue)}/> }
                </Col>

                <Col xs={12} sm={12} md={12} lg={12} xl={1}  xxl={1} className="d-flex align-items-center justify-content-center mb-1">
                    <GuidelineArrow/>
                </Col>

                <Col xs={12} sm={12} md={12} lg={12} xl={2}  xxl={2} className="d-flex align-items-center justify-content-center mb-1">
                    <Form.Group className="ps-0 pe-0">
                        <Form.Label>
                            Key
                        </Form.Label>
                        <div className="d-flex flex-xl-column flex-xxl-column gap-1">
                            <InputGroup>
                                <Form.Control type="number" value={key} onChange={(e) => setKey(parseInt(e.target.value))}></Form.Control>
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

                <Col xs={12} sm={12} md={12} lg={12} xl={4}  xxl={4} className="mb-1">
                {activeTab == 0 ? 
                    <CryptographicTextArea active={false} mode="ciphertext" value={lastUsedCiphertext} lastUsedValue={lastUsedCiphertext}/>
                    : <CryptographicTextArea active={false} mode="plaintext" value={lastUsedPlaintext} lastUsedValue={lastUsedPlaintext}/>}
                </Col>
            </Form>
        </Container>
    )
}

export default Home;