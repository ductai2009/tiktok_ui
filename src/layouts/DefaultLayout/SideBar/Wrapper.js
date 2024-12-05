import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import { CircleSmallIcon } from '~/components/Icon';
import classNames from 'classnames/bind';
import style from './SideBar.module.css';
import Image from '~/components/Image';
import Account from './Account';
import images from '~/assets/image';
import Button from '~/components/Button';

const cx = classNames.bind(style);

function Wrapper({ header, data = [], className, onClick, seeMore = false }) {
    if (!seeMore && seeMore !== null) {
        data = [...data, data];
    }
    // console.log('data: ', data);
    return (
        <div className={cx('layout-wrapper')}>
            {header && <header className={cx('layout-wrapper__header')}>{header}</header>}
            {data.map((result, ind) => {
                return (
                    <Link key={ind} to={`/tiktok_ui/@${result.nickname}`} state={{ ...result }}>
                        <Account src={result.avatar} nickName={result.nickname} fullName={result.full_name} />
                    </Link>
                );
            })}
            {seeMore && (
                <Button text small className={cx('btn-more')} onClick={onClick}>
                    <p className={cx('color-primary')}>See more</p>
                </Button>
            )}
        </div>
    );
}

export default Wrapper;
