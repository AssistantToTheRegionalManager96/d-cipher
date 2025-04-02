"use client"
import { useState } from "react";
import CipherMenu from "@/app/components/cipherMenu/cipherMenu";
import CryptographicTextArea from "@/app/components/cryptographicTextArea/cryptographicTextArea";
import { Button, Col, Container, Form, InputGroup, Row, Stack } from "react-bootstrap";
import KeyGrid from "@/app/components/grids/keyGrid/keyGrid";
import InputTextArea from "@/app/components/inputTextArea/inputTextArea";

const Home = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [alphabet, setAlphabet] = useState("abcdefghijklmnopqrstuvwxyz");

    const [plaintext, setPlaintext] = useState("test");
    const [ciphertext, setCiphertext] = useState("");
    const [lastUsedPlaintext, setLastUsedPlaintext] = useState("");
    const [lastUsedCiphertext, setLastUsedCiphertext] = useState("");
    
    const [key, setKey] = useState({
        a: 'a',
        b: 'b',
        c: 'c',
        d: 'd',
        e: 'e',
        f: 'f',
        g: 'g',
        h: 'h',
        i: 'i',
        j: 'j',
        k: 'k',
        l: 'l',
        m: 'm',
        n: 'n',
        o: 'o',
        p: 'p',
        q: 'q',
        r: 'r',
        s: 's',
        t: 't',
        u: 'u',
        v: 'v',
        w: 'w',
        x: 'x',
        y: 'y',
        z: 'z',
    });

    const [textValid, setTextValid] = useState(true);
    const [paddingValid, setPaddingValid] = useState(true);


    const encrypt = (plaintext, key) => {
        var encryptedChars = [];

        plaintext.split("").forEach((character) => {
            encryptedChars.push(key[character]);
        })

        return encryptedChars.join("");
    }

    const decrypt = (ciphertext, key) => {
        var decryptedChars = [];

        ciphertext.split("").forEach((character) => {
            decryptedChars.push(Object.entries(key).filter(entry => entry[1] == character)[0][0]); // FINISH THIS ONE OFF
        })

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
                <CipherMenu activeTab={activeTab} setActiveTab={setActiveTab}>Substitution Cipher</CipherMenu>
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
                    <Form.Group className="ps-0 pe-0">
                        <Form.Label>
                            Key
                        </Form.Label>
                        <KeyGrid keyValue={key} showLabels={true} handleKeyUpdate={(keyValue) => setKey(keyValue)}  itemsPerRow={13} />
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