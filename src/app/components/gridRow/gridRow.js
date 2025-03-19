import { InputGroup, Form} from 'react-bootstrap'

const GridRow = ({ cells, rowType, showLabels = false, handleUpdate, handleNavigation, handleFocus}) => {
    const constructRow = () => {
        var valuesRowType = '';
        var labelsRowType = '';

        if (rowType == 0) {
            labelsRowType = 'gridInputTop';
            valuesRowType = showLabels ? 'gridInputBottom' : ''
        }
        else if (rowType == 1) {
            labelsRowType = 'gridInputTop';
            valuesRowType = showLabels ? 'gridInputMiddle' : 'gridInputTop';
        }
        else if (rowType == 2) {
            labelsRowType = 'gridInputMiddle';
            valuesRowType = 'gridInputMiddle';
        }
        else if (rowType == 3) {
            labelsRowType = 'gridInputMiddle';
            valuesRowType = 'gridInputBottom';
        }

        var valueGroup = (
            <InputGroup className={valuesRowType}>
            {cells.map((cell, cellIndex) => {
                return (<Form.Control key={cellIndex} size="sm" className="text-center" type="text" placeholder={cell.placeholder} value={cell.value}
                    onChange={(e) => handleUpdate(cellIndex, e.target.value)} onKeyDown={(e) => handleNavigation(e.key)}
                    onFocus={() => handleFocus(cellIndex)} ref={cell.reference}></Form.Control>)
            })}
            </InputGroup>)

        var labelGroup = (
            <InputGroup className={labelsRowType}>
            {cells.map((cell, index) => {
                    return (<Form.Control key={index} size="sm" className="text-center" type="text" value={cell.label} disabled></Form.Control>)
                })}
        </InputGroup>
        )

        if (showLabels) return (<>{labelGroup}{valueGroup}</>)
        else return (<>{valueGroup}</>)
    }

    return (
        <>
            {constructRow()}
        </>
    )
}

export default GridRow;