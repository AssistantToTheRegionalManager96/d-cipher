"use client"
import { useState } from "react";
import CipherMenu from "@/app/components/cipherMenu/cipherMenu";
import { Container, Row } from "react-bootstrap";


const Home = () => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <Container className="mt-5">
            <Row>
                <CipherMenu activeTab={activeTab} setActiveTab={setActiveTab}>Substitution Cipher</CipherMenu>
            </Row>
        </Container>
    )
}

export default Home;