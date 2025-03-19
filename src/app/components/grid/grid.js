import { createRef, useEffect, useRef, useState } from "react";
import { Stack } from 'react-bootstrap'
import GridRow from "../gridRow/gridRow";

const Grid = ({ gridArray, handleGridArrayUpdate, showLabels = false}) => {
    var gridRefs = gridArray.map(row => row.map(col => ({...col, reference: createRef()})));
    const container = useRef();
    const [currentIndex, setCurrentIndex] = useState({row: "", col: ""});
    const handleIndexNavigation = (keydown) => {
        var rowCount = gridRefs.length;
        var colCount = gridRefs[0].length;
        var row = currentIndex.row;
        var col = currentIndex.col;

        switch (keydown) {
            default: break;
            case "ArrowRight":
                var colNew = (col + 1) % colCount;
                while (gridRefs[row][colNew].isPadding) colNew = (colNew + 1) % colCount;
                setCurrentIndex({row: row, col: colNew});
                break;
            case "ArrowLeft":
                var colNew = ((col - 1) % colCount + colCount) % colCount;
                while (gridRefs[row][colNew].isPadding) colNew = ((colNew - 1) % colCount + colCount) % colCount;
                setCurrentIndex({row: row, col: colNew});
                break;
            case "ArrowDown":
                var rowNew = (row + 1) % rowCount;
                while (gridRefs[rowNew][col].isPadding) rowNew = (rowNew + 1) % rowCount;
                setCurrentIndex({row: rowNew, col: col});
                break;
            case "ArrowUp":
                var rowNew = ((row - 1) % rowCount + rowCount) % rowCount;
                while (gridRefs[rowNew][col].isPadding) rowNew = ((rowNew - 1) % rowCount + rowCount) % rowCount;
                setCurrentIndex({row: rowNew, col: col});
                break;
        }
    }

    useEffect(() => {
        if (currentIndex != "" && container.current.contains(document.activeElement)) gridRefs[currentIndex.row][currentIndex.col].reference.current.focus();
    })

    return(
    <Stack gap={0} ref={container}>
        {gridRefs.map((row, rowIndex) => {
            var rowType;

            if (gridRefs.length == 1) rowType = 0;
            else if (rowIndex == 0) rowType = 1
            else if (rowIndex < gridRefs.length - 1) rowType = 2;
            else rowType = 3;

            return (<GridRow key={rowIndex} cells={row} rowType={rowType} showLabels={showLabels} 
                    handleUpdate={(cellIndex, value) => handleGridArrayUpdate({row: rowIndex, col: cellIndex}, value)} 
                    handleNavigation={(navigationKey) => handleIndexNavigation(navigationKey)} 
                    handleFocus={(cellIndex) => setCurrentIndex({row: rowIndex, col: cellIndex})}/>)
        })}
    </Stack>)
}

export default Grid;