"use client"
import { useState } from "react";
import CipherMenu from "@/app/components/cipherMenu/cipherMenu";
import CryptographicTextArea from "@/app/components/cryptographicTextArea/cryptographicTextArea";
import { Button, Col, Container, Form, InputGroup, Row, Stack } from "react-bootstrap";


const Home = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [plaintext, setPlaintext] = useState("");
    const [ciphertext, setCiphertext] = useState("");
    const [lastUsedPlaintext, setLastUsedPlaintext] = useState("");
    const [lastUsedCiphertext, setLastUsedCiphertext] = useState("");
    const [key, setKey] = useState("");
    const [lastUsedKey, setLastUsedKey] = useState("");

    const encrypt = (plaintext, key) => {
        var encryptedChars = [];
        var asciiIndexInput = 'a'.charCodeAt(0);
        var asciiIndexOutput = 'A'.charCodeAt(0);

        // for (var i = 0; i < plaintext.length % key.length; i++) plaintext = plaintext + "x"; // Uncomment for padding

        var k = 0;
        var keyLength = Object.entries(key).length;

        for (var i = 0; i < plaintext.length; i++)
        {
            encryptedChars.push(String.fromCharCode(((plaintext.charCodeAt(i) - asciiIndexInput) + (key.charCodeAt(k) - asciiIndexInput + 1)) % 26 + asciiIndexOutput));
            k = (k + 1) % keyLength;
        }

        return encryptedChars.join("");
    }

    const decrypt = (ciphertext, key) => {
        var decryptedChars = [];

        var asciiIndexInput = 'A'.charCodeAt(0);
        var asciiIndexOutput = 'a'.charCodeAt(0);

        var k = 0;
        var keyLength = Object.entries(key).length;

        for (var i = 0; i < ciphertext.length; i++)
        {
            decryptedChars.push(String.fromCharCode((((ciphertext.charCodeAt(i) - asciiIndexInput) - (key.charCodeAt(k) - asciiIndexOutput + 1)) % 26 + 26) % 26 + asciiIndexOutput));
            k = (k + 1) % keyLength;
        }

        return decryptedChars.join("");
    }

    const handleRunButton = () => {
        if (activeTab == 0) {
            var encryptedText = encrypt(plaintext, key);

            setLastUsedCiphertext(encryptedText);
            setLastUsedKey(key);
            setCiphertext(encryptedText);
            setLastUsedPlaintext(plaintext);
        }
        else {
            var decryptedText = decrypt(ciphertext, key);

            setLastUsedPlaintext(decryptedText);
            setLastUsedKey(key);
            setPlaintext(decryptedText);
            setLastUsedCiphertext(ciphertext);
        }
    }

    return (
        <Container className="mt-5">
            <Row>
                <CipherMenu activeTab={activeTab} setActiveTab={setActiveTab}>Vigenere Cipher</CipherMenu>
            </Row>

            <Row className="mt-5 border rounded p-2">
                <Col xs={12} sm={12} md={12} lg={6} xl={6}  xxl={6} className="d-flex align-items-start">
                    {activeTab == 0 ? 
                    <CryptographicTextArea mode="plaintext" value={plaintext} lastUsedValue={lastUsedPlaintext} handleChange={(newValue) => setPlaintext(newValue)}/> 
                    : <CryptographicTextArea mode="ciphertext" value={ciphertext} lastUsedValue={lastUsedCiphertext} handleChange={(newValue) => setCiphertext(newValue)}/> }
                </Col>
                <Col xs={12} sm={12} md={12} lg={6} xl={6}  xxl={6} 
                className="d-flex align-items-start justify-content-xs-center justify-content-sm-center justify-content-md-center justify-content-lg-end justify-content-xl-end justify-conten-xxl-end">
                    <CryptographicTextArea mode="key" value={key} lastUsedValue={lastUsedKey} handleChange={(newValue) => setKey(newValue)}/>
                </Col>
            </Row>

            <Row className="mt-3 mb-3">
                <Col xs={5}>
                </Col>
                <Col className="d-flex justify-content-center align-items-center">
                    <Button variant="primary" size="lg" disabled={(activeTab == 0 && plaintext == "") || (activeTab == 1 && ciphertext == "")} 
                        onClick={handleRunButton}>{activeTab == 0 ? "Encrypt" : "Decrypt"}</Button>
                </Col>
                <Col xs={5}>
                </Col>
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