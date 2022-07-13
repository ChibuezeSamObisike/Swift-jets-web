import { Autocomplete as MuiAutoComplete, TextField, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Checkbox from '@mui/material/Checkbox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const AutoComplete = ({
  label,
  control,
  name,
  options,
  hasCheckbox = false,
  setCountryId,
  ...rest
}) => {
  const classes = useStyles();

  const autoComplete = () => {
    return (
      <Box>
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange }, fieldState: { error } }) => (
            <MuiAutoComplete
              isOptionEqualToValue={(option, selectedValue) => {
                return option?.value === selectedValue;
              }}
              loading={Boolean(!options)}
              options={options || []}
              onChange={(event, newValue) => {
                setCountryId(newValue?.value);
                onChange(newValue?.value || '');
              }}
              getOptionLabel={(option) => (typeof option === 'string' ? option : option?.label)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={label}
                  className={classes.input}
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'disable-autofill'
                  }}
                  error={!!error}
                  helperText={error?.message}
                />
              )}
              {...rest}
            />
          )}
        />
      </Box>
    );
  };

  const autoCompleteWithCheckBox = () => {
    return (
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange }, fieldState: { error } }) => (
          <MuiAutoComplete
            isOptionEqualToValue={(option, selectedValue) => {
              return option?.value === selectedValue;
            }}
            loading={!options}
            options={options || []}
            onChange={(event, newValue) => {
              setCountryId(newValue?.value);
              onChange(newValue?.value || '');
            }}
            getOptionLabel={(option) => (typeof option === 'string' ? option : option?.label)}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.label}
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                className={classes.input}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'disable-autofill'
                }}
                error={!!error}
                helperText={error?.message}
              />
            )}
            {...rest}
          />
        )}
      />
    );
  };
  return <Box>{hasCheckbox ? autoCompleteWithCheckBox() : autoComplete()}</Box>;
};

export default AutoComplete;

AutoComplete.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  control: PropTypes.shape({}).isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  hasCheckbox: PropTypes.bool.isRequired,
  setCountryId: PropTypes.func
};

AutoComplete.defaultProps = {
  setCountryId: () => {}
};

/* eslint no-use-before-define: ["error", { "variables": false }] */
const useStyles = makeStyles({
  input: {
    'minWidth': 360,

    '& .MuiInputBase-root': {
      'height': 59,
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
