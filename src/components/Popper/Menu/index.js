import 'tippy.js/dist/tippy.css'; // optional
import Tippy from '@tippyjs/react/headless'; // different import path!

import className from 'classnames/bind';
import style from './Menu.module.css';
import AccountItem from '~/components/AccountItem';
import { Wrapper as WrapperLayout } from '~/components/Popper';
import MenuItem from './MenuItem';

const cx = className.bind(style);
function Menu({ children, item = [] }) {
    const renderItem = () => {
        return item.map((item, index) => <MenuItem key={index} data={item}></MenuItem>);
    };
    return (
        <Tippy
            interactive
            placement="bottom-end"
            delay={[0, 500]}
            render={(attrs) => (
                <div className={cx('menu-item')} tabIndex="-1" {...attrs}>
                    <WrapperLayout>{renderItem()}</WrapperLayout>
                </div>
            )}
        >
            {children}
        </Tippy>
    );
}

export default Menu;
