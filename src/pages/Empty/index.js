import { Link } from 'react-router-dom';
import style from './Empty.module.css';
import classNames from 'classnames/bind';
import { Fragment } from 'react';
function Empty({ title = 'Chức năng hiện đang phát triển', code = 404 }) {
    const cx = classNames.bind(style);
    return (
        <div className={cx('body')}>
            <div id="background"></div>

            <div className={cx('top')}>
                <h1 className={cx('title-h1')}>{code}</h1>
                <h3 className={cx('title-h3')}>{title}</h3>
            </div>
            <div className={cx('container')}>
                <div className={cx('ghost-copy')}>
                    <div className={cx('one')}></div>
                    <div className={cx('two')}></div>
                    <div className={cx('three')}></div>
                    <div className={cx('four')}></div>
                </div>
                <div className={cx('ghost')}>
                    <div className={cx('face')}>
                        <div className={cx('eye')}></div>
                        <div className={cx('eye-right')}></div>
                        <div className={cx('mouth')}></div>
                    </div>
                </div>
                <div className={cx('shadow')}></div>
            </div>
            <div className={cx('bottom')}>
                <p className={cx('title-p')}></p>
                <form className={cx('search')}>
                    {/* <button type="submit" className={cx('search-btn')}>
                        <i className={cx('fa', 'fa-search')}></i>
                    </button> */}
                </form>
                {/* <div className={cx('buttons')}>
                    <button className={cx('btn')}>Back</button>
                    <button className={cx('btn')}>Home</button>
                </div> */}
            </div>
            <div className={cx('footer')}>
                made by <a href="https://codepen.io/juliepark"> julie</a> ♡
            </div>
        </div>
    );
}

export default Empty;
