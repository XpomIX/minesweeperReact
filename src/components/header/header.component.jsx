import { gameStates } from '../../minesweeper';
import './header.css';


const Header = ({ gameState, minesLeft, handleRestart, time }) => {
    const gameStatesImages = {
        [gameStates.isPlaying]: 'http://static.skaip.su/img/emoticons/180x180/f6fcff/smile.gif',
        [gameStates.lose]: 'http://static.skaip.su/img/emoticons/180x180/f6fcff/headbang.gif',
        [gameStates.win]: 'http://static.skaip.su/img/emoticons/180x180/f6fcff/cool.gif'
    };

    const getMinesLeft = () => {
        const word = 'мин'
        const endingByNum = () => {
            const lastNum = minesLeft % 10;
            switch (lastNum) {
                case 0: return '';
                case 1: return 'а';
                case 2: return 'ы';
                case 3: return 'ы';
                case 4: return 'ы';
                case 5: return '';
                case 6: return '';
                case 7: return '';
                case 8: return '';
                case 9: return '';
            }
        }

        return `Осталось ${minesLeft} ${word}${endingByNum()}`;
    }

    return (
        <div className={'minesweeper-header'}>
            <div className={'minesweeper-header__time'}>{time}</div>
            <div className={`minesweeper-header__restart ${!(gameState === gameStates.isPlaying) ? 'minesweeper-header__restart--win' : ''}`} onClick={handleRestart}>
                <img alt={''} src={`${gameStatesImages[gameState]}`} />
            </div>
            <div className={'minesweeper-header__mines-left'}>{getMinesLeft()}</div>
        </div>
    )
}
export default Header;