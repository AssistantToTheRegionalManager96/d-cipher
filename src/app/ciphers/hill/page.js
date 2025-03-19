"use client"
import { useState } from "react";
import CipherMenu from "@/app/components/cipherMenu/cipherMenu";
import CryptographicTextArea from "@/app/components/cryptographicTextArea/cryptographicTextArea";
import { Button, Col, Container, Form, InputGroup, Row, Stack } from "react-bootstrap";
import KeyGrid from "@/app/components/keyGrid/keyGrid";
import Chunk from "@/app/utilities/arrayUtilities";
import KeyMatrix from "@/app/components/keyMatrix/keyMatrix";


const Home = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [plaintext, setPlaintext] = useState("");
    const [ciphertext, setCiphertext] = useState("");
    const [lastUsedPlaintext, setLastUsedPlaintext] = useState("");
    const [lastUsedCiphertext, setLastUsedCiphertext] = useState("");
    const [key, setKey] = useState([
        [0, 0],
        [0, 0]
    ]);
    const [keyLength, setKeyLength] = useState(2);

    const encrypt = (plaintext, key) => {
        var encryptedChars = [];

        // for (var i = 0; i < plaintext.length % key.length; i++) plaintext = plaintext + "x"; // Uncomment for padding

        var k = 0;
        var keyLength = Object.entries(key).length;

        for (var i = 0; i < plaintext.length; i++)
        {
            encryptedChars.push(plaintext[parseInt(key[k]) + ((Math.floor(i/keyLength)) * keyLength)]);
            k = (k + 1) % keyLength;
        }

        return encryptedChars.join("");
    }

    const decrypt = (ciphertext, key) => {
        // Invert key
        var keyArray = Object.entries(key);
        var keyInv = new Array(keyArray.length);

        for (var i = 0; i < keyArray.length; i++) {
            keyInv[keyArray[i][1]] = keyArray[i][0]
        }

        // Encrypt using inverted key
        return encrypt(ciphertext, keyInv.join(""));
    }

    const handleKeyLengthChange = (value) => {
        var length = parseInt(value);

        if (isNaN(length) || length > 100 || length < 2 || length == keyLength) return;

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
                    <Form.Group>
                        <Form.Label>
                            Key
                        </Form.Label>
                        <InputGroup className="mb-1">
                            <InputGroup.Text>Size n x n (2 - 10)</InputGroup.Text>
                            <Form.Control type="number" value={keyLength} onChange={(e) => handleKeyLengthChange(e.target.value)}></Form.Control>
                        </InputGroup>
                        <KeyMatrix keyValue={key} showLabels={false} handleKeyUpdate={(keyValue) => setKey(keyValue)} allowDuplicates={true}  itemsPerRow={keyLength} />
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