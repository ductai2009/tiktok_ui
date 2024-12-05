import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

import {
    HomeIcon,
    CompassIcon,
    HomeActiveIcon,
    CompassActiveIcon,
    UserLeftToRightIcon,
    UserLeftToRightActiveIcon,
    UserGroupIcon,
    UserGroupActiveIcon,
    CameraLiveIcon,
    CameraLiveActionIcon,
    PlaneIcon,
} from '~/components/Icon';
import classNames from 'classnames/bind';
import style from './SideBar.module.css';
import ItemMenu from './ItemMenu';
import Wrapper from './Wrapper';
import images from '~/assets/image';
import search from '~/services/searchService';
import config from '~/components/config';

const cx = classNames.bind(style);

function SideBar() {
    const [accountResult, setAccountResult] = useState([]);
    const [seeMore, setSeeMore] = useState(true);
    const [isCompany, setIsCompany] = useState(false);
    const [isProgram, setIsProgram] = useState(false);
    const [isTeamsAndPolicies, setIsTeamsAndPolicies] = useState(false);

    const fetchApi = async (query) => {
        const result = await search(query);
        setAccountResult(result.data);
    };
    const handleSeeMore = () => {
        setSeeMore(false);
        fetchApi('t');
    };
    useEffect(() => {
        fetchApi('a');
    }, []);
    const handleClickFooter = (type) => {
        setIsCompany(type === 'company');
        setIsProgram(type === 'program');
        setIsTeamsAndPolicies(type === 'teamsAndPolicies');
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <ItemMenu title="For You" icon={HomeIcon} iconActive={HomeActiveIcon} to={config.routes.Home} />
                <ItemMenu
                    title="Explore"
                    icon={CompassIcon}
                    iconActive={CompassActiveIcon}
                    to={config.routes.Explore}
                    tag="New"
                />
                <ItemMenu
                    title="Following"
                    icon={UserLeftToRightIcon}
                    iconActive={UserLeftToRightIcon}
                    to={config.routes.Following}
                    circle={true}
                    className={'pl-5'}
                />
                <ItemMenu
                    title="Friends"
                    icon={UserGroupIcon}
                    iconActive={UserGroupActiveIcon}
                    to={config.routes.Friends}
                />
                <ItemMenu
                    title="LIVE"
                    icon={CameraLiveIcon}
                    iconActive={CameraLiveActionIcon}
                    to={config.routes.Live}
                />
                <ItemMenu
                    title="Messages"
                    icon={PlaneIcon}
                    iconActive={PlaneIcon}
                    to={config.routes.Messages}
                    className={'pl-3'}
                />
                <ItemMenu title="Profile" avatar={true} to={config.routes.Profile} />
            </div>
            <div className={cx('container', 'lane-dash', 'user')}>
                <Wrapper header="Following accounts" data={accountResult} onClick={handleSeeMore} seeMore={seeMore} />
            </div>
            <div className={cx('container', 'lane-dash', 'DivFooterContainer')}>
                <div className={cx('item', { active: isCompany })}>
                    <div onClick={() => handleClickFooter('company')} className={cx('header')}>
                        Company
                    </div>
                    <div className={cx('header__box')}>
                        <div className={cx('header__item')}>About</div>
                        <div className={cx('header__item')}>Newsroom</div>
                        <div className={cx('header__item')}>Contact</div>
                    </div>
                    <div className={cx('header__box')}>
                        <div className={cx('header__item')}>Careers</div>
                    </div>
                </div>
                <div className={cx('item', { active: isProgram })}>
                    <div onClick={() => handleClickFooter('program')} className={cx('header')}>
                        Program
                    </div>
                    <div className={cx('header__box')}>
                        <div className={cx('header__item')}>TikTok for Good</div>
                        <div className={cx('header__item')}>Advertise</div>
                    </div>

                    <div className={cx('header__box')}>
                        <div className={cx('header__item')}>TikTok LIVE Creator Networks</div>
                    </div>
                    <div className={cx('header__box')}>
                        <div className={cx('header__item')}>Transparency</div>
                        <div className={cx('header__item')}>Developers</div>
                    </div>
                    <div className={cx('header__box')}>
                        <div className={cx('header__item')}>TikTok Rewards</div>
                        <div className={cx('header__item')}>TikTok Embeds</div>
                    </div>
                </div>
                <div className={cx('item', { active: isTeamsAndPolicies })}>
                    <div className={cx('header')} onClick={() => handleClickFooter('teamsAndPolicies')}>
                        Terms & Policies
                    </div>
                    <div className={cx('header__box')}>
                        <div className={cx('header__item')}>Help</div>
                        <div className={cx('header__item')}>Safety</div>
                        <div className={cx('header__item')}>Terms</div>
                        <div className={cx('header__item')}>Privacy Policy</div>
                    </div>

                    <div className={cx('header__box')}>
                        <div className={cx('header__item')}>Accessibility</div>
                        <div className={cx('header__item')}>Privacy Center</div>
                    </div>
                    <div className={cx('header__box')}>
                        <div className={cx('header__item')}>Creator Academy</div>
                    </div>
                    <div className={cx('header__box')}>
                        <div className={cx('header__item')}>Community Guidelines</div>
                    </div>
                </div>

                <div className={cx('item', 'copyRight')}>© 2024 TikTok</div>
            </div>
        </div>
    );
}

export default SideBar;
