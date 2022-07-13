import { Grid, Paper, Container } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { AccessTime } from "@mui/icons-material";
import { Rating } from "@mui/lab";
import { format } from "date-fns";
import Carousel from "react-material-ui-carousel";
import { Button } from "../../shared";

const JetCard = ({ item, handleAddOrRemoveFlight }) => {
  return (
    <Grid
      item
      xs={12}
      md={4}
      lg={3}
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "10px",
        borderRadius: "10px",
      }}
    >
      <Container sx={{ padding: "40px" }}>
        <Paper elevation={3} sx={{ borderRadius: "10px", padding: "20px" }}>
          <img
            src={item?.images[0]}
            alt="Ocean"
            className="img"
            style={{ width: "100%", borderRadius: "10px" }}
          />
          {/* <Carousel>
            {item?.images.map((index, imageUrl) => (
              <img key={index} src={imageUrl} alt="Jet" className="img" />
            ))}
          </Carousel> */}
          <Box paddingX={1}>
            <Typography
              variant="subtitle1"
              component="h2"
              sx={{ fontWeight: "bold" }}
            >
              {item?.jet_code.toUpperCase()}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="body2" component="p" marginLeft={0.5}>
                From: {item?.flight_from}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="body2" component="p" marginLeft={0.5}>
                To: {item?.flight_to}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <AccessTime sx={{ width: 12.5 }} />
              <Typography variant="body2" component="p" marginLeft={0.5}>
                Flight Date: {item?.flight_date?.split("T")[0]}
              </Typography>
            </Box>
            {/* <Box sx={{ display: "flex", alignItems: "center" }} marginTop={3}> */}
            {/* <Rating name="read-only" size="small" value={5} precision={0.5} /> */}
            {/* <Typography variant="body1" component="p" marginLeft={0.5}>
                {5}
              </Typography> */}
            <Typography
              variant="body1"
              component="p"
              sx={{ marginTop: "5px", marginBottom: "3px" }}
            >
              Capacity: {item?.max_passengers}
            </Typography>
            {/* </Box> */}
            <Box variant="h6" component="h3" marginTop={0}>
              From ${item?.price}
            </Box>

            <Box sx={{ marginTop: "10px" }}>
              <Button
                onClick={() => handleAddOrRemoveFlight(item.id, "add")}
                sx={{ marginRight: "5px" }}
              >
                Add
              </Button>
              <Button
                type="reset"
                onClick={() => handleAddOrRemoveFlight(item.id, "remove")}
              >
                Remove
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Grid>
  );
};

export default JetCard;
