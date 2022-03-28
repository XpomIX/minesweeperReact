import { useEffect } from 'react';
import './cell.css'
import { cellTypes } from './cell.lib';

const valueColors = {
    0: '',
    1: 'blue',
    2: 'green',
    3: 'red',
    4: 'darkblue',
    5: 'darkred',
    6: 'turquoise',
    7: 'darkturquoise',
    8: 'black'
}

const CellComponent = ({ opened, type, value, handleClickLMB, handleClickRMB, pos, marked, size }) => {

    useEffect(() => {
    }, [opened])

    function handleLMB() {
        if (!opened && !marked) {
            handleClickLMB(pos[0], pos[1]);
        }
    }

    function handleRMB() {
        handleClickRMB(pos[0], pos[1]);
    }

    const renderContent = () => {
        if (marked) {
            return (
                <div className={'cell-content cell-content--marked'}>
                    <img alt={''} src={'https://cdn-icons-png.flaticon.com/512/6737/6737174.png'} style={{ width: '70%' }} />
                </div>
            )
        }
        if (opened) {
            let cellValue = value !== 0 ? value : '';
            return (
                <div className={`cell-content ${type === cellTypes.bomb && 'cell-content--bomb'}`}>
                    {type === cellTypes.cell && !marked ? cellValue : ''}
                    {type === cellTypes.bomb && !marked ? <img alt={''} src={'https://img.icons8.com/ios-glyphs/344/naval-mine.png'} style={{ width: '70%' }} /> : ''}
                </div>
            )
        }
    }
    return (
        <div className={`cell ${opened && 'cell--opened'}`} style={{ color: valueColors[value], width: `${size}px`, height: `${size}px` }} onClick={() => handleLMB()} onContextMenu={() => { handleRMB() }} pos1={pos[0]} pos2={pos[1]} >
            {renderContent()}
        </div >
    )
}
export default CellComponent;