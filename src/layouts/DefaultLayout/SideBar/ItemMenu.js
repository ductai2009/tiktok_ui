import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import { CircleSmallIcon } from '~/components/Icon';
import classNames from 'classnames/bind';
import style from './SideBar.module.css';
import Image from '~/components/Image';
import images from '~/assets/image';
const cx = classNames.bind(style);

function ItemMenu({ avatar, icon, iconActive, title, to, tag = '', circle = false, className }) {
    const Icon = icon;
    const IconActive = iconActive;
    const handleClickMenu = (title) => {
        document.title = title;
    };
    return (
        <NavLink
            onClick={() => handleClickMenu(title)}
            end
            to={to}
            className={(nav) => cx('btn', 'item-hv', { active: nav.isActive })}
        >
            <div className={cx('icon', { [className]: className })}>
                {(avatar && <Image src={images.accountNhuY} className={cx('current-user', 'pd-4')} />) || (
                    <>
                        {' '}
                        <div className={cx('icon-primary')}>
                            <Icon />
                        </div>
                        <div className={cx('icon-active')}>
                            <IconActive />
                        </div>
                    </>
                )}
            </div>
            <div className={cx('content')}>
                <div className={cx('title')}>{title} </div>
                {tag && <p className={cx('tag')}>{tag}</p>}
                {circle && (
                    <div className={cx('circle-small')}>
                        <CircleSmallIcon />
                    </div>
                )}
            </div>
        </NavLink>
    );
}

export default ItemMenu;
