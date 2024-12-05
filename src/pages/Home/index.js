import { useState, useEffect, useRef, useMemo } from 'react';
import Hammer from 'hammerjs';
import style from './Home.module.css';
import classNames from 'classnames/bind';
import videos from '~/assets/videos';

import images from '~/assets/image';
import HeadLessTippy from '@tippyjs/react/headless'; // different import path!
import Tippy from '@tippyjs/react'; // different import path!
import 'tippy.js/dist/tippy.css'; // optional
import {
    HeartIcon,
    CommentIcon,
    FlagIcon,
    ShareIcon,
    AddSmallIcon,
    ShareBlackIcon,
    CaptionIcon,
    FloatingPlayerIcon,
    SoundMuteIcon,
    SoundUnmuteIcon,
    MusicIcon,
    LocationIcon,
} from '~/components/Icon';
import Image from '~/components/Image';
import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import config from '~/components/config';

function Home() {
    const cx = classNames.bind(style);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false); // Trạng thái kiểm soát cuộn
    const slidesRef = useRef([]);
    const imgUserRef = useRef([]);
    const volumeRef = useRef();
    const [isVolume, setIsVolume] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.7);
    const [currentVolume, setCurrentVolume] = useState(volume);
    const [isPlayVideo, setIsPlayVideo] = useState(false);
    const videoRef = useRef([]);
    const [timeStates, setTimeStates] = useState([]);
    document.title = 'TikTok - Make Your Day';

    const slides = useMemo(() => {
        return Object.keys(videos).map((key) => ({
            label: key,
            nickname: 'ductai_09',
            srcVideo: videos[key],
            time: '1d ago',
            desc: 'Xingxing is Coming',
            music: 'Nhạc nền - byday music',
            location: 'Hanoi, Vietnam',
        }));
    }, [videos]);

    useEffect(() => {
        setTimeStates(
            slides.map(() => ({
                currentTime: 0,
                duration: 0,
            })),
        );
    }, [slides]);
    const setGlobalVolume = (volume) => {
        document.documentElement.style.setProperty('--video-volume', volume);
    };

    const numSlides = slides.length;
    const handleClickVolume = (e, index) => {
        const videoCurrent = videoRef.current[index];
        setIsVolume(!isVolume);

        videoRef.current.forEach((video) => {
            if (video) {
                video.volume = isVolume; // Set âm lượng cho từng video
            }
        });
        setVolume(isVolume ? currentVolume : 0);
        videoCurrent.volume = isVolume ? currentVolume : 0;
    };

    const handleTimeUpdate = (index) => {
        const videoCurrent = videoRef.current[index];
        if (videoCurrent) {
            setTimeStates((prevStates) => {
                const updatedStates = [...prevStates];
                updatedStates[index].currentTime = videoCurrent.currentTime;
                return updatedStates;
            });
        }
    };

    const handleLoadedMetadata = (index) => {
        const videoCurrent = videoRef.current[index];
        if (videoCurrent) {
            setTimeStates((prevStates) => {
                const updatedStates = [...prevStates];
                updatedStates[index].duration = videoCurrent.duration;
                return updatedStates;
            });
        }
    };

    // Xử lý thay đổi âm lượng
    const handleVolumeChange = (e, index) => {
        const newVolume = parseFloat(e.target.value);
        const videoCurrent = videoRef.current[index];
        if (videoCurrent) {
            videoCurrent.volume = newVolume;
        }
        setVolume(newVolume);
        setCurrentVolume(newVolume);
        if (newVolume > 0) {
            setIsVolume(false); // Nếu âm lượng > 0, không ở chế độ mute
        } else {
            setIsVolume(true); // Nếu âm lượng = 0, bật mute
        }
    };

    const handleSeek = (e, index) => {
        const videoCurrent = videoRef.current[index];
        const newTime = parseFloat(e.target.value);
        if (videoCurrent) {
            videoCurrent.currentTime = newTime;
        }

        setTimeStates((prevStates) => {
            const updatedStates = [...prevStates];
            updatedStates[index].currentTime = newTime;
            return updatedStates;
        });
    };

    // Hàm định dạng thời gian (giây -> mm:ss)
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    };
    const scrollToSlide = (index) => {
        if (index >= 0 && index < numSlides) {
            setCurrentSlide(index);
            const prevVideo = videoRef.current[currentSlide];
            const nextVideo = videoRef.current[index];

            if (prevVideo) {
                prevVideo.pause(); // Dừng video hiện tại
                prevVideo.currentTime = 0; // Reset video về thời gian đầu
                setIsPlayVideo(false);
            }

            slidesRef.current[index]?.scrollIntoView({ behavior: 'smooth' });
            setIsScrolling(true);
            setTimeout(() => setIsScrolling(false), 600);
        }
    };

    useEffect(() => {
        const hammer = new Hammer(document.body);
        hammer.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
        hammer.on('swipeup', () => scrollToSlide(currentSlide + 1));
        hammer.on('swipedown', () => scrollToSlide(currentSlide - 1));

        return () => {
            hammer.destroy();
        };
    }, [currentSlide]);

    const handleSliderWheel = (e) => {
        const sliderWrapper = document.getElementById('sliderWrapper');
        const isInSlider = e.target === sliderWrapper || sliderWrapper.contains(e.target);
        const timeAnimation = 400;
        const transform = 'transform 1000ms ease-out';

        if (isInSlider && !isScrolling) {
            e.preventDefault();
            if (e.deltaY > 0) {
                if (currentSlide === numSlides - 1) {
                    // animate to a slightly offset position with a transition effect
                    sliderWrapper.style.transform = 'translateY(-40px)';
                    sliderWrapper.style.transition = transform;
                    setTimeout(() => {
                        sliderWrapper.style.transform = '';
                        sliderWrapper.style.transition = '';
                    }, timeAnimation);
                } else {
                    scrollToSlide(currentSlide + 1);
                }
            } else if (e.deltaY < 0) {
                if (currentSlide === 0) {
                    // animate to a slightly offset position with a transition effect
                    sliderWrapper.style.transform = 'translateY(40px)';
                    sliderWrapper.style.transition = transform;
                    setTimeout(() => {
                        sliderWrapper.style.transform = '';
                        sliderWrapper.style.transition = '';
                    }, timeAnimation);
                } else {
                    scrollToSlide(currentSlide - 1);
                }
            }
        }
    };

    useEffect(() => {
        window.addEventListener('wheel', handleSliderWheel);

        return () => {
            window.removeEventListener('wheel', handleSliderWheel);
        };
    }, [currentSlide, isScrolling]);

    const playVideo = (index) => {
        const videoCurrent = videoRef.current[index];

        if (isPlayVideo) {
            setIsPlayVideo(false);
            videoCurrent.pause();
        } else {
            setIsPlayVideo(true);
            videoCurrent.play();
        }
    };
    const [profile, setProfile] = useState();

    return (
        <div id="sliderWrapper" className={cx('wrapper')}>
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={cx('slide')}
                    style={{ background: slide.background }}
                    ref={(el) => (slidesRef.current[index] = el)}
                >
                    <div className={cx('box-relative', 'box-video')}>
                        <div className={cx('box-hover')}>
                            <FontAwesomeIcon icon={faPlay} className={cx('icon-play', { play: isPlayVideo })} />
                            <FontAwesomeIcon icon={faPause} className={cx('icon-pause', { pause: !isPlayVideo })} />
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
                                placement="right-start"
                                render={(attrs) => (
                                    <div className={cx('sound-video')}>
                                        <input
                                            id="volume-control"
                                            type="range"
                                            min="0"
                                            max="1"
                                            step="0.01"
                                            value={volume}
                                            onChange={(e) => handleVolumeChange(e, index)}
                                            style={{
                                                background: `linear-gradient(to right, var(--while) ${
                                                    volume * 100
                                                }%, rgba(255, 255, 255, 0.34) ${volume * 100}%)`,
                                            }}
                                        />
                                    </div>
                                )}
                            >
                                <div className={cx('box-sound', 'btn-hv')} onClick={(e) => handleClickVolume(e, index)}>
                                    {isVolume ? (
                                        <SoundMuteIcon className={cx('icon')} />
                                    ) : (
                                        <SoundUnmuteIcon className={cx('icon')} />
                                    )}
                                </div>
                            </HeadLessTippy>

                            <div className={cx('time-video')}>
                                <input
                                    className={cx('time-video__input')}
                                    type="range"
                                    min="0"
                                    max={timeStates[index]?.duration || 0}
                                    step="0.1"
                                    value={timeStates[index]?.currentTime || 0}
                                    onChange={(e) => handleSeek(e, index)}
                                    style={{
                                        background: `linear-gradient(to right, var(--primary) ${
                                            (timeStates[index]?.currentTime / timeStates[index]?.duration) * 100 || 0
                                        }%, rgba(255, 255, 255, 0.34) ${
                                            (timeStates[index]?.currentTime / timeStates[index]?.duration) * 100 || 0
                                        }%)`,
                                    }}
                                />
                            </div>
                            <div className={cx('info-video')}>
                                {slide.location && (
                                    <div className={cx('location')}>
                                        <LocationIcon className={cx('icon')} />
                                        <div className={cx('location-name', 'text-underline-hv')}>{slide.location}</div>
                                    </div>
                                )}
                                <div className={cx('nickname-and-time')}>
                                    <Link className={cx('useName', 'text-underline-hv')} to={slide.nickname}>
                                        {slide.nickname}
                                    </Link>
                                    <span>-</span>
                                    <div className={cx('time')}>{slide.time}</div>
                                </div>
                                <div className={cx('desc')}>{slide.desc}</div>

                                <div className={cx('music')}>
                                    <MusicIcon />
                                    <div className={cx('music-name', 'text-underline-hv')}>{slide.music}</div>
                                </div>
                            </div>
                        </div>
                        <video
                            className={cx('box-video')}
                            src={slide.srcVideo}
                            onClick={() => playVideo(index)}
                            ref={(el) => (videoRef.current[index] = el)}
                            onTimeUpdate={() => handleTimeUpdate(index)}
                            onLoadedMetadata={() => handleLoadedMetadata(index)}
                            controls={false}
                        ></video>
                    </div>
                    <div className={cx('action')}>
                        <div className={cx('box-relative', 'btn-action')}>
                            <Link to={config.routes.urlProfile + '/@ductai_09'}>
                                <Image
                                    alt="img-user"
                                    to={config.routes.urlProfile + '/@ductai_09'}
                                    src={images.accountNhuY}
                                    className={cx('current-user')}
                                />
                            </Link>

                            <span className={cx('box-add-follow')}>
                                <AddSmallIcon height="1.4rem" width="1.4rem" className={cx('add-follow')} />
                            </span>
                        </div>

                        <Button title="645.2K">
                            <HeartIcon className={cx('icon')} />
                        </Button>

                        <Button
                            to={`${config.routes.urlProfile}/@${slide.nickname}/video/video`}
                            srcVideo={slide.srcVideo}
                            title="645.2K"
                        >
                            <CommentIcon className={cx('icon')} />
                        </Button>

                        <Button title="645.2K">
                            <FlagIcon className={cx('icon')} />
                        </Button>
                        <Button title="645.2K">
                            <ShareBlackIcon className={cx('icon')} />
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Home;
