import classNames from 'classnames/bind';
import style from './Home.module.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import images from '~/assets/image';
let cx = classNames.bind(style);

function Button({ to, children, title, className, srcVideo }) {
    const dataUser = {
        avatar: images.accountNhuY,
        nickname: 'ductai_09',
        full_name: 'Đức Tài',
        bio: 'bio',
        followers_count: '12M',
        followings_count: '32.4K',
        likes_count: '32M',
        srcVideo: srcVideo,
    };

    return (
        <Link className={cx('btn-action', { [className]: className })} state={dataUser} to={to}>
            {children}
            <span className={cx('title')}> {title}</span>
        </Link>
    );
}

export default Button;
