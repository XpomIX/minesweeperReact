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

const CellComponent = ({ opened, type, value, boardWidth, handleClick, pos }) => {

    useEffect(() => {
        console.dir(opened);
    }, [opened])

    function handle() {
        if (!opened) {
            handleClick(pos[0], pos[1]);
        }
    }

    const renderContent = () => {
        if (opened) {
            let cellValue = value != 0 ? value : '';
            return (
                <div className={'cell-content'}>
                    {type === cellTypes.cell && cellValue}
                    {type === cellTypes.bomb && <img alt='' src='https://img.icons8.com/ios-glyphs/344/naval-mine.png' style={{ width: '70%' }} />}
                </div>
            )
        }
    }
    return (
        <div class={`cell ${opened && 'cell--opened'}`} style={{ color: valueColors[value] }} onClick={() => handle()} >
            {renderContent()}
        </div >
    )
}
export default CellComponent;