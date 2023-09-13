import classNames from 'classnames';
import style from './Text.module.css';
import PropTypes from 'prop-types';

export const Text = prop => {
  const {
    As = 'span',
    color = 'black',
    size,
    tsize,
    dsize,
    className,
    children,
    href,
    center,
    medium,
    bold,
    onClickFn,
  } = prop;

  const classes = classNames(
    className,
    style[color],
    {[style.center]: center},
    {[style[`fs${size}`]]: size},
    {[style[`fst${tsize}`]]: tsize}, // если передали tsize
    {[style[`fsd${dsize}`]]: dsize},
    {[style.medium]: medium},
    {[style.bold]: bold},
  );

  const handleClick = () => {
    if (onClickFn) {
      onClickFn(); // Вызываем функцию fn, если она была передана
    }
  };

  return (
    <As className={classes} href={href} onClick={handleClick}>
      {children}
    </As>
  );
};

Text.propTypes = {
  As: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.number,
  tsize: PropTypes.number,
  dsize: PropTypes.number,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
    PropTypes.array,
  ]),
  href: PropTypes.string,
  center: PropTypes.bool,
  medium: PropTypes.bool,
  bold: PropTypes.bool,
  onClickFn: PropTypes.func,
};
