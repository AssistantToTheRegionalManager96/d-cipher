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
            valuesRowType = showLabels ? 'gridInputBottom' : 'gridInputMiddle';
            labelsRowType = 'gridInputBottom';
        }

        var paddingElements = [];
        for (var i = 0; i < itemsPerRow - values.length; i++) paddingElements.push(<Form.Control key={`${i}${values.toString()}`} size="sm" disabled/>);

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



            // return (
            //     <>
            //     {
            //         <div></div>
            //     }

            //     </>

            // )

            
            // var rowType = '';
            // if (index == 0) rowType = 'gridInputTop';
            // else if (index < x.length - 1) rowType = 'gridInputMiddle';
            // else rowType = 'gridInputBottom';

            // var row;

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
}

export default KeyGridRow;