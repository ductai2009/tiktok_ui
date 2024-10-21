import className from 'classnames/bind';
import style from './Button.module.css';
import { Link } from 'react-router-dom';

let cx = className.bind(style);

function Button({
    to,
    href,
    primary = false,
    outline = false,
    small = false,
    large = false,
    rounded = false,
    text = false,
    disable = false,
    leftIcon,
    rightIcon,
    className,
    children,
    onClick,
    preProps,
}) {
    let Comp = 'button';
    const props = {
        onClick,
        ...preProps,
    };
    if (disable) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on')) {
                delete props.key;
            }
        });
    }
    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    let classes = cx('wrapper', {
        [className]: className,
        primary,
        outline,
        small,
        large,
        rounded,
        text,
        disable,
    });
    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}

export default Button;
