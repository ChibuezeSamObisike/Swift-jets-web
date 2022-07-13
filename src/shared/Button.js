import { Button as MuiButton, CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';

/**
 *
 * @param children => Button text or icon
 * @param variant => Mui button variants e.g contained
 * @param color => Mui button colors e.g primary
 * @param size => Button button sizes e.g large
 * @param onClick => Handles onClick
 * @param loading => Loading state - disables button and attach spinner
 * @param startIcon => The button's start icon
 * @param rest => Mui button props
 */
const Button = ({ variant, color, size, onClick, loading, children, startIcon, ...rest }) => {
  return (
    <MuiButton
      size={size}
      color={color}
      variant={variant}
      onClick={onClick}
      disabled={loading}
      {...(!loading && { startIcon })}
      {...rest}
    >
      {children}
      {loading ? <CircularProgress size={10} /> : null}
    </MuiButton>
  );
};

export default Button;

Button.propTypes = {
  loading: PropTypes.bool,
  startIcon: PropTypes.node,
  children: PropTypes.node.isRequired,
  variant: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
  onClick: PropTypes.func
};

Button.defaultProps = {
  size: 'small',
  color: 'primary',
  variant: 'contained',
  loading: false,
  startIcon: null,
  onClick: null
};
