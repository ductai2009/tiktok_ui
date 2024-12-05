import { Fragment, useEffect, useState } from 'react';
import images from '~/assets/image';
import style from './Image.module.css';
import { Link, useNavigate } from 'react-router-dom';
function Image({ fallBack: srcFallBack, to, alt, src, ...props }) {
    const timestamp = new Date().getTime();
    const navigate = useNavigate();
    const [fallBack, setFallBack] = useState(src + `?t=${timestamp}`);
    useEffect(() => {
        try {
            if (src) {
                setFallBack(src + `?t=${timestamp}`);
            }
            if (!fallBack) {
                setFallBack(images.noImage);
            }
        } catch (error) {
            console.log('error load img: ', error);
        }
    }, [src]);

    const handleError = () => {
        if (srcFallBack) {
            setFallBack(srcFallBack + `?t=${timestamp}`);
        } else {
            setFallBack(images.noImage);
        }
    };
    return <img className={style.wrapper} src={fallBack} {...props} onError={() => handleError()} alt={alt}></img>;
}

export default Image;
