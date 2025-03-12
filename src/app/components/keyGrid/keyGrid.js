import Chunk from "@/app/utilities/arrayUtilities";
import { createRef, useEffect, useRef, useState } from "react";
import { Stack, InputGroup, Form} from 'react-bootstrap'
import KeyGridRow from "../keyGridRow/keyGridRow";

const KeyGrid = ({ value, handleUpdate, showLabels = false, itemsPerRow = 10 }) => {

    // const grid = Object.entries(value).reduce((arr, val) => ({...arr, [val[0]]: ({value: val[1], reference: createRef()})}), {});
    var grid = Chunk(Object.entries(value).map(entry => ({index: entry[0], value: entry[1], reference: createRef()})), itemsPerRow);

    const container = useRef();
    const [currentIndex, setCurrentIndex] = useState({x: "", y: ""});

    // const handleGridUpdate = (index, value) => {
    //     var oldValue = substitutionKey[index];
    //     var newValue = value.replace(/[^a-z]/gi, '').toUpperCase();
    //     if (newValue == "") return;

    //     var oldIndexOfNewValue = Object.entries(substitutionKey).filter(x => x[1] == newValue.toUpperCase())[0][0];
    //     setSubsitutionKey({...substitutionKey, [index]: newValue.toUpperCase(), [oldIndexOfNewValue]: oldValue});
    // }

    const handleIndexNavigation = (keydown) => {
        console.log(keydown);
        console.log(currentIndex);

        switch (keydown) {
            default: break;
            case "ArrowRight":
                setCurrentIndex({...currentIndex, x: (currentIndex.x + 1) % itemsPerRow})
                break;
            case "ArrowLeft":
                setCurrentIndex({...currentIndex, x: ((currentIndex.x - 1) % itemsPerRow + itemsPerRow) % itemsPerRow})
                break;
            case "ArrowDown":
                var indexToTheBottom = (grid.indexOf(currentIndex) + 13) % 26;
                setCurrentIndex({...currentIndex, y: (currentIndex.y + 1) % grid.length})
                break;
            case "ArrowUp":
                var indexToTheTop = ((grid.indexOf(currentIndex) - 13) % 26 + 26) % 26;
                setCurrentIndex(grid[indexToTheTop])
                break;
        }
    }

    useEffect(() => {
        if (currentIndex != "" && container.current.contains(document.activeElement)) grid[currentIndex.y][currentIndex.x].reference.current.focus();
    })

    return(
    <Stack gap={0} ref={container}>
        {grid.map((row, index) => {
            var rowType;
            if (index == 0) rowType = 0;
            else if (index < row.length - 1) rowType = 1;
            else rowType = 2;

            return (<KeyGridRow key={index} values={row} rowIndex={index} showLabels={false} rowType={rowType} itemsPerRow={itemsPerRow} 
                    handleUpdate={(index, value) => handleGridUpdate(index, value)} handleNavigation={(navigationKey) => handleIndexNavigation(navigationKey)} 
                    handleFocus={(index) => setCurrentIndex(index)}/>)

            // if (customKeyLabels == "") {
            //     row = <InputGroup key={x.reduce((prev, curr) => prev + curr.key, '')} className={rowType}>
            //     {x.map(y => {
            //         return (<Form.Control key={y.key} size="sm" className="text-center" type="text" placeholder={substitutionKey[y.key]} value=""
            //             onChange={(e) => handleGridUpdate(y.key, e.target.value)} onKeyDown={(e) => handleIndexNavigation(e.key)}
            //             onFocus={() => setCurrentIndex(y.key)} ref={y.value}></Form.Control>)
            //     })}
            //     {paddingElements}
            //     </InputGroup>
            // }
            // else {

            // }

        
            // return (<InputGroup key={x.reduce((prev, curr) => prev + curr.key, '')} className={rowType}>
            //     {x.map(y => {
            //         return (<Form.Control key={y.key} size="sm" className="text-center" type="text" placeholder={substitutionKey[y.key]} value=""
            //             onChange={(e) => handleGridUpdate(y.key, e.target.value)} onKeyDown={(e) => handleIndexNavigation(e.key)}
            //             onFocus={() => setCurrentIndex(y.key)} ref={y.value}></Form.Control>)
            //     })}
            //     {paddingElements}
            // </InputGroup>)
        })}



        {/* <InputGroup className="gridInputTop">
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
        </InputGroup> */}
    </Stack>)
}

export default KeyGrid;