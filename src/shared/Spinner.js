import { CircularProgress, Box } from "@mui/material";
import PropTypes from "prop-types";

const Spinner = ({ loading, children }) => {
  return (
    <Box>
      {loading ? (
        <CircularProgress
          size={30}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      ) : (
        children
      )}
    </Box>
  );
};

export default Spinner;

Spinner.propTypes = {
  loading: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};
