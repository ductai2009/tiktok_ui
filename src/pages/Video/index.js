import style from './Video.module.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Header from '~/layouts/components/Header';
import classNames from 'classnames/bind';
import Image from '~/components/Image';
import images from '~/assets/image';
import search from '~/services/searchService';
import { useEffect, useState, useRef } from 'react';
import useDebounce from '~/hooks/useDebounce';

import 'tippy.js/dist/tippy.css'; // optional
import HeadLessTippy from '@tippyjs/react/headless'; // different import path!
import Tippy from '@tippyjs/react'; // different import path!
import 'tippy.js/dist/tippy.css'; // optional
import {
    CloseIcon,
    MusicIcon,
    LocationIcon,
    CommentIcon,
    FlagIcon,
    HeartIcon,
    RepeatIcon,
    EmBedLinkIcon,
    PlaneSmallIcon,
    FaceBookIcon,
    WhatAppIcon,
    ShareBlackIcon,
    TagIcon,
    FaceIcon,
    DownMediumIcon,
    UpMediumIcon,
    MoreDotsIcon,
    CaptionIcon,
    FloatingPlayerIcon,
    SoundUnmuteIcon,
    SoundMuteIcon,
} from '~/components/Icon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';
import videos from '~/assets/videos';
import Comment from '~/components/Comment';
import config from '~/components/config';
function Video({ srcVideo }) {
    const [isPlayVideo, setIsPlayVideo] = useState(false);
    const videoRef = useRef([]);
    const location = useLocation();
    const dataVideo = location.state;
    const cx = classNames.bind(style);
    const [srcVideoPage, setSrcVideoPage] = useState(dataVideo.srcVideo);
    const [accountResult, setAccountResult] = useState([]);
    const arrSrcVideos = [];
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.7);
    const [currentVolume, setCurrentVolume] = useState(volume);
    let dataUser = location.state;
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
    // Xử lý cập nhật thời gian hiện tại khi video phát
    const handleTimeUpdate = () => {
        if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);
        }
    };

    // Xử lý khi video tải xong để lấy tổng thời lượng
    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration);
        }
    };

    // Xử lý thay đổi âm lượng
    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        if (videoRef.current) {
            videoRef.current.volume = newVolume;
        }
        setVolume(newVolume);
        setCurrentVolume(newVolume);
        if (newVolume > 0) {
            setIsVolume(false);
        } else {
            setIsVolume(true);
        }
    };

    // Xử lý khi người dùng kéo thanh thời gian
    const handleSeek = (e) => {
        if (videoRef.current) {
            const newTime = parseFloat(e.target.value);
            videoRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };
    // Hàm định dạng thời gian (giây -> mm:ss)
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    };

    for (let video in videos) {
        arrSrcVideos.push(videos[video]);
    }
    const [indVideo, setIndVideo] = useState(0);

    let lengthSrcVideo = arrSrcVideos.length;

    const handleClickDownUp = (type) => {
        if (type === 'up') {
            setIndVideo((prev) => (prev < lengthSrcVideo - 1 ? prev + 1 : 0));
        } else if (type === 'down') {
            setIndVideo((prev) => (prev > 0 ? prev - 1 : lengthSrcVideo - 1));
        }

        setSrcVideoPage(arrSrcVideos[indVideo]);
        setIsScroll('');
    };

    const handleWheel = (event) => {
        setIsScroll(event.deltaY > 0 ? 'down' : 'up');
    };
    const [isScroll, setIsScroll] = useState('');
    const debouncedIsScroll = useDebounce(isScroll, 200);

    useEffect(() => {
        if (debouncedIsScroll == 'down') {
            handleClickDownUp('down');
        } else if (debouncedIsScroll == 'up') {
            handleClickDownUp('up');
        }
    }, [debouncedIsScroll]);

    useEffect(() => {
        const fetchApi = async (query) => {
            const result = await search(query);
            setAccountResult(result.data);
        };
        fetchApi('a');
    }, []);

    const playVideo = (e) => {
        if (isPlayVideo) {
            setIsPlayVideo(false);
            e.target.pause();
        } else {
            setIsPlayVideo(true);
            e.target.play();
        }
    };

    const [isVolume, setIsVolume] = useState(false);
    const handleClickVolume = () => {
        setIsVolume(!isVolume);
        setVolume(isVolume ? currentVolume : 0);
        videoRef.current.volume = isVolume ? currentVolume : 0;
    };

    const history = useNavigate();
    return (
        <>
            <Header />
            <div className={cx('wrapper')}>
                <div className={cx('box-video', 'box-relative')} onWheel={handleWheel}>
                    <div className={cx('bg-hv')}>
                        <div
                            className={cx('box-close', 'btn-hv')}
                            onClick={(e) => {
                                history(-1);
                            }}
                        >
                            <CloseIcon className={cx('icon', 'icon-close')}></CloseIcon>
                        </div>

                        <div className={cx('box-more-icon', 'btn-hv')} onClick={(e) => {}}>
                            <MoreDotsIcon className={cx('icon')} />
                        </div>
                        <div
                            className={cx('box-up', 'btn-hv')}
                            onClick={(e) => {
                                handleClickDownUp('up');
                            }}
                        >
                            <UpMediumIcon className={cx('icon')} />
                        </div>

                        <div
                            className={cx('box-down', 'btn-hv')}
                            onClick={(e) => {
                                handleClickDownUp('down');
                            }}
                        >
                            <DownMediumIcon className={cx('icon')} />
                        </div>

                        <Tippy className={cx('tippy-message')} content="Captions">
                            <div className={cx('box-caption', 'btn-hv')} onClick={(e) => {}}>
                                <CaptionIcon className={cx('icon')} />
                            </div>
                        </Tippy>

                        <Tippy className={cx('tippy-message')} content="Floating Player">
                            <div className={cx('box-floating', 'btn-hv')} onClick={(e) => {}}>
                                <FloatingPlayerIcon className={cx('icon')} />
                            </div>
                        </Tippy>
                        <HeadLessTippy
                            interactive={true}
                            appendTo={document.body}
                            // visible={true}
                            placement="top"
                            render={(attrs) => (
                                <div className={cx('sound-video')}>
                                    <input
                                        id="volume-control"
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.01"
                                        value={volume}
                                        onChange={handleVolumeChange}
                                        style={{
                                            background: `linear-gradient(to right, var(--while) ${
                                                volume * 100
                                            }%, rgba(255, 255, 255, 0.34) ${volume * 100}%)`,
                                        }}
                                    />
                                </div>
                            )}
                        >
                            <div className={cx('box-sound', 'btn-hv')} onClick={handleClickVolume}>
                                {isVolume ? (
                                    <SoundMuteIcon className={cx('icon')} />
                                ) : (
                                    <SoundUnmuteIcon className={cx('icon')} />
                                )}
                            </div>
                        </HeadLessTippy>

                        <div className={cx('time-video')} style={{ marginTop: '10px' }}>
                            <input
                                className={cx('time-video__input')}
                                type="range"
                                min="0"
                                max={duration}
                                step="0.1"
                                value={currentTime}
                                onChange={handleSeek}
                                style={{
                                    background: `linear-gradient(to right, var(--while) ${
                                        (currentTime / duration) * 100
                                    }%, rgba(255, 255, 255, 0.34) ${(currentTime / duration) * 100}%)`,
                                }}
                            />
                            <div className={cx('time-video__time')}>
                                <span>{formatTime(currentTime)}</span>
                                <span>/</span>
                                <span>{formatTime(duration)}</span>
                            </div>
                        </div>
                    </div>
                    <div className={cx('box-hover')}>
                        <FontAwesomeIcon icon={faPlay} className={cx('icon-play', { play: isPlayVideo })} />
                        <FontAwesomeIcon icon={faPause} className={cx('icon-pause', { pause: !isPlayVideo })} />
                    </div>
                    <video
                        onTimeUpdate={handleTimeUpdate}
                        onLoadedMetadata={handleLoadedMetadata}
                        controls={false}
                        ref={videoRef}
                        className={cx('video')}
                        onClick={playVideo}
                        src={srcVideoPage}
                    ></video>
                </div>
                <div className={cx('info-video')}>
                    <div className={cx('box-wrapper')}>
                        <div className={cx('header')}>
                            <div className={cx('info')}>
                                <div className={cx('layout-left')}>
                                    <Link
                                        className={cx('profile')}
                                        to={config.routes.urlProfile + '/@' + dataVideo.nickname || 'ductai.09'}
                                        state={dataVideo}
                                    >
                                        <Image src={dataVideo.avatar} className={cx('current-user')} />
                                    </Link>
                                    <div className={cx('user-info')}>
                                        <div className={cx('user-name')}>{dataVideo.nickname || 'ductai.09'}</div>
                                        <div className={cx('full-name')}>
                                            <p>{dataVideo.nickname || 'Đức Tài'}</p> <span>-</span>{' '}
                                            <div className={cx('time')}>1 ngày trước</div>
                                        </div>
                                    </div>
                                </div>
                                <Button className={cx('btn-follow')} primary>
                                    <div className={cx('title')}>Follow</div>
                                </Button>
                            </div>
                            <div className={cx('desc')}>
                                <div className={cx('title')}>
                                    <p className={cx('title')}>Nhạc cổ có đổ được anh 🙂</p>
                                    <p className={cx('box-hover')}>#78phuyen</p>
                                    <p className={cx('box-hover')}>#viral</p> <p className={cx('box-hover')}>#fypシ</p>
                                    <p className={cx('box-hover')}>#xh</p>
                                    <p className={cx('box-hover')}>#emxinh</p>
                                </div>
                            </div>
                            <div className={cx('music')}>
                                <MusicIcon />
                                <p>Nhạc nền - Tui là</p>
                            </div>
                            <div className={cx('location')}>
                                <LocationIcon className={cx('icon')} />
                                <p className={cx('title')}>ĐakLak</p>
                                {/* <LocationIcon className={cx('icon')} /> */}
                            </div>
                        </div>
                        <div className={cx('action')}>
                            <div className={cx('action-btn')}>
                                <div className={cx('btn-left')}>
                                    <div className={cx('like', 'd-flex')}>
                                        <HeartIcon className={cx('icon')} width="3.2rem" height="3.2rem" />

                                        <p className={cx('title')}>32.4K</p>
                                    </div>
                                    <div className={cx('cmt', 'd-flex')}>
                                        <CommentIcon className={cx('icon')} width="3.2rem" height="3.2rem" />
                                        <p className={cx('title')}>32.4K</p>
                                    </div>
                                    <div className={cx('flag', 'd-flex')}>
                                        <FlagIcon className={cx('icon')} width="3.2rem" height="3.2rem" />
                                        <p className={cx('title')}>32.4K</p>
                                    </div>
                                </div>
                                <div className={cx('btn-right')}>
                                    <Tippy className={cx('tippy-message')} content="Repost">
                                        <div className={cx('icon')}>
                                            <RepeatIcon className={cx('icon')} width="2.4rem" height="2.4rem" />
                                        </div>
                                    </Tippy>
                                    <Tippy className={cx('tippy-message')} content="Embed">
                                        <div className={cx('icon')}>
                                            <EmBedLinkIcon className={cx('icon')} width="2.4rem" height="2.4rem" />
                                        </div>
                                    </Tippy>
                                    <Tippy className={cx('tippy-message')} content="Telegram">
                                        <div className={cx('icon')}>
                                            <PlaneSmallIcon className={cx('icon')} width="2.4rem" height="2.4rem" />
                                        </div>
                                    </Tippy>
                                    <Tippy className={cx('tippy-message')} content="Facebook">
                                        <div className={cx('icon')}>
                                            <FaceBookIcon className={cx('icon')} width="2.4rem" height="2.4rem" />
                                        </div>
                                    </Tippy>

                                    <Tippy className={cx('tippy-message')} content="WhatApp">
                                        <div className={cx('icon')}>
                                            <WhatAppIcon className={cx('icon')} width="2.4rem" height="2.4rem" />
                                        </div>
                                    </Tippy>
                                    <Tippy className={cx('tippy-message')} content="Share">
                                        <div className={cx('icon')}>
                                            <ShareBlackIcon
                                                className={cx('icon', 'share-icon')}
                                                width="1.6rem"
                                                height="1.6rem"
                                            />
                                        </div>
                                    </Tippy>
                                </div>
                            </div>
                            <div className={cx('get-link')}>
                                <div className={cx('link')}>{dataVideo.avatar || 'ductai.09'}</div>
                                <Button className={cx('copy-link')}>Copy link</Button>
                            </div>
                            <div className={cx('tab-item')}>
                                <Button text className={cx('item', 'btn', 'active')}>
                                    Comments (<div>123</div>)
                                </Button>
                                <Button text className={cx('item', 'btn')}>
                                    Creator videos
                                </Button>
                            </div>
                        </div>
                        <div className={cx('comment')}>
                            {accountResult.length > 0 &&
                                accountResult.map((result, ind) => {
                                    return (
                                        <Comment
                                            key={ind}
                                            dataUser={result}
                                            srcUser={result.avatar || images.accountNhuY}
                                            num_rep="32"
                                            userName={result.nickname || 'ductai_09'}
                                            cmt="cmt cmt"
                                            time="11-2"
                                            num_like="32k"
                                        />
                                    );
                                })}
                        </div>
                    </div>
                    <div className={cx('write-cmt')}>
                        <input className={cx('input-cmt')} placeholder="Add comment..." />
                        <TagIcon className={cx('icon-tag')} />
                        <FaceIcon className={cx('icon-face')} />
                        <Button className={cx('btn-post')}>Post</Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Video;
