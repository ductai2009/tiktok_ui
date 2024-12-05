import style from './Comment.module.css';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import Image from '~/components/Image';

// import images from '~/assets/image';
import { DownIcon, HeartCmtIcon } from '../Icon';
import config from '../config';
import images from '~/assets/image';

function Comment({ srcUser, num_rep, userName, cmt, time, num_like, dataUser }) {
    const cx = classNames.bind(style);
    const location = useLocation();

    return (
        <div className={cx('container')}>
            <div className={cx('wrapper')}>
                <div className={cx('content')}>
                    <div className={cx('avatar')}>
                        <Link className={cx('profile')} to={config.routes.urlProfile + '/@' + userName}>
                            <Image src={srcUser} className={cx('avatar-user')} />
                        </Link>
                    </div>
                    <div className={cx('info-user')}>
                        <Link state={dataUser} to={config.routes.urlProfile + '/@' + userName}>
                            <div className={cx('user-name', 'hv-underline')}>{userName}</div>
                        </Link>
                        <div className={cx('cmt')}>{cmt}</div>
                        <div className={cx('time-reply')}>
                            <div className={cx('time')}>{time}</div>
                            <div className={cx('reply', 'hv-underline')}>Reply</div>
                        </div>
                    </div>
                    <div className={cx('count')}>
                        <HeartCmtIcon className={cx('icon')} />
                        <div className={cx('num_likes')}>{num_like}</div>
                    </div>
                </div>
                <div className={cx('rep-cmt')}>
                    <div className={cx('view-rep-cmt', 'hv-underline')}>
                        View {num_rep} replies
                        <DownIcon className={cx('hv-underline')} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Comment;
