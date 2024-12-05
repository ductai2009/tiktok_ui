import { Link } from 'react-router-dom';
import style from './Profile.module.css';
import classNames from 'classnames/bind';
import images from '~/assets/image';
import { PlayProfileIcon } from '~/components/Icon';

function Video({ src, dataUser }) {
    const cx = classNames.bind(style);
    const handleClick = (e) => {
        console.log('handleClick: ', e.target.currentSrc);
        console.log('handleClick: ', e);
    };
    const infoVideo = `/@${dataUser.nickname || 'ductai_09'}/video/id`;
    let dataVideo = {
        nickname: dataUser.nickname,
        avatar: dataUser.avatar,
        nickname: dataUser.nickname,
        full_name: dataUser.full_name,
        bio: dataUser.bio,
        followers_count: dataUser.followers_count,
        followings_count: dataUser.followings_count,
        likes_count: dataUser.likes_count,
        srcVideo: src,
    };
    if (!dataVideo) {
        dataVideo = {
            avatar: images.accountNhuY,
            nickname: 'ductai_09',
            full_name: 'Đức Tài',
            bio: 'bio',
            followers_count: '12M',
            followings_count: '32.4K',
            likes_count: '32M',
            srcVideo: src,
        };
    }
    return (
        <Link to={infoVideo} state={dataVideo} srcVideo={src} className={cx('box-scale')}>
            <div className={cx('bg-pos')}>
                <PlayProfileIcon />
                <div className={cx('num_view')}>12M</div>
            </div>
            <video className={cx('video')} onClick={handleClick} src={src}></video>
        </Link>
    );
}

export default Video;
