import { Box } from '@mui/material';
import { Pill } from 'reusables';
import PropTypes from 'prop-types';

const PillCrate = ({ pills, activePill, setActivePill, mutate }) => {
  return (
    <Box borderRadius={1} padding={1} direction="row" sx={{ backgroundColor: 'white' }}>
      {pills.map((pill) => (
        <Pill
          key={pill.label}
          color={pill.color}
          onClick={() => {
            setActivePill(pill.label);
            if (mutate) mutate(pill.label);
          }}
          label={pill.label}
          active={activePill === pill.label}
        />
      ))}
    </Box>
  );
};

PillCrate.propTypes = {
  pills: PropTypes.arrayOf(Object).isRequired,
  activePill: PropTypes.string.isRequired,
  setActivePill: PropTypes.func.isRequired,
  mutate: PropTypes.func
};

PillCrate.defaultProps = {
  mutate: () => {}
};

export default PillCrate;
