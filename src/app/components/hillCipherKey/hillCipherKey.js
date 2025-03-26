import { Form, InputGroup } from "react-bootstrap";
import KeyMatrix from "@/app/components/keyMatrix/keyMatrix";

const HillCipherKey = ({value, length, minLength, maxLength, handleChange}) => {
    const handleLengthChange = () => {

    }

    const handleKeyChange = () => {

    }

    return (
    <Form.Group>
        <Form.Label>
            Key
        </Form.Label>

        <InputGroup className="mb-1" hasValidation>
            <InputGroup.Text>Size (2 - 10)</InputGroup.Text>
            <Form.Control type="number" placeholder={keyLength} value={keyLengthDisplay} onChange={(e) => handleLengthChange(e.target)}></Form.Control>
            <Form.Control.Feedback type="invalid">Provide input in range ({keyMinLength}-{keyMaxLength})</Form.Control.Feedback>
        </InputGroup>
        <InputGroup hasValidation>
            <KeyMatrix keyValue={key} isValid={keyValid} showLabels={false} handleKeyUpdate={(keyValue) => setKey(keyValue)} onBlur={(e) => handleKeyLoseFocus(e)} allowDuplicates={true}  itemsPerRow={keyLength} />
            <Form.Control.Feedback type="invalid">Matrix must be invertible</Form.Control.Feedback>
        </InputGroup>
    </Form.Group>
    )
}