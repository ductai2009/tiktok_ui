import classNames from 'classnames/bind';
import style from './AccountItem.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Image from '../Image';
import PropTypes from 'prop-types';
const cx = classNames.bind(style);

function AccountItem({ data }) {
    const dataLink = {
        avatar: data.avatar,
        nickname: data.nickname,
        full_name: data.full_name,
        bio: data.bio,
        followers_count: data.followers_count,
        followings_count: data.followings_count,
        likes_count: data.likes_count,
    };

    return (
        <Link to={`/@${data.nickname}`} state={dataLink} className={cx('content')}>
            <Image className={cx('img-account')} src={data.avatar} alt={data.full_name} />
            <div className={cx('info-account')}>
                <div className={cx('title')}>
                    <span>{data.full_name}</span>
                    {data.tick && <FontAwesomeIcon icon={faCircleCheck} className={cx('icon-check')} />}
                </div>
                <div className={cx('desc')}>{data.nickname}</div>
            </div>
            <FontAwesomeIcon className={cx('more-action')} icon={faEllipsis} />
        </Link>
    );
}

AccountItem.propTypes = {
    data: PropTypes.object.isRequired,
};
export default AccountItem;
