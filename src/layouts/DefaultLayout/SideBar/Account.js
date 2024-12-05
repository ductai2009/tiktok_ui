import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import { CircleSmallIcon } from '~/components/Icon';
import classNames from 'classnames/bind';
import style from './SideBar.module.css';
import Image from '~/components/Image';
import images from '~/assets/image';

const cx = classNames.bind(style);

function Account({ src, nickName, fullName, className }) {
    return (
        <div className={cx('card', 'item-hv')}>
            <Image src={src} className={cx('current-user', 'avatar')} />
            <div className={cx('info')}>
                <p className={cx('nick-name')}>{nickName} </p>
                <p className={cx('full-name')}> {fullName}</p>
            </div>
        </div>
    );
}

export default Account;
