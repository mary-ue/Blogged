import {useEffect, useState} from 'react';
import style from './Tabs.module.css';
import PropTypes from 'prop-types';
import {assignId} from '../../../utils/generateRandomId';
import {debounceRaf} from '../../../utils/debounce';
import {ReactComponent as ArrowIcon} from './img/arrow.svg';
import {ReactComponent as Home} from './img/home1.svg';
import {ReactComponent as Top} from './img/top.svg';
import {ReactComponent as Best} from './img/best.svg';
import {ReactComponent as Hot} from './img/hot.svg';
import {Text} from '../../../UI/Text';
import {useNavigate} from 'react-router-dom';

const LIST = [
  {value: 'Главная', Icon: Home, link: ''},
  {value: 'Топ', Icon: Top, link: 'top'},
  {value: 'Лучшие', Icon: Best, link: 'best'},
  {value: 'Горячие', Icon: Hot, link: 'hot'},
].map(assignId);

export const Tabs = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdown, setIsDropDown] = useState(true);
  const [selectedTitle, setSelectedTitle] = useState(
    LIST.find((item) => item.value === 'Главная')
  );
  const navigate = useNavigate();

  const handleResize = () => {
    if (document.documentElement.clientWidth < 768) {
      setIsDropDown(true);
    } else {
      setIsDropDown(false);
    }
  };

  const handleSelectedTitle = (value) => {
    setSelectedTitle(LIST.find((item) => item.value === value));
  };

  useEffect(() => {
    const debounceResize = debounceRaf(handleResize);
    debounceResize();
    window.addEventListener('resize', debounceResize);

    return () => {
      window.removeEventListener('resize', debounceResize);
    };
  }, []);

  return (
    <div className={style.container}>
      {isDropdown && (
        <div className={style.wrapperBtn}>
          <button
            className={style.btn}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {selectedTitle.value}
            <ArrowIcon width={15} height={15} />
          </button>
        </div>
      )}
      {(isDropdownOpen || !isDropdown) && (
        <ul className={style.list} onClick={() => setIsDropdownOpen(false)}>
          {LIST.map(({value, link, id, Icon}) => (
            <li className={style.item} key={id}>
              <Text
                As='button'
                size={16}
                tsize={18}
                className={style.btn}
                onClickFn={() => {
                  handleSelectedTitle(value);
                  navigate(link ? `/category/${link}` : '');
                }
                }
              >
                {value}
                {Icon && <Icon width={30} height={30} />}
              </Text>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

Tabs.propTypes = {
  list: PropTypes.array,
  setList: PropTypes.func,
  addItem: PropTypes.func,
};
