/* eslint-disable */
import AddIcon from "@mui/icons-material/Add";
import {
  Grid,
  Typography,
  Box,
  Avatar,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Container,
} from "@mui/material";
// import UserForm from 'components/UserForm';
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Button, Table, Spinner } from "../../shared";
import { ReactComponent as MoreIcon } from "assets/moreIcon.svg";
import toast from "react-hot-toast";
import bookingService from "services/bookingService";
import useMenuAnchor from "hooks/useMenuAnchoruseMenuAnchor";
import SuggestFlightForm from "../../components/SuggestFlightForm/SuggestFlightForm";
import { useHistory } from "react-router-dom";

const QuoteListPage = () => {
  const history = useHistory();

  const [open, setOpen] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const { anchorEl, openMenu, toggleMenu, handleClose } = useMenuAnchor();
  const [tableParams, setTableParams] = useState({
    search: "",
    pageSize: 10,
    pageNumber: 1,
  });
  const [selected, setSelected] = useState({});
  const [editing, setEditing] = useState(false);

  useQuery(
    [
      "quotes",
      {
        search: tableParams.search,
        pageNumber: tableParams.pageNumber,
        pageSize: tableParams.pageSize,
      },
    ],
    bookingService.getQuotes,
    {
      onSuccess: (data) => {
        const {
          results,
          total,
          current_page: currentPage,
          page_size: pageSize,
          total_pages: totalPages,
        } = data.data;
        setDataSource(results);
        setTableParams((prevParams) => ({
          ...prevParams,
          pageNumber: currentPage,
          pageSize,
          total,
          totalPages,
        }));
      },
    }
  );

  const toggleDrawer = () => setOpen(!open);

  const handleEdit = () => {
    handleClose();
    setEditing(true);
    toggleDrawer();
  };

  const handleViewQuoteDetails = () => {
    console.log(selected);
    if (selected) {
      history.push(`/admin/quotes/${selected.id}`);
    }
  };

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(bookingService.editQuote, {
    onSuccess: () => {
      toast.success("Successful");
      queryClient.invalidateQueries("quotes").then((r) => {});
    },
    onError: (e) => toast.error(e.message),
  });

  // const handleActivate = (value) => {
  //     mutate({ id: selected.id, payload: { is_active: value } });
  //     handleClose();
  // };

  const columns = [
    {
      title: "Name",
      dataIndex: "firstname",
      sorter: true,
      render: (text, { firstname, lastname, email }) =>
        renderName(firstname, lastname, email),
    },
    {
      title: "Phone number",
      dataIndex: "phone",
      sorter: true,
    },
    {
      title: "Category",
      dataIndex: "category",
      sorter: true,
    },
    {
      title: "From",
      dataIndex: "flight_from",
      sorter: true,
    },
    {
      title: "To",
      dataIndex: "flight_to",
      sorter: true,
    },
    {
      title: "Flight Date",
      dataIndex: "flight_date",
      sorter: true,
    },
    {
      title: "Created at",
      dataIndex: "created_at",
      render: (text, record) =>
        renderStatus(
          record,
          anchorEl,
          openMenu,
          toggleMenu,
          handleClose,
          handleEdit,
          handleViewQuoteDetails,
          setSelected,
          selected
        ),
    },
  ];

  return (
    <Box>
      <Container>
        <Spinner loading={isLoading}>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Typography variant="h6">{`Quotes (${
              tableParams?.total ?? ""
            })`}</Typography>
            <Button
              startIcon={<AddIcon />}
              sx={{ padding: "10px 16px", marginTop: "10px" }}
              ma
              onClick={() => {
                toggleDrawer();
                setEditing(false);
              }}
            >
              New Quote
            </Button>
          </Grid>

          <Box mt="24px">
            <Table
              paginationPosition="header"
              tableParams={tableParams}
              setTableParams={setTableParams}
              dataSource={dataSource}
              columns={columns}
            />
          </Box>
        </Spinner>

        <SuggestFlightForm
          open={open}
          toggleDrawer={toggleDrawer}
          selected={selected}
          editing={editing}
          setEditing={setEditing}
        />
      </Container>
    </Box>
  );
};

export default QuoteListPage;

const renderName = (firstname, lastname, email) => {
  const firstName = firstname ?? "";
  const lastName = lastname ?? "";
  return (
    <Box display="flex" alignItems="center">
      <Avatar
        sx={{
          backgroundColor: `#4F6BED`,
          width: 24,
          height: 24,
          fontSize: "10px",
          textTransform: "capitalize",
        }}
      >
        {`${firstName[0] ?? email[0]} ${lastName[0] ?? email[1]}`}
      </Avatar>
      <Box ml={1.2}>
        <Typography
          fontSize="14px"
          color="text.primary"
          fontWeight={400}
          sx={{ textTransform: "capitalize" }}
        >
          {`${firstName} ${lastName}`}
        </Typography>
        <Typography fontSize="12px" color="text.secondary">
          {email}
        </Typography>
      </Box>
    </Box>
  );
};

const renderStatus = (
  record,
  anchorEl,
  openMenu,
  toggleMenu,
  handleClose,
  handleEdit,
  handleViewQuoteDetails,
  setSelected,
  handleActivate,
  selected
) => {
  // const { verified, is_active } = record;
  // let status = 'Pending';
  // switch (true) {
  //     case verified && is_active:
  //         status = 'Active';
  //         break;
  //     case !is_active:
  //         status = 'Inactive';
  //         break;
  //     default:
  //         break;
  // }

  const bgColor = {
    pending: "rgba(255, 200, 10, 0.2)",
    active: "rgba(95, 210, 85, 0.2)",
    inactive: "#D2D0CE",
  };

  const textColor = {
    pending: "#797775",
    active: "#107C10",
    inactive: "#605E5C",
  };

  const style = {
    borderRadius: "8px",
    padding: "4px 8px 4px 8px",
    backgroundColor: bgColor[status.toLowerCase()],
    color: textColor[status.toLowerCase()],
    textTransform: "capitalize",
    fontSize: "12px",
    fontWeight: 400,
    marginRight: "20px",
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      ml="-28px"
      mr="-25px"
      justifyContent="center"
    >
      <Chip label={status.toLowerCase()} component="span" sx={style} />
      <IconButton
        onClick={(e) => {
          setSelected(record);
          toggleMenu(e);
        }}
      >
        <MoreIcon />
      </IconButton>

      <Menu open={openMenu} onClose={handleClose} anchorEl={anchorEl}>
        <MenuItem onClick={() => handleViewQuoteDetails()}>
          View Details
        </MenuItem>
        <MenuItem onClick={() => handleEdit()}>Suggest Jets</MenuItem>
        <MenuItem onClick={() => handleEdit()}>Send Invoice</MenuItem>
      </Menu>
    </Box>
  );
};

const renderList = (list) => {
  return (
    <>
      {list &&
        list.map((item) => {
          return (
            <Typography
              mr={1}
              component="span"
              fontSize="14px"
              color="text.primary"
            >
              {item.name} {list.length > 1 && ","}
            </Typography>
          );
        })}
    </>
  );
};
