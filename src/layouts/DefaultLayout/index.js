import Header from '../components/Header';
import SideBar from './SideBar';
import classNames from 'classnames/bind';
import style from './DefaultLayout.module.css';

const cx = classNames.bind(style);
function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <SideBar />
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;
