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

const cx = classNames.bind(style);

function SideBar() {
    const [accountResult, setAccountResult] = useState([]);
    const [seeMore, setSeeMore] = useState(true);

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

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <ItemMenu title="For You" icon={HomeIcon} iconActive={HomeActiveIcon} to="/" />
                <ItemMenu title="Explore" icon={CompassIcon} iconActive={CompassActiveIcon} to="/explore" tag="New" />
                <ItemMenu
                    title="Following"
                    icon={UserLeftToRightIcon}
                    iconActive={UserLeftToRightIcon}
                    to="/following"
                    circle={true}
                    className={'pl-5'}
                />
                <ItemMenu title="Friends" icon={UserGroupIcon} iconActive={UserGroupActiveIcon} to="/friends" />
                <ItemMenu title="LIVE" icon={CameraLiveIcon} iconActive={CameraLiveActionIcon} to="/live" />
                <ItemMenu title="Messages" icon={PlaneIcon} iconActive={PlaneIcon} to="/messages" className={'pl-3'} />
                <ItemMenu title="Profile" avatar={true} to="/profile" />
            </div>
            <div className={cx('container', 'lane-dash', 'user')}>
                <Wrapper header="Following accounts" data={accountResult} onClick={handleSeeMore} seeMore={seeMore} />
                {/* <Wrapper header="Following accounts" data={accountResult} onClick={handleSeeMore} /> */}
            </div>
        </div>
    );
}

export default SideBar;
