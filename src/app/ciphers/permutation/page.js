"use client"
import { useState } from "react";
import CipherMenu from "@/app/components/cipherMenu/cipherMenu";
import CryptographicTextArea from "@/app/components/cryptographicTextArea/cryptographicTextArea";
import { Button, Col, Container, Form, InputGroup, Row, Stack } from "react-bootstrap";
import GuidelineArrow from "@/app/components/guidelineArrow/guidelineArrow";
import KeyGrid from "@/app/components/keyGrid/keyGrid";


const Home = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [plaintext, setPlaintext] = useState("");
    const [ciphertext, setCiphertext] = useState("");
    const [lastUsedPlaintext, setLastUsedPlaintext] = useState("");
    const [lastUsedCiphertext, setLastUsedCiphertext] = useState("");
    const [key, setKey] = useState({
        0: '0',
        1: '1',
        2: '2',
        3: '3',
        4: '4'
    });
    const [keyLength, setKeyLength] = useState(5);

    const encrypt = (plaintext, key) => {
        var encryptedChars = [];

        for (var i = 0; i < plaintext.length % key.length; i++) plaintext = plaintext + "x";

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

        if (isNaN(length) || length > 100 || length < 2) return;

        var keyArray = Object.entries(key);

        if (length == keyArray.length) return;
        else if (length < keyArray.length) {
            while(length < keyArray.length) {
                var last = keyArray.pop();

                var idx = keyArray.findIndex((element) => element[1] == last[0]);
                ~idx && (keyArray[idx][1] = last[1]);
            }
        }
        else {
            for (var i = keyArray.length; i < length; i++) {
                keyArray.push([i.toString(), i.toString()])
            }
        }

        setKey(Object.fromEntries(keyArray));
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
                <CipherMenu activeTab={activeTab} setActiveTab={setActiveTab}>Permutation Cipher</CipherMenu>
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
                        <InputGroup className="mb-1">
                            <InputGroup.Text>Length</InputGroup.Text>
                            <Form.Control type="number" value={keyLength} onChange={(e) => handleKeyLengthChange(e.target.value)}></Form.Control>
                        </InputGroup>
                        <div className="d-flex flex-xl-column flex-xxl-column gap-1">
                            <KeyGrid keyValue={key} showLabels={true} handleKeyUpdate={(keyValue) => setKey(keyValue)}  itemsPerRow={5} />
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