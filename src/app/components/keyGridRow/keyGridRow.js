import Chunk from "@/app/utilities/arrayUtilities";
import { createRef, useEffect, useRef, useState } from "react";
import { Stack, InputGroup, Form} from 'react-bootstrap'

const KeyGridRow = ({ values, rowIndex, showLabels = false, rowType, itemsPerRow = 10, handleUpdate, handleNavigation, handleFocus}) => {

    const constructRow = () => {
        var valuesRowType = '';
        var labelsRowType = '';

        if (rowType == 0) {
            valuesRowType = 'gridInputTop';
            labelsRowType = 'gridInputMiddle'
        }
        else if (rowType == 1) {
            valuesRowType = 'gridInputMiddle';
            labelsRowType = 'gridInputMiddle';
        }
        else if (rowType == 2) {
            valuesRowType = showLabels ? 'gridInputMiddle' : 'gridInputBottom';
            labelsRowType = 'gridInputBottom';
        }

        var paddingElements = [];
        for (var i = 0; i < itemsPerRow - values.length; i++) paddingElements.push(<Form.Control key={i} size="sm" disabled/>);

        var valueGroup = (
            <InputGroup className={valuesRowType}>
            {values.map((cell, index) => {
                return (<Form.Control key={index} size="sm" className="text-center" type="text" placeholder={cell.value} value=""
                    onChange={(e) => handleUpdate({x: index, y: rowIndex}, e.target.value)} onKeyDown={(e) => handleNavigation(e.key)}
                    onFocus={() => handleFocus({x: index, y: rowIndex})} ref={cell.reference}></Form.Control>)
            })}
            {paddingElements}
            </InputGroup>)

        var labelGroup = (
            <InputGroup className={labelsRowType}>
            {values.map((cell, index) => {
                    return (<Form.Control key={index} size="sm" className="text-center" type="text" value={cell.index} disabled></Form.Control>)
                })}
            {paddingElements}
        </InputGroup>
        )

        if (showLabels) return (<>{valueGroup}{labelGroup}</>)
        else return (<>{valueGroup}</>)
    }

    return (
        <>
            {constructRow()}
        </>
    )
}

export default KeyGridRow;