import { Card, CardContent, CardHeader, IconButton, SvgIcon, Typography, Box } from '@mui/material';
import { ReactComponent as CloseIcon } from 'assets/close.svg';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

const readingSymbol = {
  'fuel level': 'L',
  'temperature': 'º',
  'voltage': 'V',
  'power factor': '',
  'RPM': 'rpm',
  'run hour': 'h',
  'current': 'A',
  'energy': 'j'
};

const AlertCard = ({ severity, title, site, level, date }) => {
  const shadowMapping = {
    low: '0px 1px 4px rgba(0, 0, 0, 0.15), -2px 0px 0px #458FFF',
    mild: '0px 1px 4px rgba(0, 0, 0, 0.15), -2px 0px 0px #FFC453',
    critical: '0px 1px 4px rgba(0, 0, 0, 0.15), -2px 0px 0px #FF5454'
  };

  const cardStyle = {
    'maxWidth': 346,
    'boxShadow': shadowMapping[severity.toLowerCase()],
    '& .MuiCardHeader-root': {
      padding: '8px 16px 4px 16px'
    },

    '& .MuiCardContent-root': {
      paddingTop: 0
    },

    '& .MuiCardHeader-title': {
      fontSize: 14,
      fontWeight: 500
    }
  };

  const renderLocation = (
    <Box component="span" sx={{ display: 'inline-block', mx: '2px', fontWeight: 500 }}>
      {site}
    </Box>
  );

  return (
    <Card sx={cardStyle}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <SvgIcon
              component={CloseIcon}
              viewBox="0 0 12 12"
              fontSize="small"
              sx={{ fontSize: 12 }}
            />
          </IconButton>
        }
        title={severity}
      />
      <CardContent>
        <Typography variant="body2" sx={{ fontWeight: 400 }}>
          <Box sx={{ textTransform: 'capitalize' }} component="span">
            {title}
          </Box>{' '}
          for {renderLocation} is at {parseInt(level, 10).toFixed(1)}
          {readingSymbol[title]}
        </Typography>
        <Typography sx={{ fontWeight: 400 }} variant="caption">{`${format(
          new Date(date),
          'eee dd MMM'
        )} | ${format(new Date(date), 'h:mm bbb')}`}</Typography>
      </CardContent>
    </Card>
  );
};

export default AlertCard;

AlertCard.propTypes = {
  severity: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  site: PropTypes.string.isRequired,
  level: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired
};
