import { TextField, styled, InputAdornment, SvgIcon } from '@mui/material';
import { ReactComponent as SearchIcon } from 'assets/searchIcon.svg';
import PropTypes from 'prop-types';

const CustomisedInput = styled(TextField)({
  'width': 360,

  '& .MuiOutlinedInput-root': {
    'height': 45,
    'borderRadius': 8,
    'fontSize': 16,
    'color': '#6B6C7E',

    '& .MuiOutlinedInput-input': {
      padding: '11px 14px'
    }
  },

  '& .MuiSvgIcon-root': {
    marginRight: 14
  }
});

const SearchInput = ({ searchTerm, setSearchTerm, ...rest }) => {
  return (
    <CustomisedInput
      type="search"
      variant="outlined"
      placeholder="Search"
      value={searchTerm}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SvgIcon
              component={SearchIcon}
              viewBox="0 0 25 25"
              fontSize="small"
              sx={{ fontSize: 25 }}
            />
          </InputAdornment>
        )
      }}
      onChange={({ target }) => setSearchTerm(target.value)}
      {...rest}
    />
  );
};

export default SearchInput;

SearchInput.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired
};
