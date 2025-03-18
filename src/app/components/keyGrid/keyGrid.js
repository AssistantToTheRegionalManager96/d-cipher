import Chunk from "@/app/utilities/arrayUtilities";
import { createRef, useEffect, useRef, useState } from "react";
import { Stack, InputGroup, Form} from 'react-bootstrap'
import KeyGridRow from "../keyGridRow/keyGridRow";

const KeyGrid = ({ keyValue, handleKeyUpdate, allowDuplicates = false, permittedValuesRegex = /\D/g, showLabels = false, itemsPerRow = 10 }) => {

    var grid = Chunk(Object.entries(keyValue).map(entry => ({index: entry[0], value: entry[1], reference: createRef()})), itemsPerRow);
    const container = useRef();
    const [currentIndex, setCurrentIndex] = useState({x: "", y: ""});

    const handleGridUpdate = (index, value) => {
        var currentValue = grid[index.y][index.x].value;
        var currentIndex = grid[index.y][index.x].index;

        var keyArray = Object.entries(keyValue);
        var newValue;

        if (!allowDuplicates) {
            if (keyArray.filter(x => x[1] == currentValue + value.toUpperCase()).length != 0) newValue = currentValue + value.toUpperCase();
            else if (keyArray.filter(x => x[1] == currentValue + value.toLowerCase()).length != 0) newValue = currentValue + value.toLowerCase();
            else if (keyArray.filter(x => x[1] == value).length != 0) newValue = value;
            else if (keyArray.filter(x => x[1] == value.toUpperCase()).length != 0) newValue = value.toUpperCase();
            else if (keyArray.filter(x => x[1] == value.toLowerCase()).length != 0) newValue = value.toLowerCase();
            else return;
    
            var previousIndexOfNewValue = keyArray.filter(x => x[1] == newValue)[0][0];
            handleKeyUpdate({...keyValue, [currentIndex]: newValue, [previousIndexOfNewValue]: currentValue});
        }
        else {
            newValue = value.replace(permittedValuesRegex, '');
            if (newValue == "") return;
            handleKeyUpdate({...keyValue, [currentIndex]: newValue});
        }
    }

    const handleIndexNavigation = (keydown) => {

        switch (keydown) {
            default: break;
            case "ArrowRight":
                setCurrentIndex({...currentIndex, x: ((currentIndex.x + 1) % grid[currentIndex.y].length)})
                break;
            case "ArrowLeft":
                setCurrentIndex({...currentIndex, x: ((currentIndex.x - 1) % grid[currentIndex.y].length + grid[currentIndex.y].length) % grid[currentIndex.y].length})
                break;
            case "ArrowDown":
                var ynew = (currentIndex.y + 1) % grid.length;
                if (currentIndex.x > grid[ynew].length - 1) ynew = 0;
                setCurrentIndex({...currentIndex, y: ynew})
                break;
            case "ArrowUp":
                var ynew = ((currentIndex.y - 1) % grid.length + grid.length) % grid.length;
                if (currentIndex.x > grid[ynew].length - 1) ynew = ((ynew - 1) % grid.length + grid.length) % grid.length;
                setCurrentIndex({...currentIndex, y: ynew})
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

            if (grid.length == 1) rowType = 0;
            else if (index == 0) rowType = 1
            else if (index < grid.length - 1) rowType = 2;
            else rowType = 3;

            return (<KeyGridRow key={index} values={row} rowIndex={index} showLabels={showLabels} rowType={rowType} itemsPerRow={itemsPerRow} 
                    handleUpdate={(index, value) => handleGridUpdate(index, value)} handleNavigation={(navigationKey) => handleIndexNavigation(navigationKey)} 
                    handleFocus={(index) => setCurrentIndex(index)}/>)
        })}
    </Stack>)
}

export default KeyGrid;