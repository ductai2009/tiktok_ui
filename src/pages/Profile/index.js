import style from './Profile.module.css';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import Image from '~/components/Image';
import images from '~/assets/image';
import {
    LockIcon,
    SettingIcon,
    ShareIcon,
    TableIcon,
    FeedTabIcon,
    HeartLikeIcon,
    PlayProfileIcon,
    PenInBoxIcon,
    FireIcon,
} from '~/components/Icon';
import Button from '~/components/Button';
import videos from '~/assets/videos';
import Video from './Video';
import { useEffect, useState } from 'react';

function Profile({ userName = 'ductai_09' }) {
    const location = useLocation();
    const cx = classNames.bind(style);
    // const [dataUser, setDataUser] = useState({});
    let dataUser = location.state;

    // setDataUser(location.state);

    // console.log('data location: ', dataUser);
    if (!dataUser) {
        dataUser = {
            avatar: images.accountNhuY,
            nickname: 'ductai_09',
            full_name: 'Đức Tài',
            bio: 'bio',
            followers_count: '12M',
            followings_count: '32.4K',
            likes_count: '32M',
        };
    }
    const videoSrc = [];
    for (let video in videos) {
        videoSrc.push(videos[video]);
    }

    document.title = dataUser.nickname || userName;

    return (
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <Image src={dataUser.avatar} className={cx('current-user')} />
                <div className={cx('header-info')}>
                    <div className={cx('info')}>
                        <h2 className={cx('user-name')}>{dataUser.nickname || userName}</h2>
                        <LockIcon className={cx('icon')} />
                        <h2 className={cx('full-name')}>{dataUser.full_name}</h2>
                    </div>
                    <div className={cx('action')}>
                        <Button primary className={cx('edit-profile', 'btn')} clsTitle="pro-title">
                            <PenInBoxIcon className={cx('pro-title', 'icon-media')} />
                            <p className={cx('pro-title', 'title-media')}>Edit profile</p>
                        </Button>
                        <Button className={cx('promote-post', 'btn')}>
                            <FireIcon className={cx('icon-media')} />
                            <div className={cx('title-media')}>Promote post</div>
                        </Button>
                        <Button className={cx('setting', 'btn')}>
                            <SettingIcon width="1.9rem" height="1.9rem" />
                        </Button>
                        <Button className={cx('share', 'btn')}>
                            <ShareIcon />
                        </Button>
                    </div>
                    <div className={cx('count-info')}>
                        <div className={cx('following')}>
                            <strong className={cx('count-info__count')}>{dataUser.followings_count || '12.3k'}</strong>
                            <p className={cx('count-info__title')}>Following</p>
                        </div>
                        <div className={cx('followers')}>
                            <strong className={cx('count-info__count')}>{dataUser.followers_count || '32.3M'}</strong>
                            <p className={cx('count-info__title')}>Followers</p>
                        </div>
                        <div className={cx('likes')}>
                            <strong className={cx('count-info__count')}>{dataUser.likes_count || '124.3M'}</strong>
                            <p className={cx('count-info__title')}>Likes</p>
                        </div>
                    </div>
                    <div className={cx('desc')}>{dataUser.bio}</div>
                </div>
            </header>
            <div className={cx('content')}>
                <div className={cx('header')}>
                    <div className={cx('VideoFeedTab')}>
                        <Button text className={cx('edit-profile', 'btn', 'activeVideoFeedTab')} clsTitle="pro-title">
                            <TableIcon className={cx('icon')} />
                            <p className={cx('pro-title')}>Videos</p>
                        </Button>
                        <Button text className={cx('edit-profile', 'btn')} clsTitle="pro-title">
                            <FeedTabIcon className={cx('icon')} />
                            <p className={cx('pro-title')}>Favorites</p>
                        </Button>
                        <Button text className={cx('edit-profile', 'btn')} clsTitle="pro-title">
                            <HeartLikeIcon className={cx('icon')} />
                            <p className={cx('pro-title')}>Liked</p>
                        </Button>
                    </div>
                    <div className={cx('SegmentedControl')}>
                        <Button
                            primary
                            className={cx('edit-profile', 'btn', 'activeSegmentedControl')}
                            clsTitle="pro-title"
                        >
                            <p className={cx('pro-title')}>Latest</p>
                        </Button>
                        <Button primary className={cx('edit-profile', 'btn')} clsTitle="pro-title">
                            <p className={cx('pro-title')}>Popular</p>
                        </Button>
                        <Button primary className={cx('edit-profile', 'btn')} clsTitle="pro-title">
                            <p className={cx('pro-title')}>Oldest</p>
                        </Button>
                    </div>
                </div>
                <div className={cx('box-video')}>
                    <div className={cx('column')}>
                        <div className={cx('grid')}>
                            {videoSrc.map((video, index) => {
                                dataUser['srcVideo'] = video;
                                return <Video key={index} src={video} dataUser={dataUser} />;
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
