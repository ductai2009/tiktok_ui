import 'tippy.js/dist/tippy.css'; // optional
import TippyHeadless from '@tippyjs/react/headless'; // different import path!

import className from 'classnames/bind';
import style from './Menu.module.css';
import AccountItem from '~/components/AccountItem';
import { Wrapper as WrapperLayout } from '~/components/Popper';
import MenuItem from './MenuItem';
import Header from './MenuItem/Header';
import { useState } from 'react';

const cx = className.bind(style);
function Menu({ children, item = [], onChange }) {
    const [history, setHistory] = useState([{ data: item }]);
    const current = history[history.length - 1];
    const handleClickBack = () => {
        setHistory(history.splice(0, history.length - 1));
    };
    const itemData = current.data;
    const renderItem = () => {
        return itemData.map((item, index) => {
            let isParent = !!item.children;
            const handleMenuClick = (item) => {
                if (isParent) {
                    setHistory([...history, item.children]);
                } else {
                    onChange(item);
                }
            };
            // console.log('children: ', item.to);
            return <MenuItem to={item.to} key={index} data={item} onClick={() => handleMenuClick(item)}></MenuItem>;
        });
    };
    return (
        <TippyHeadless
            interactive
            // visible={true}
            appendTo={document.body}
            hideOnClick={false}
            placement="bottom-end"
            delay={[0, 500]}
            render={(attrs) => (
                <div className={cx('menu-item')} tabIndex="-1" {...attrs}>
                    <WrapperLayout>
                        {history.length > 1 && <Header onBack={handleClickBack} title="Language" />}
                        <div className={cx('menu-item__item')}>{renderItem()}</div>
                    </WrapperLayout>
                </div>
            )}
            onHide={() => {
                setHistory((his) => his.slice(0, 1));
            }}
        >
            {children}
        </TippyHeadless>
    );
}

export default Menu;
