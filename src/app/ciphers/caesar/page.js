"use client"
import { useState } from "react";
import CipherMenu from "@/app/components/cipherMenu/cipherMenu";
import CryptographicTextArea from "@/app/components/cryptographicTextArea/cryptographicTextArea";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";


const Home = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [plaintext, setPlaintext] = useState("");
    const [ciphertext, setCiphertext] = useState("");
    const [lastUsedPlaintext, setLastUsedPlaintext] = useState("");
    const [lastUsedCiphertext, setLastUsedCiphertext] = useState("");
    const [key, setKey] = useState(0);

    const handleRunButton = () => {
        setLastUsedPlaintext(plaintext);
    }

    return (
        <Container className="mt-5">
            <Row>
                <CipherMenu activeTab={activeTab} setActiveTab={setActiveTab}>Caesar Cipher</CipherMenu>
            </Row>

            <Form as={Row} className="mt-5">
                <Col xs={12} sm={12} md={12} lg={12} xl={4}  xxl={4} className="mb-1">
                    {activeTab == 0 ? 
                    <CryptographicTextArea mode={0} value={plaintext} lastUsedValue={lastUsedPlaintext} handleChange={(newValue) => setPlaintext(newValue)}/> 
                    : <CryptographicTextArea mode={1} value={ciphertext} lastUsedValue={lastUsedCiphertext} handleChange={(newValue) => setCiphertext(newValue)}/> }
                </Col>

                <Col xs={12} sm={12} md={12} lg={12} xl={4}  xxl={4} className="mb-1">
                    <Form.Group as={Container} className="ps-0 pe-0">
                        <Form.Label>
                            Key
                        </Form.Label>
                        <Row>
                            <Col xs={6} sm={6} md={6} lg={6} xl={12}  xxl={12} className="pe-0 ps-0">
                                <InputGroup>
                                    <Form.Control type="number"></Form.Control>
                                    <InputGroup.Text>mod 26</InputGroup.Text>
                                </InputGroup>
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={6} xl={12}  xxl={12} className="d-flex justify-content-center">
                                <Button variant="primary" onClick={handleRunButton}>Encrypt/Decrypt</Button>
                            </Col>
                        </Row>
                    </Form.Group>
                </Col>

                <Col xs={12} sm={12} md={12} lg={12} xl={4}  xxl={4} className="mb-1">
                {activeTab == 0 ? 
                    <CryptographicTextArea active={false} mode={1} value={ciphertext} lastUsedValue={lastUsedCiphertext} handleChange={(newValue) => setCiphertext(newValue)}/>
                    : <CryptographicTextArea active={false} mode={0} value={plaintext} lastUsedValue={lastUsedPlaintext} handleChange={(newValue) => setPlaintext(newValue)}/>}
                </Col>
            </Form>
        </Container>
    )
}

export default Home;