import { Container, Row, Nav } from "react-bootstrap";

const CipherMenu = ({activeTab, setActiveTab, children}) => {
    return (
        <Container>
            <Row className="align-items-center justify-content-center">
                <h2 className="d-flex align-items-center justify-content-center">
                    {children}
                </h2>
            </Row>
            <Row className="align-items-center justify-content-center mt-2">
                <Nav variant="pills" className="justify-content-center align-items-center">
                    <Nav.Item className="me-2">
                        <Nav.Link className={activeTab == 0 ? "active" : ""} onClick={() => setActiveTab(0)}>Encrypt</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="me-2">
                        <Nav.Link className={activeTab == 1 ? "active" : ""} onClick={() => setActiveTab(1)}>Decrypt</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="me-2">
                        <Nav.Link className={activeTab == 2 ? "active" : ""} onClick={() => setActiveTab(2)} disabled>Cryptanalyse</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link className={activeTab == 3 ? "active" : ""} onClick={() => setActiveTab(3)} disabled>Explain</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Row>
        </Container>
    )
}

export default CipherMenu;