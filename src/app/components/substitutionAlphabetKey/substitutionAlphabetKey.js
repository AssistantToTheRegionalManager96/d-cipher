import { createRef, useEffect, useRef, useState } from "react";

const { Stack, InputGroup, Form } = require("react-bootstrap")

const SubstitutionAlphabetKey = ({ substitutionKey, setSubsitutionKey }) => {

    const grid = Object.keys(substitutionKey).reduce((arr, val) => ({...arr, [val]: createRef()}), {})
    const container = useRef();
    const [currentIndex, setCurrentIndex] = useState("");

    var firstRowChars = Object.keys(substitutionKey).slice(0, 13);
    var secondRowChars = Object.keys(substitutionKey).slice(13, 26);

    const handleGridUpdate = (index, value) => {
        var oldValue = substitutionKey[index];
        var newValue = value.replace(/[^a-z]/gi, '').toUpperCase();

        var oldIndexOfNewValue = Object.entries(substitutionKey).filter(x => x[1] == newValue.toUpperCase())[0][0];
        setSubsitutionKey({...substitutionKey, [index]: newValue.toUpperCase(), [oldIndexOfNewValue]: oldValue});
    }

    const handleIndexNavigation = (keydown) => {
        switch (keydown) {
            default: break;
            case "ArrowRight":
                var indexToTheRight = (Object.keys(substitutionKey).indexOf(currentIndex) + 1) % 26;
                setCurrentIndex(Object.keys(substitutionKey)[indexToTheRight])
                break;
            case "ArrowLeft":
                var indexToTheLeft = ((Object.keys(substitutionKey).indexOf(currentIndex) - 1) % 26 + 26) % 26;
                setCurrentIndex(Object.keys(substitutionKey)[indexToTheLeft])
                break;
            case "ArrowDown":
                var indexToTheBottom = (Object.keys(substitutionKey).indexOf(currentIndex) + 13) % 26;
                setCurrentIndex(Object.keys(substitutionKey)[indexToTheBottom])
                break;
            case "ArrowUp":
                var indexToTheTop = ((Object.keys(substitutionKey).indexOf(currentIndex) - 13) % 26 + 26) % 26;
                setCurrentIndex(Object.keys(substitutionKey)[indexToTheTop])
                break;
        }
    }

    useEffect(() => {
        if (currentIndex != "" && container.current.contains(document.activeElement)) grid[currentIndex].current.focus();
    })

    return(
    <Stack gap={0} ref={container}>
        <InputGroup className="gridInputTop">
            {firstRowChars.map((character) => {
                    return (<Form.Control key={character} size="sm" className="text-center" type="text" value={character} disabled></Form.Control>)
                })}
        </InputGroup>
        <InputGroup className="gridInputMiddle">
            {firstRowChars.map((character) => {
                return (<Form.Control key={character} size="sm" className="text-center" type="text" placeholder={substitutionKey[character]} value="" 
                    onChange={(e) => handleGridUpdate(character, e.target.value)} onKeyDown={(e) => handleIndexNavigation(e.key)} 
                    onFocus={() => setCurrentIndex(character)} ref={grid[character]}></Form.Control>)
            })}
        </InputGroup>
        <InputGroup className="gridInputMiddle">
            {secondRowChars.map((character) => {
                return (<Form.Control key={character} size="sm" className="text-center" type="text" placeholder={substitutionKey[character]} value="" 
                    onChange={(e) => handleGridUpdate(character, e.target.value)} onKeyDown={(e) => handleIndexNavigation(e.key)} 
                    onFocus={() => setCurrentIndex(character)} ref={grid[character]}></Form.Control>)
            })}
        </InputGroup>
        <InputGroup className="gridInputBottom">
            {secondRowChars.map((character) => {
                    return (<Form.Control key={character} size="sm" className="text-center" type="text" value={character} disabled></Form.Control>)
                })}
        </InputGroup>
    </Stack>
    )
}

export default SubstitutionAlphabetKey;