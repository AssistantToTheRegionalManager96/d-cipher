"use client"
import { useState } from "react";
import CipherMenu from "@/app/components/cipherMenu/cipherMenu";
import CryptographicTextArea from "@/app/components/cryptographicTextArea/cryptographicTextArea";
import { Button, Col, Container, Form, InputGroup, Row, Stack } from "react-bootstrap";
import InputTextArea from "@/app/components/inputTextArea/inputTextArea";
import PaddingMenu from "@/app/components/paddingMenu/paddingMenu";


const Home = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [alphabet, setAlphabet] = useState("abcdefghijklmnopqrstuvwxyz");

    const [plaintext, setPlaintext] = useState("test");
    const [ciphertext, setCiphertext] = useState("");
    const [lastUsedPlaintext, setLastUsedPlaintext] = useState("");
    const [lastUsedCiphertext, setLastUsedCiphertext] = useState("");

    const [paddingType, setPaddingType] = useState(0);
    const [paddingSpecificCharacter, setPaddingSpecificCharacter] = useState("x");

    const [key, setKey] = useState("test");
    const [lastUsedKey, setLastUsedKey] = useState("");

    const [keyValid, setKeyValid] = useState(true);
    const [textValid, setTextValid] = useState(true);
    const [paddingValid, setPaddingValid] = useState(true);


    const encrypt = (input, key) => {
        var encryptedChars = [];
        var alphabetChars = alphabet.split("");

        var k = 0;

        for (var i = 0; i < input.length; i++)
        {
            encryptedChars.push(alphabetChars[(alphabetChars.indexOf(input.charAt(i)) + alphabetChars.indexOf(key.charAt(k))) % alphabetChars.length]);
            k = (k + 1) % key.length;
        }

        return encryptedChars.join("");
    }

    const decrypt = (input, key) => {
        var decryptedChars = [];
        var alphabetChars = alphabet.split("");

        var k = 0;

        for (var i = 0; i < input.length; i++)
        {
            decryptedChars.push(
                alphabetChars[
                    ((alphabetChars.indexOf(input.charAt(i)) - alphabetChars.indexOf(key.charAt(k))) % alphabetChars.length + alphabetChars.length) % alphabetChars.length
                ]);
            k = (k + 1) % key.length;
        }

        return decryptedChars.join("");
    }

    const handleRunButton = () => {
        try {
            if (activeTab == 0) {
                var plaintextCopy = plaintext;

                while (plaintextCopy.length % key.length != 0) {
                    var char = paddingType == 0 ? alphabet.charAt(Math.random() * alphabet.length) : paddingSpecificCharacter;
                    plaintextCopy = plaintextCopy + char;
                }

                var encryptedText = encrypt(plaintextCopy, key);
                setPlaintext(plaintextCopy);
                setLastUsedPlaintext(plaintextCopy);
                setCiphertext(encryptedText);
                setLastUsedCiphertext(encryptedText);
                setLastUsedKey(key);
            }
            else {
                var ciphertextCopy = ciphertext;

                while (ciphertextCopy.length % key.length != 0) {
                    var char = paddingType == 0 ? alphabet.charAt(Math.random() * alphabet.length) : paddingSpecificCharacter;
                    ciphertextCopy = ciphertextCopy + char;
                }

                var decryptedText = decrypt(ciphertextCopy, key);
                setCiphertext(ciphertextCopy);
                setLastUsedCiphertext(ciphertextCopy);
                setPlaintext(decryptedText);
                setLastUsedPlaintext(decryptedText);
                setLastUsedKey(key);
            }
        }
        catch (error) {
            console.log(error);
        }

    }

    return (
        <Container className="mt-5">
            <Row>
                <CipherMenu activeTab={activeTab} setActiveTab={setActiveTab}>Vigenere Cipher</CipherMenu>
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
                                        <Container>
                        <Row className="mb-2 border-bottom pb-2">
                            <Col>
                                <PaddingMenu paddingType={paddingType} handlePaddingTypeChange={(type) => setPaddingType(type)} alphabet={alphabet} 
                                specificCharacter={paddingSpecificCharacter} handleSpecificCharacterChange={(char) => setPaddingSpecificCharacter(char)}
                                isValid={paddingValid} handleIsValidChange={(isValid) => setPaddingValid(isValid)}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <InputTextArea value={key} label="Key" lastUsedValue={lastUsedKey} alphabet={alphabet} rowCount={3}
                                handleChange={(value) => setKey(value)} isValid={keyValid} handleIsValidChange={(value) => setKeyValid(value)}/>
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>

            <Row className="mt-3 mb-3">
                <Col xs={5}></Col>
                <Col className="d-flex justify-content-center align-items-center">
                    <Button variant="primary" size="lg" disabled={!(textValid && keyValid && paddingValid)} 
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