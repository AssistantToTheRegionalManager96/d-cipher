import Chunk from "@/app/utilities/arrayUtilities";
import { createRef } from "react";
import Grid from "../grid/grid";

const KeyMatrix = ({ keyValue, handleKeyUpdate, showLabels = false, itemsPerRow = 10 }) => {
    var gridArray = keyValue.map(row => row.map(col => ({label: "", placeholder: 0, value:col.toString(), reference: createRef()})));

    const handleGridUpdate = (position, value) => {
        var keyCopy = JSON.parse(JSON.stringify(keyValue));

        var newValue = parseInt(value.replace(/\D/g,''));
        if (isNaN(newValue)) newValue = 0;

        keyCopy[position.row][position.col] = newValue;
        handleKeyUpdate(keyCopy);
    }

    return(
        <Grid gridArray={gridArray} handleGridArrayUpdate={handleGridUpdate} showLabels={showLabels} itemsPerRow={itemsPerRow} />
    )
}

export default KeyMatrix;