const { Container, Row, Col, Form, InputGroup, Stack } = require("react-bootstrap")


const PaddingMenu = ({paddingType, handlePaddingTypeChange, specificCharacter = ""}) => {
    


    return (
        <Form.Group>
            <Form.Label>
                Padding
            </Form.Label>
            <Form.Check type="radio" label="Random characters" name="paddingType" checked={paddingType == 0} onChange={() => handlePaddingTypeChange(0)}/>
            <Stack direction="horizontal" gap={5}>
                <Form.Check className="flex-shrink-0" type="radio" label="Specific Character:" name="paddingType" checked={paddingType == 1} onChange={() => handlePaddingTypeChange(1)}/>
                <Form.Control type="text" maxLength={1} disabled={paddingType == 0}/>
            </Stack>

        </Form.Group>
    )
}

export default PaddingMenu;