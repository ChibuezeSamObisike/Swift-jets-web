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
} from "@mui/material";
// import UserForm from 'components/UserForm';
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Button, Table, Spinner } from "../../shared";
import { ReactComponent as MoreIcon } from "assets/moreIcon.svg";
import toast from "react-hot-toast";
import useMenuAnchor from "hooks/useMenuAnchoruseMenuAnchor";
import jetService from "services/jetService";
import JetForm from "components/JetForm/JetForm";
import JetCard from "components/Jets/JetCard";

const JetListPage = () => {
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
      "jets",
      {
        search: tableParams.search,
        pageNumber: tableParams.pageNumber,
        pageSize: tableParams.pageSize,
      },
    ],
    jetService.getJets,
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

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(jetService.editJet, {
    onSuccess: () => {
      toast.success("Successful");
      queryClient.invalidateQueries("jets").then((r) => {});
    },
    onError: (e) => toast.error(e.message),
  });

  // const handleActivate = (value) => {
  //     mutate({ id: selected.id, payload: { is_active: value } });
  //     handleClose();
  // };

  const columns = [
    {
      title: "Jet ID",
      dataIndex: "jet_code",
      sorter: true,
      // render: (text, { firstname, lastname, email }) => renderName(firstname, lastname, email)
    },
    {
      title: "No of Seat",
      dataIndex: "max_passengers",
      sorter: true,
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: true,
    },
    {
      title: "From",
      dataIndex: "flight_from",
      sorter: true,
      render: (text, { jet, flight_date }) =>
        renderJetTerminal(jet, flight_date),
    },
    {
      title: "Images",
      dataIndex: "images",
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
          setSelected,
          // handleActivate,
          selected
        ),
    },
  ];

  return (
    <Box>
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
            sx={{ padding: "10px 16px" }}
            onClick={() => {
              toggleDrawer();
              setEditing(false);
            }}
          >
            New Jet
          </Button>
        </Grid>

        <Box mt="24px">
          {/* <Table
                        paginationPosition="header"
                        tableParams={tableParams}
                        setTableParams={setTableParams}
                        dataSource={dataSource}
                        columns={columns}
                    /> */}

          <Grid container>
            {dataSource &&
              dataSource.map((item) => <JetCard item={item} key={item.id} />)}
          </Grid>
        </Box>
      </Spinner>
      <JetForm
        open={open}
        toggleDrawer={toggleDrawer}
        selected={selected}
        editing={editing}
        setEditing={setEditing}
      />
    </Box>
  );
};

export default JetListPage;

const renderJetTerminal = (jet, flight_date) => {
  return (
    <Box ml={1.2}>
      <Typography
        fontSize="14px"
        color="text.primary"
        fontWeight={400}
        sx={{ textTransform: "capitalize" }}
      >
        {jet?.city}
      </Typography>
      <Typography fontSize="12px" color="text.secondary">
        {flight_date}
      </Typography>
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
        <MenuItem onClick={() => handleEdit()}>Edit</MenuItem>
        <MenuItem onClick={() => handleEdit()}>Delete</MenuItem>
        {/*<MenuItem onClick={() => handleActivate(!selected.is_active)}>*/}
        {/*    {selected?.is_active ? 'Deactivate' : 'Activate'}*/}
        {/*</MenuItem>*/}
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
