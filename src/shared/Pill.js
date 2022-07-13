import { Box } from '@mui/material';
import PropTypes from 'prop-types';

const Pill = ({ onClick, label, active, color }) => {
  const style = {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
    color: active ? '#FFFFFF' : color,
    backgroundColor: active ? '#272833' : null,
    borderRadius: active ? '8px' : null,
    padding: '4px 8px 4px 8px',
    cursor: 'pointer',
    transition:
      'color .3s cubic-bezier(0.42, 0, 0.15, 1.02), background .1s cubic-bezier(0.65, 0.05, 0.36, 1)',
    marginLeft: '8px',
    marginRight: '8px'
  };

  return (
    <Box component="span" borderRadius={1} onClick={onClick} sx={style} mx="16px">
      {label}
    </Box>
  );
};

export default Pill;

Pill.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired
  
};
