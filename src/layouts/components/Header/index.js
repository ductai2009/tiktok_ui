import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleXmark,
    faSpinner,
    faMagnifyingGlass,
    faEllipsisVertical,
    faEarthAmericas,
    faCircleQuestion,
    faMoon,
} from '@fortawesome/free-solid-svg-icons';
import { faMessage } from '@fortawesome/free-regular-svg-icons';
import 'tippy.js/dist/tippy.css'; // optional
import HeadLessTippy from '@tippyjs/react/headless'; // different import path!
import Tippy from '@tippyjs/react'; // different import path!
import 'tippy.js/dist/tippy.css'; // optional
import PropTypes from 'prop-types';

import className from 'classnames/bind';
import style from './Header.module.css';
import images from '~/assets/image';
import { Wrapper as WrapperLayout } from '~/components/Popper';
import Button from '~/components/Button';
import config from '~/components/config';

import Menu from '~/components/Popper/Menu';
import {
    MessageIcon,
    AccountIcon,
    TiktokIcon,
    CreatorToolIcon,
    SettingIcon,
    LanguageIcon,
    FeedBackIcon,
    ModeIcon,
    LogOutIcon,
    PlusIcon,
    LogoIcon,
} from '~/components/Icon';
import Image from '~/components/Image';
import Search from '../Search';
import { Link } from 'react-router-dom';

const cx = className.bind(style);

function Header() {
    // console.log(process.env);
    const currentUser = true;
    const MENU_NO_ACC = [
        {
            title: 'Ngôn Ngữ',
            icon: <LanguageIcon />,
            to: '',
            children: {
                title: 'Language',
                data: [
                    { code: 'vi', title: 'Tiếng Việt' },
                    { code: 'en', title: 'Tiếng Anh' },
                ],
            },
        },
        {
            title: 'Phản hồi và trợ giúp',
            icon: <FeedBackIcon />,
            to: '/fetchBack',
        },
        {
            title: 'Chế độ sáng',
            icon: <ModeIcon />,
            to: '',
        },
    ];
    const MENU_ACC = [
        {
            title: 'View profile',
            icon: <AccountIcon />,
            to: '/fetchBack',
        },
        {
            title: 'Get Coins',
            icon: <TiktokIcon />,
            to: '',
        },
        {
            title: 'Creator tools',
            icon: <CreatorToolIcon />,
            to: '/fetchBack',
        },
        {
            title: 'Settings',
            icon: <SettingIcon />,
            to: '',
        },
    ];
    let MENU_ITEM = MENU_NO_ACC;
    if (currentUser) {
        MENU_ITEM = [
            ...MENU_ACC,
            ...MENU_ITEM,
            {
                title: 'Log out',
                icon: <LogOutIcon />,
                to: '',
                separate: true,
            },
        ];
    }
    const handleOnChange = (data) => {
        // console.log(data);
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('content')}>
                <Link to={config.routes.Home} className={cx('logo')}>
                    <img className={cx('logo-full')} src={images.logo} alt="Tiktok"></img>
                    <LogoIcon className={cx('logo-ipad')}></LogoIcon>
                </Link>
                <Search />
                <div className={cx('action')}>
                    {currentUser ? (
                        <>
                            <Button outline className={cx('btn-upload')}>
                                <PlusIcon width="2.2rem" height="2.2rem" />
                                <div className={cx('title')}>Upload</div>
                            </Button>
                            <Tippy className={cx('tippy-message')} content="Inbox">
                                <div className={cx('box-message')}>
                                    <MessageIcon />
                                </div>
                            </Tippy>

                            <Menu item={MENU_ITEM} onChange={handleOnChange}>
                                <button className={cx('more-icon', 'account-icon')}>
                                    <div className={cx('box-current-user')}>
                                        <Image
                                            className={cx('current-user')}
                                            fallBack={images.accountNhuY}
                                            alt="Account"
                                        ></Image>
                                    </div>
                                </button>
                            </Menu>
                        </>
                    ) : (
                        <>
                            <Button text>Upload</Button>
                            <Button primary>Log In</Button>

                            <Menu item={MENU_ITEM} onChange={handleOnChange}>
                                <button className={cx('more-icon', 'noAccount-icon')}>
                                    <FontAwesomeIcon icon={faEllipsisVertical} />
                                </button>
                            </Menu>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
