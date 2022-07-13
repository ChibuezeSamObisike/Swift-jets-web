import React, { useState } from "react";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { homePageData } from "../../data/homepage";
import { Button, Container, Paper, Stack, TextField } from "@mui/material";
import { useMutation } from "react-query";
import bookingService from "../../services/bookingService";
import Typography from "@mui/material/Typography";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { DatePicker } from "@mui/lab";
import { styled } from "@mui/material";
import { Grid } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
  firstname: yup.string().required(),
  lastname: yup.string().required(),
  phone: yup.string().required(),
  flight_to: yup.string().required(),
  flight_from: yup.string().required(),
  num_of_passengers: yup.string().required(),
  category: yup.string().required(),
  flight_date: yup.string().required(),
  pets: yup.string().required(),
});

const BookingForm = () => {
  const [showContactForm, setShowContactForm] = useState(false);
  const [flightDate, setFlightDate] = React.useState(new Date());
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { mutate, isLoading } = useMutation(
    bookingService.requestNewQuotation,
    {
      onSuccess: ({ data }) => {
        toast.success(
          "Quote request successful, we will get back to you shortly."
        );
        console.log(data);
        history.push("/");
      },
      onError: ({ response }) => {
        const errMsg = response.data.detail;
        toast.error(errMsg);
      },
    }
  );

  const handleSubmitBookingData = (data) => {
    mutate(data);
  };

  const handleClickOpen = (data) => {
    setShowContactForm(true);
  };

  const MyButton = styled(Button)({
    color: "white",
    backgroundColor: "#5C0632",
    padding: "10px 20px",
    borderRadius: "25px",
    display: "block",
    width: "auto",
    marginTop: "20px",
    float: "right",
    marginRight: "20px",

    "&:hover": {
      backgroundColor: "#5C0632",
      opacity: 0.6,
    },

    "& > .MuiBox-root": {},
  });

  const fieldStyle = {
    width: "400px",
    border: "2px solid #5C0632",
    borderRadius: "15px",
    paddingY: "5px",
    paddingLeft: "30px",
    margin: "20px",
    "&:hover": {
      backgroundColor: "#ffc2e4",
      margin: "30px 0 0 30px ",
    },
  };

  return (
    <Container>
      <Box
        padding={5}
        sx={{
          border: "1px solid #f7f5f5",
          marginY: "15px",
          bgcolor: "#f7f5f5",
          borderRadius: "15px",
          display: "flex",
          flexDirection: "row",
          marginX: "30px",
        }}
      >
        <form onSubmit={handleSubmit(handleSubmitBookingData)}>
          <Grid container justifyContent="center" spacing={14}>
            <Grid item xs={8} md={6}>
              <Paper sx={fieldStyle}>
                <TextField
                  name="flight_from"
                  {...register("flight_from")}
                  select
                  required
                  label="Flight From"
                  SelectProps={{ native: true }}
                  helperText="Where are you flying from"
                  variant="standard"
                >
                  {homePageData.bookingForm.terminals.map((terminal) => (
                    <option key={terminal.id} value={terminal.city}>
                      {terminal.city}
                    </option>
                  ))}
                </TextField>
                <Typography variant="p" component="p">
                  {errors.flight_from?.message}
                </Typography>
              </Paper>

              <Paper sx={fieldStyle}>
                <TextField
                  {...register("flight_to")}
                  select
                  required
                  label="Flight To"
                  SelectProps={{ native: true }}
                  helperText="Select destination"
                  variant="standard"
                >
                  {homePageData.bookingForm.terminals.map((terminal) => (
                    <option key={terminal.id} value={terminal.city}>
                      {terminal.city}
                    </option>
                  ))}
                </TextField>
                <Typography variant="p" component="p">
                  {errors.flight_to?.message}
                </Typography>
              </Paper>

              <Paper sx={fieldStyle}>
                <TextField
                  {...register("category")}
                  select
                  required
                  label="Flight Category"
                  SelectProps={{ native: true }}
                  helperText="What is your flight category"
                  variant="standard"
                >
                  {homePageData.bookingForm.categories.map((category) => (
                    <option key={category.id} value={category.value}>
                      {category.name}
                    </option>
                  ))}
                </TextField>
                <Typography variant="p" component="p">
                  {errors.category?.message}
                </Typography>
              </Paper>

              <Paper sx={fieldStyle}>
                <TextField
                  {...register("num_of_passengers")}
                  type="number"
                  required
                  label="Passengers"
                  SelectProps={{ native: true }}
                  helperText="Number of Passengers"
                  variant="standard"
                />
                <Typography variant="p" component="p">
                  {errors.num_of_passengers?.message}
                </Typography>
              </Paper>

              <Paper sx={fieldStyle}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    {...register("flight_date")}
                    value={flightDate}
                    onChange={(newDate) => {
                      setFlightDate(newDate);
                    }}
                    renderInput={(props) => <TextField required {...props} />}
                    label="Departure Date"
                    inputFormat="yyyy-MM-dd"
                  />
                </LocalizationProvider>
              </Paper>
            </Grid>

            <Grid item xs={8} md={6}>
              <Paper sx={fieldStyle}>
                <TextField
                  {...register("firstname")}
                  type="text"
                  required
                  label="Firstname"
                  helperText="Firstname"
                  variant="standard"
                />
                <Typography variant="p" component="p">
                  {errors.firstname?.message}
                </Typography>
              </Paper>
              <Paper sx={fieldStyle}>
                <TextField
                  {...register("lastname")}
                  type="text"
                  required
                  label="Lastname"
                  helperText="Lastname"
                  variant="standard"
                />
                <Typography variant="p" component="p">
                  {errors.lastname?.message}
                </Typography>
              </Paper>

              <Paper sx={fieldStyle}>
                <TextField
                  {...register("email")}
                  type="email"
                  required
                  label="Email Address"
                  helperText="Email Address"
                  variant="standard"
                />
                <Typography variant="p" component="p">
                  {errors.email?.message}
                </Typography>
              </Paper>

              <Paper sx={fieldStyle}>
                <TextField
                  {...register("phone")}
                  type="text"
                  required
                  label="Phone"
                  helperText="Phone"
                  variant="standard"
                />
                <Typography variant="p" component="p">
                  {errors.phone?.message}
                </Typography>
              </Paper>

              <Paper sx={fieldStyle}>
                <TextField
                  {...register("pets")}
                  type="number"
                  required
                  label="Number of Pets"
                  SelectProps={{ native: true }}
                  helperText="Number of Passengers"
                  variant="standard"
                />
                <Typography variant="p" component="p">
                  {errors.pets?.message}
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          <MyButton type="submit">Submit</MyButton>
        </form>
      </Box>
    </Container>
  );
};

export default BookingForm;
