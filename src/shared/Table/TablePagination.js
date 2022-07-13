import React from 'react';
import { Pagination, Select, MenuItem, Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const TablePagination = ({ tableParams, setTableParams }) => {
  const handlePaginationChange = (event, value) => {
    setTableParams((prevParams) => {
      return {
        ...prevParams,
        pagination: {
          ...prevParams.pagination,
          pageNumber: value
        }
      };
    });
  };

  const handlePageSizeSelect = (event) => {
    setTableParams((prevParams) => {
      return {
        ...prevParams,
        pagination: {
          ...prevParams.pagination,
          pageSize: event.target.value
        }
      };
    });
  };

  return (
    <Box sx={{ padding: 1.5 }} display="flex" justifyContent="space-between" alignItems="center">
      <Typography variant="body2" color="grey.secondary">
        {`Showing ${
          tableParams?.pageNumber === 1
            ? 1
            : (tableParams?.pageNumber - 1) * tableParams?.pageSize + 1
        } to ${
          tableParams?.pageNumber === 1
            ? tableParams?.total
            : (tableParams?.pageNumber - 1) * tableParams?.pageSize + tableParams?.total
        } of ${tableParams?.total || 0}`}
      </Typography>
      <Box ml="auto" mr={2} />
      <Select
        value={tableParams?.pageSize}
        onChange={handlePageSizeSelect}
        id="page-size"
        sx={{
          'marginRight': 2,
          'border': 'none',
          '& .MuiOutlinedInput-notchedOutline': { border: 'none' }
        }}
      >
        <MenuItem value={10}>10 items</MenuItem>
        <MenuItem value={20}>20 items</MenuItem>
        <MenuItem value={30}>30 items</MenuItem>
      </Select>
      <Pagination
        shape="rounded"
        count={tableParams?.totalPages ?? 0}
        page={tableParams?.pageNumber}
        onChange={handlePaginationChange}
      />
    </Box>
  );
};

TablePagination.propTypes = {
  tableParams: PropTypes.oneOfType([PropTypes.object]).isRequired,
  setTableParams: PropTypes.func.isRequired
};

export default TablePagination;
