import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import className from 'classnames/bind';
import style from '../Menu.module.css';

const cx = className.bind(style);
function Header({ title, onBack }) {
    return (
        <div className={cx('header-menu')}>
            <button onClick={onBack} className={cx('iconBack-menu')}>
                <FontAwesomeIcon icon={faAngleLeft} />
            </button>
            <div className={cx('title-menu')}>{title}</div>
        </div>
    );
}

export default Header;
