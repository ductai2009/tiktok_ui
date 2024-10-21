import className from 'classnames/bind';
import style from './AccountItem.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/image';
const cx = className.bind(style);

function AccountItem() {
    return (
        <div className={cx('content')}>
            <img className={cx('img-account')} src={images.accountNhuY} alt="Account"></img>
            <div className={cx('info-account')}>
                <div className={cx('title')}>
                    <span>Như Ý</span>
                    <FontAwesomeIcon icon={faCircleCheck} className={cx('icon-check')} />
                </div>
                <div className={cx('desc')}>Như Ý</div>
            </div>
            <FontAwesomeIcon icon={faEllipsis} />
        </div>
    );
}

export default AccountItem;
