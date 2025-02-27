import Link from "next/link";
import styles from "./banner.module.css"
import { Container, DropdownItem, Stack } from "react-bootstrap";
import NavDropdown from 'react-bootstrap/NavDropdown';

const Banner = () => {
    return (
        <div className={styles.banner}>
            <Container className="pb-2 pt-2">
                <Stack direction="horizontal" gap={5}>
                    <Link href="/" className="d-inline-flex align-items-center justify-content-start text-decoration-none">
                        <img src="../logo.png" alt="logo" width="50" className={styles.logo}/>
                        <h1 className="ms-4 mb-0">d-cipher</h1>
                    </Link>
                    <NavDropdown title="Ciphers">
                        <DropdownItem href="/ciphers/caesar">Caesar</DropdownItem>
                        <DropdownItem href="/ciphers/affine">Affine</DropdownItem>
                        <DropdownItem href="/ciphers/hill">Hill</DropdownItem>
                        <DropdownItem href="/ciphers/substitution">Substitution</DropdownItem>
                        <DropdownItem href="/ciphers/permutation">Permutation</DropdownItem>
                        <DropdownItem href="/ciphers/vigenere">Vigenere</DropdownItem>
                    </NavDropdown>
                </Stack>
            </Container>
        </div>
    )
}

export default Banner;