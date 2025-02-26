"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { Col, Container, Row, Stack } from "react-bootstrap";

export default function Home() {
  return (
    <Container>
      <Stack gap={5} className="justify-content-center align-items-center mt-5">
        <h1>Welcome to d-cipher</h1>
        <div>This website can help you encrypt, decrypt, and cryptanalyse a number of common ciphers. Select the cipher below or use the menu at the top to get started!</div>
      </Stack>
    </Container>
  );
}
