import {Box, Grid, Paper} from "@mui/material";
import {homePageData} from "../../data/homepage";
import Typography from "@mui/material/Typography";
import Carousel from 'react-material-ui-carousel'
import BookingForm from "../../components/BookingForm/BookingForm";
import SectionOne from "../../components/HomePage/SectionOne";
import SectionTwo from "../../components/HomePage/SectionTwo";

const HomePage = () => {

    return (
        <>
            <Grid item xs={10}>
                <Carousel>
                    {
                        homePageData.hero.items.map(item => (
                            <Paper key={item.id} sx={{ textAlign: "center", position: "relative" }}>
                                <img src={item.image} alt="Home Page" className="hero-image"/>
                                <Box sx={{position: "absolute", bottom: "5%", left: "50%", transform: "translate(-50%, -50%)"}}>
                                    <Typography variant="h2" component="h2">

                                    </Typography>
                                </Box>
                            </Paper>
                        ))
                    }
                </Carousel>
            </Grid>

            <BookingForm />
            <SectionOne />
            <SectionTwo />
        </>
    )
}

export default HomePage;