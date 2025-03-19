import Chunk from "@/app/utilities/arrayUtilities";
import { createRef } from "react";
import Grid from "../grid/grid";

const KeyGrid = ({ keyValue, handleKeyUpdate, showLabels = false, itemsPerRow = 10 }) => {

    var gridArray = Chunk(Object.entries(keyValue).map(entry => ({label: entry[0], placeholder: entry[1], value:"", reference: createRef()})), itemsPerRow);
    while (gridArray[gridArray.length - 1].length < itemsPerRow) {
        gridArray[gridArray.length - 1].push({label: "", placeholder: "", value: "", reference: createRef(), isPadding: true});
    }

    const handleGridUpdate = (position, value) => {
        var currentValue = gridArray[position.row][position.col].placeholder;
        var currentIndex = gridArray[position.row][position.col].label;

        var keyArray = Object.entries(keyValue);
        var newValue;

        if (keyArray.filter(x => x[1] == currentValue + value.toUpperCase()).length != 0) newValue = currentValue + value.toUpperCase();
        else if (keyArray.filter(x => x[1] == currentValue + value.toLowerCase()).length != 0) newValue = currentValue + value.toLowerCase();
        else if (keyArray.filter(x => x[1] == value).length != 0) newValue = value;
        else if (keyArray.filter(x => x[1] == value.toUpperCase()).length != 0) newValue = value.toUpperCase();
        else if (keyArray.filter(x => x[1] == value.toLowerCase()).length != 0) newValue = value.toLowerCase();
        else return;

        var previousIndexOfNewValue = keyArray.filter(x => x[1] == newValue)[0][0];
        handleKeyUpdate({...keyValue, [currentIndex]: newValue, [previousIndexOfNewValue]: currentValue});
    }

    return(
        <Grid gridArray={gridArray} handleGridArrayUpdate={handleGridUpdate} showLabels={showLabels} itemsPerRow={itemsPerRow} />
    )
}

export default KeyGrid;