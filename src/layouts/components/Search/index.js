import { useState, useRef, useEffect } from 'react';
import { default as axios } from 'axios';
import AccountItem from '~/components/AccountItem';
import HeadLessTippy from '@tippyjs/react/headless'; // different import path!
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';
import className from 'classnames/bind';
import style from './Search.module.css';
import { Wrapper as WrapperLayout } from '~/components/Popper';
import useDebounce from '~/hooks/useDebounce';
import search from '~/services/searchService';
const cx = className.bind(style);

function Search() {
    const [searchResult, setSearchResult] = useState('');
    const [loading, setLoading] = useState(false);
    const [accountResult, setAccountResult] = useState([]);
    const [showSearchResult, setShowSearchResult] = useState(true);
    const inputSearch = useRef();
    const handleClearSearch = () => {
        setSearchResult('');
        inputSearch.current.focus();
    };
    const handleHoverInputSearch = () => {
        setShowSearchResult(false);
    };

    const searchInput = useDebounce(searchResult, 500);
    const handleInputSearch = (e) => {
        const value = e.target.value;
        if (!value.startsWith(' ')) {
            setSearchResult(value);
        }
    };
    useEffect(() => {
        if (!searchInput.trim()) {
            setAccountResult([]);
            return;
        }

        const fetchApi = async () => {
            setLoading(true);
            const resultSearch = await search(searchInput);
            setAccountResult(resultSearch.data);
            setLoading(false);
        };
        fetchApi();
    }, [searchInput]);
    return (
        // Using a wrapper <div> or <span> tag around the reference element solves this by creating a new parentNode context.
        <div>
            <HeadLessTippy
                interactive={true}
                visible={showSearchResult && accountResult.length > 0}
                appendTo={document.body}
                render={(attrs) => (
                    <div className={cx('tooltipBox')} tabIndex="-1" {...attrs}>
                        <WrapperLayout>
                            <div className={cx('sug-account')}>Accounts</div>
                            <div>
                                {accountResult.map((result) => {
                                    return <AccountItem data={result} key={result.id} />;
                                })}
                            </div>
                        </WrapperLayout>
                    </div>
                )}
                onClickOutside={handleHoverInputSearch}
            >
                <div className={cx('search')}>
                    <input
                        className={cx('input_search')}
                        ref={inputSearch}
                        placeholder="Search"
                        onChange={(e) => handleInputSearch(e)}
                        value={searchResult}
                        onClick={() => setShowSearchResult(true)}
                    />
                    <HeadLessTippy content="Tìm kiếm">
                        <button
                            className={cx('iconSearch')}
                            onMouseDown={(e) => {
                                e.preventDefault();
                            }}
                        >
                            <FontAwesomeIcon className={cx('icon')} icon={faMagnifyingGlass} />
                        </button>
                    </HeadLessTippy>
                    {searchResult && (
                        <button className={cx('iconClear')} onClick={handleClearSearch}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                    {loading && (
                        <button className={cx('iconLoading')}>
                            <FontAwesomeIcon icon={faSpinner} />
                        </button>
                    )}
                </div>
            </HeadLessTippy>
        </div>
    );
}

export default Search;
