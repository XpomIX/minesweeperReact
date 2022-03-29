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

    return (
        <div className={`modal-fade ${modalClassByGameState[gameState]} ${gameState === gameStates.isPlaying ? '' : 'modal-fade--show'}`}>
            <div className={'modal'}>
                <div>
                    {titleByGameState[gameState]}
                </div>
                Время: {time}
            </div>
        </div>
    )
}
export default Modal;