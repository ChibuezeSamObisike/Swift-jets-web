/* eslint-disable */

import {
  Table as MuiTable,
  TableBody,
  TableRow,
  Paper,
  TableCell,
  styled,
  Button,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import ListIcon from "@mui/icons-material/List";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchInput from "shared/SearchInput";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ClearIcon from "@mui/icons-material/Clear";
import TableHead, { SortOrder } from "./TableHead";
import TablePagination from "./TablePagination";

const Table = ({
  dataSource,
  columns,
  paginationPosition,
  tableParams,
  setTableParams,
  onRow,
  toggleMap,
  isDisplayMap,
  loading,
  setOpenFilters,
  hasFilter,
  clearFilter,
  clearFilterBtn,
}) => {
  const [order, setOrder] = useState(SortOrder.DEF);
  const [orderBy, setOrderBy] = useState(null);

  const useStyles = makeStyles({
    disabledBtn: {
      backgroundColor: "#32D17D !important",
      color: "white !important",
      cursor: "pointer !important",
    },
  });

  const classes = useStyles();

  const dataKeys = useMemo(() => {
    return dataSource.map((item, index) => item.id || index);
  }, [dataSource]);

  const sortMapping = {
    asc: "+",
    desc: "-",
  };

  const handleSort = (_e, property) => {
    const isDesc = orderBy === property && order === SortOrder.DESC;
    // eslint-disable-next-line
    const changedOrder = isDesc
      ? SortOrder.ASC
      : order === SortOrder.ASC
      ? SortOrder.DEF
      : SortOrder.DESC;
    setOrder(changedOrder);
    setOrderBy(property);

    setTableParams((prevParams) => ({
      ...prevParams,
      sort: changedOrder ? `${sortMapping[changedOrder]}${property}` : "",
    }));
  };

  const handleSearch = (value) => {
    setTableParams((prevParams) => {
      return {
        ...prevParams,
        search: value,
      };
    });
  };

  const renderCellData = (column, row, index) => {
    if (column.render)
      return column.render(row[column?.dataIndex], row, index) ?? null;
    return row[column?.dataIndex] ?? null;
  };

  const handleRowClick = (row, rowIndex) => {
    return (event) => {
      onRow?.(row, rowIndex)?.onClick(event);
    };
  };

  const renderDataItems = () => {
    return dataSource.map((row, rowIndex) => {
      const key = dataKeys[rowIndex];

      return (
        <TableRow hover key={key} onClick={handleRowClick(row, rowIndex)}>
          {columns.map((column) => (
            <TableCell
              key={column.dataIndex}
              align={column.align}
              style={{ width: column.width }}
            >
              {renderCellData(column, row, rowIndex)}
            </TableCell>
          ))}
        </TableRow>
      );
    });
  };

  const renderTablePagination = () => (
    <TablePagination
      tableParams={tableParams}
      setTableParams={setTableParams}
    />
  );

  const renderTableHeader = () => (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      height="77px"
      background="background.paper"
      sx={{ padding: "8px 16px" }}
    >
      <Box display="flex" justifyContent="space-between">
        <SearchInput
          searchTerm={tableParams.search}
          setSearchTerm={handleSearch}
        />
        {hasFilter && (
          <Box display="flex" justifyContent="space-between">
            <Button
              sx={{ marginLeft: "24px" }}
              size="large"
              onClick={() => setOpenFilters(true)}
            >
              <FilterAltIcon sx={{ marginRight: "10px" }} /> Filter
            </Button>
            <Button
              sx={{
                marginLeft: "15px",
                display: clearFilterBtn ? "flex" : "none",
              }}
              size="large"
              onClick={clearFilter}
            >
              <ClearIcon /> Clear Filter
            </Button>
          </Box>
        )}
      </Box>
      {paginationPosition === "footer" ? (
        <Box display="flex" alignItems="center">
          <Button
            onClick={toggleMap}
            variant={`${isDisplayMap ? "text" : "contained"}`}
            color="primary"
            classes={{ disabled: classes.disabledBtn }}
            disabled={!isDisplayMap}
          >
            <ListIcon />
          </Button>
          <Button
            onClick={toggleMap}
            sx={{ marginLeft: 2 }}
            variant={`${isDisplayMap ? "contained" : "text"}`}
            color="primary"
          >
            <LocationOnIcon />
          </Button>
        </Box>
      ) : (
        renderTablePagination()
      )}
    </Box>
  );

  return (
    <Box>
      <Paper square>
        {renderTableHeader()}
        {!loading ? (
          <TableWrap elevation={1} square>
            {dataSource.length === 0 ? (
              <Box
                height="200px"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Typography textAlign="center">No data found</Typography>
              </Box>
            ) : (
              <MuiTable>
                <TableHead
                  columns={columns}
                  order={order}
                  orderBy={orderBy}
                  onSort={handleSort}
                />

                <TableBody>{renderDataItems()}</TableBody>
              </MuiTable>
            )}
            {paginationPosition === "footer" && renderTablePagination()}
          </TableWrap>
        ) : (
          <Box
            height="400px"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress />
          </Box>
        )}
      </Paper>
    </Box>
  );
};

const TableWrap = styled(Paper)(() => ({
  "& .MuiTableCell-body": {
    cursor: "pointer",
  },
}));

Table.propTypes = {
  dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  paginationPosition: PropTypes.oneOf(["header", "footer"]),
  tableParams: PropTypes.oneOfType([PropTypes.object]).isRequired,
  setTableParams: PropTypes.func.isRequired,
  onRow: PropTypes.func,
  toggleMap: PropTypes.func,
  isDisplayMap: PropTypes.bool,
  loading: PropTypes.bool,
  setOpenFilters: PropTypes.func.isRequired,
  hasFilter: PropTypes.bool,
  clearFilter: PropTypes.func,
};

Table.defaultProps = {
  paginationPosition: "footer",
  onRow: () => {},
  toggleMap: () => {},
  clearFilter: () => {},
  isDisplayMap: false,
  loading: false,
  hasFilter: false,
};

export default Table;
