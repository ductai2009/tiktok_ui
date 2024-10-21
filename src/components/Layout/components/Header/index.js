import { useState } from 'react';
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
import 'tippy.js/dist/tippy.css'; // optional
import Tippy from '@tippyjs/react/headless'; // different import path!

import className from 'classnames/bind';
import style from './Header.module.css';
import images from '~/assets/image';
import { Wrapper as WrapperLayout } from '~/components/Popper';
import Button from '~/components/Button';
import AccountItem from '~/components/AccountItem';
import Menu from '~/components/Popper/Menu';

const cx = className.bind(style);

function Header() {
    const [accountResult, setAccountResult] = useState([]);
    const MENU_ITEM = [
        {
            title: 'Ngôn Ngữ',
            icon: <FontAwesomeIcon icon={faEarthAmericas} />,
            to: '',
        },
        {
            title: 'Phản hồi và trợ giúp',
            icon: <FontAwesomeIcon icon={faCircleQuestion} />,
            to: '',
        },
        {
            title: 'Chế độ sáng',
            icon: <FontAwesomeIcon icon={faMoon} />,
            to: '',
        },
    ];
    return (
        <header className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('logo')}>
                    <img src={images.logo} alt="Tiktok"></img>
                </div>
                <Tippy
                    visible={accountResult.length > 0}
                    interactive={true}
                    render={(attrs) => (
                        <div className={cx('tooltipBox')} tabIndex="-1" {...attrs}>
                            <WrapperLayout>
                                <div className={cx('sug-account')}>Accounts</div>
                                <div>
                                    <AccountItem />
                                    <AccountItem />
                                    <AccountItem />
                                    <AccountItem />
                                </div>
                            </WrapperLayout>
                        </div>
                    )}
                >
                    <div className={cx('search')}>
                        <input placeholder="Search" />
                        <button className={cx('iconClear')}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                        <button className={cx('iconLoading')}>
                            <FontAwesomeIcon icon={faSpinner} />
                        </button>
                        <Tippy content="Tìm kiếm">
                            <button className={cx('iconSearch')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faMagnifyingGlass} />
                            </button>
                        </Tippy>
                    </div>
                </Tippy>
                <div className={cx('action')}>
                    <Button text>Upload</Button>

                    <Button primary>Đăng nhập</Button>
                    <Menu item={MENU_ITEM}>
                        <button className={cx('more-icon')}>
                            <FontAwesomeIcon icon={faEllipsisVertical} />
                        </button>
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
