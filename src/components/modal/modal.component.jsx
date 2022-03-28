import { gameStates } from '../../minesweeper';
import './modal.css';

const Modal = ({ gameState, time }) => {

    const modalClassByGameState = {
        [gameStates.lose]: 'modal-fade--win',
        [gameStates.win]: 'modal-fade--lose'
    }
    const titleByGameState = {
        [gameStates.lose]: 'Проигрыш, попробуй ещё раз!',
        [gameStates.win]: 'Победа! Молодец!'
    }

    const getTime = () => {
        const seconds = time % 60;
        const minutes = Math.floor(time / 60);

        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    return (
        <div className={`modal-fade ${modalClassByGameState[gameState]} ${gameState === gameStates.isPlaying ? '' : 'modal-fade--show'}`}>
            <div className={'modal'}>
                <div>
                    {titleByGameState[gameState]}
                </div>
                <div>
                    Время: {getTime()}
                </div>
            </div>
        </div>
    )
}
export default Modal;