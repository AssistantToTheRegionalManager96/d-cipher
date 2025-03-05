const { Stack, InputGroup, Form } = require("react-bootstrap")

const SubstitutionAlphabetKey = ({ substitutionKey, setSubsitutionKey }) => {

    var firstRowChars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm'];
    var secondRowChars = ['n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    
    const handleGridUpdate = (index, value) => {
        console.log(value);
        console.log(substitutionKey);
        var newValue = value.replace(/[^a-z]/gi, '').toLowerCase();

        // setSubsitutionKey({...substitutionKey, [index]: newValue.toUpperCase(), [newValue]: index.toUpperCase()}); NEED TO WORK ON THIS

    }

    return(
    <Stack gap={0}>
        <InputGroup className="gridInputTop">
            {firstRowChars.map((character) => {
                return (<Form.Control key={character} size="sm" className="text-center" type="text" placeholder={substitutionKey[character]} value="" onChange={(e) => handleGridUpdate(character, e.target.value)}></Form.Control>)
            })}
        </InputGroup>
        <InputGroup className="gridInputMiddle">
            {firstRowChars.map((character) => {
                    return (<Form.Control key={character} size="sm" className="text-center" type="text" value={character} disabled></Form.Control>)
                })}
        </InputGroup>
    </Stack>
    )
}

export default SubstitutionAlphabetKey;