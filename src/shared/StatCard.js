import { Card, CardContent, CardHeader, SvgIcon, Typography, Box, Avatar } from '@mui/material';
import PropTypes from 'prop-types';
import { ReactComponent as FuelIcon } from 'assets/fuel.svg';
import { ReactComponent as TemperatureIcon } from 'assets/temperature.svg';
import { ReactComponent as RunHourIcon } from 'assets/runHour.svg';
import { ReactComponent as RPMIcon } from 'assets/rpm.svg';
import { ReactComponent as CurrentIcon } from 'assets/current.svg';
import { ReactComponent as VoltageIcon } from 'assets/voltage.svg';

const StatCard = ({ title, value, averageValue }) => {
  const cardStyle = {
    'minWidth': 230,
    'minHeight': 147,
    'boxShadow': '0px 0.3px 0.9px rgba(0, 0, 0, 0.1), 0px 1.6px 3.6px rgba(0, 0, 0, 0.13)',
    'borderRadius': '4px',
    'padding': '16px',

    '& .MuiCardHeader-root': { padding: '0px' },

    '& .MuiCardContent-root': {
      padding: '12px 0px 0px 0px'
    },

    '& .MuiCardHeader-title': {
      fontSize: 16,
      fontWeight: 400,
      lineHeight: '24px',
      color: '#6B6C7E'
    }
  };

  const unitMapping = {
    'fuel level': 'litres',
    'temperature': 'ºC',
    'rpm': 'RPM',
    'current': 'A',
    'voltage': 'V',
    'run-hour': 'hours'
  };

  const icons = {
    'fuel level': FuelIcon,
    'temperature': TemperatureIcon,
    'rpm': RPMIcon,
    'current': CurrentIcon,
    'voltage': VoltageIcon,
    'run-hour': RunHourIcon
  };

  const renderStatUnit = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', fontWeight: 400, fontSize: 16, color: '#6B6C7E' }}
    >
      {unitMapping[title.toLowerCase()]}
    </Box>
  );

  const formatNum = (num) => {
    const rounded = Math.round(num);
    return new Intl.NumberFormat().format(rounded);
  };

  return (
    <Card sx={cardStyle}>
      <CardHeader
        avatar={
          <Avatar variant="square" sx={{ backgroundColor: 'white', padding: 0, margin: '-7px' }}>
            <SvgIcon
              component={icons[title.toLowerCase()]}
              viewBox="0 0 32 32"
              fontSize="small"
              sx={{ fontSize: 32 }}
            />
          </Avatar>
        }
        title={title}
      />
      <CardContent>
        <Typography variant="h2">
          {formatNum(value)} {renderStatUnit}
        </Typography>
        <Typography sx={{ fontWeight: 400, color: '#6B6C7E' }} variant="body1">
          {`${formatNum(averageValue)} ${unitMapping[title.toLowerCase()]} ${
            title === 'Run-hour' ? '' : 'average'
          } yesterday`}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StatCard;

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  averageValue: PropTypes.number.isRequired
};
