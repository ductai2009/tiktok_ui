import 'tippy.js/dist/tippy.css'; // optional
import Tippy from '@tippyjs/react/headless'; // different import path!

import className from 'classnames/bind';
import style from '../Menu.module.css';
import Button from '~/components/Button';

const cx = className.bind(style);
function MenuItem({ data }) {
    return (
        <Button className={cx('item-menu')} text leftIcon={data.icon}>
            {data.title}
        </Button>
    );
}

export default MenuItem;
