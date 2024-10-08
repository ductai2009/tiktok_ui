import className from 'classnames/bind';
import style from './Header.module.css';

const cx = className.bind(style);
function Header() {
  return (
    <header className={cx('wrapper')}>
      <div className={cx('content')}>
        <h2>Header</h2>
      </div>
    </header>
  );
}

export default Header;
