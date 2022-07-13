import { Drawer, IconButton, Paper, Box, Typography } from '@mui/material';
import { ReactComponent as CloseIcon } from 'assets/closeIcon.svg';
import { Button } from 'shared';
import PropTypes from 'prop-types';

const AppDrawer = ({
  open,
  toggleDrawer,
  title,
  actionText,
  children,
  action,
  loading,
  disabled,
  drawerType
}) => {
  return (
    <Drawer
      sx={{ '& .MuiDrawer-paper': { maxWidth: '528px' } }}
      anchor="right"
      open={open}
      onClose={toggleDrawer}
      ModalProps={{
        keepMounted: false
      }}
    >
      <Box>
        <Paper sx={{ padding: 2 }} elevation={1}>
          <Box display="flex" justifyContent="space-between">
            <Typography fontWeight={500}>{title}</Typography>
            <IconButton onClick={toggleDrawer}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Paper>
      </Box>
      <Box
        sx={{ height: '100%' }}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box sx={{ padding: 2 }}>{children}</Box>
        <Box
          display="flex"
          justifyContent="flex-end"
          backgroundColor="primary.light"
          sx={{ padding: '16px 21px' }}
          mt="auto"
        >
          {drawerType === '' && (
            <Button
              type="submit"
              size="large"
              onClick={action}
              loading={loading}
              disabled={disabled}
            >
              {actionText}
            </Button>
          )}
          <Button size="large" onClick={toggleDrawer} sx={{ marginLeft: 1 }} variant="text">
            {drawerType ? 'close' : 'cancel'}
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

AppDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  actionText: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  action: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  drawerType: PropTypes.string,
  siteName: PropTypes.string,
  duration: PropTypes.string,
  field: PropTypes.string,
  dataToExport: PropTypes.shape([])
};

AppDrawer.defaultProps = {
  disabled: false,
  drawerType: '',
  siteName: '',
  duration: '',
  field: '',
  dataToExport: []
};

export default AppDrawer;
