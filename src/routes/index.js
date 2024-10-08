import Home from '../pages/Home';
import Following from '../pages/Following';
import Profile from '../pages/Profile';
import Upload from '../components/Layout/Upload';
import Search from '../components/Layout/Search';

const publicRoutes = [
  // ko cần đăng nhập vẫn vào đc
  { path: '/', component: Home },
  { path: '/following', component: Following },
  { path: '/profile', component: Profile },
  { path: '/upload', component: Upload, layout: 'HeaderOnly' },
  { path: '/search', component: Search, layout: null },
];

const privateRoutes = [
  // cần đăng nhập, nếu ko đăng nhập thì ko vào đc
];
export { publicRoutes, privateRoutes };
