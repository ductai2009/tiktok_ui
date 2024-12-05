import Home from '../pages/Home';
import Following from '../pages/Following';
import Profile from '../pages/Profile';
import Upload from '~/layouts/Upload';
import Search from '~/layouts/Search';
import Photo from '~/pages/Photo';
import Video from '~/pages/Video';

import config from '~/components/config';

const publicRoutes = [
    { path: config.routes.Home, component: Home },
    { path: config.routes.Following, component: Following },
    { path: config.routes.Explore, component: Following },
    { path: config.routes.Friends, component: Following },
    { path: config.routes.Live, component: Following },
    { path: config.routes.Messages, component: Following },
    { path: config.routes.Profile, component: Profile },
    { path: config.routes.Photo, component: Photo, layout: null },
    { path: config.routes.Video, component: Video, layout: null },
    { path: config.routes.Upload, component: Upload, layout: null },
    { path: config.routes.Search, component: Search, layout: null },
];

const privateRoutes = [];
export { publicRoutes, privateRoutes };
