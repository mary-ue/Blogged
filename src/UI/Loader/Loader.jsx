import MoonLoader from 'react-spinners/MoonLoader';
import PropTypes from 'prop-types';

export const Loader = ({
  color = '#cc6633',
  css = {display: 'block'},
  size = 30
}) => {
  return (
    <MoonLoader color={color} css={css} size={size} />
  );
};

Loader.propTypes = {
  color: PropTypes.string,
  css: PropTypes.object,
  size: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};
