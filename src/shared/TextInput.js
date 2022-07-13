import { makeStyles } from '@mui/styles';
import { TextField as MuiTextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';

const TextField = ({ label, control, name, ...rest }) => {
  const classes = useStyles();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
        <MuiTextField
          inputRef={ref}
          onChange={onChange}
          value={value}
          label={label}
          error={!!error}
          helperText={error?.message}
          className={classes.input}
          {...rest}
        />
      )}
    />
  );
};

export default TextField;

TextField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  control: PropTypes.shape({}).isRequired
};

/* eslint no-use-before-define: ["error", { "variables": false }] */
const useStyles = makeStyles({
  input: {
    'minWidth': 360,

    '& .MuiInputBase-root': {
      // 'height': 59,
      'borderRadius': 8,
      'fontSize': 16,
      'color': '#6B6C7E',
      'padding': '17px 6px',

      '& .MuiOutlinedInput-input': {
        padding: '0px 14px 0px 6px'
      }
    },

    '& .MuiSvgIcon-root': {
      marginRight: 14
    }
  }
});
