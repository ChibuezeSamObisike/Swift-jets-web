/* eslint-disable */
import {
  TableHead as AppTableHead,
  SvgIcon,
  TableCell,
  TableRow,
  TableSortLabel
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';

const SortIcon = (props) => {
  return (
    <SvgIcon sx={{ width: '12px', height: '12px' }} {...props} viewBox="0 0 6 10">
      <path
        d="m6.514 2.924-.528.527-1.98-1.974L4 12h-.75l.006-10.541-1.992 1.992-.528-.527L3.625.035l2.889 2.889Z"
        fill="#605E5C"
      />
    </SvgIcon>
  );
};

export const SortOrder = {
  ASC: 'asc',
  DESC: 'desc',
  DEF: false
};

const TableHead = ({ columns, order, orderBy, onSort }) => {
  const classes = useStyles({ orderBy });

  const handleSort = (property) => {
    return (event) => {
      onSort(event, property);
    };
  };

  return (
    <AppTableHead className={classes.tableHead}>
      <TableRow>
        {columns.map(({ dataIndex, title, sorter, width, align }, index) => {
          return (
            <TableCell
              key={dataIndex || index}
              // hideSortIcon={!sorter}
              align={align ?? 'left'}
              style={{ width }}
            >
              <TableSortLabel
                IconComponent={SortIcon}
                active={sorter && orderBy === dataIndex && !!order}
                hideSortIcon={!sorter}
                {...(order && {
                  direction: sorter && orderBy === dataIndex ? order : SortOrder.ASC
                })}
                classes={{
                  root: clsx(classes.sortLabelRoot, {
                    [classes.sortAscLabel]: sorter && order === 'asc'
                  })
                }}
                onClick={handleSort(dataIndex)}
              >
                {title}
              </TableSortLabel>
            </TableCell>
          );
        })}
      </TableRow>
    </AppTableHead>
  );
};

const useStyles = makeStyles((theme) => ({
  tableHead: {
    '& .MuiTableRow-head': {
      backgroundColor: theme.palette.secondary.dark,
      height: 43
    }
  },

  sortLabelRoot: {
    'display': 'flex',
    'alignItems': 'center',

    '& .MuiSvgIcon-root': {
      '&.MuiTableSortLabel-icon': {
        fontSize: 12,
        transform: 'rotate(0deg)',
        marginTop: 2,
        opacity: 1
      }
    },

    '&.MuiTableSortLabel-active': {
      'color': theme.palette.primary.main,

      '& .MuiSvgIcon-root': {
        color: `${theme.palette.primary.main} !important`
      }
    }
  },

  sortAscLabel: ({ orderBy }) => ({
    [`&[aria-label=${orderBy}]`]: {
      '& .MuiSvgIcon-root': {
        '&.MuiTableSortLabel-icon': {
          transform: 'rotate(180deg)'
        }
      }
    }
  })
}));

export default TableHead;
