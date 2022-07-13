import Box from "@mui/material/Box";
import { Link, Paper, Typography, Grid } from "@mui/material";
import { useState } from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import bookingService from "services/bookingService";
import { toast } from "react-hot-toast";
import { Spinner } from "../../shared";

const QuoteDetailsPage = () => {
  const { id } = useParams();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const [quoteData, setQuoteData] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const { data: quote, isLoading } = useQuery(
    [
      "quote",
      {
        id: id,
      },
    ],
    bookingService.getQuoteById,
    {
      onSuccess: (res) => {
        console.log(res.data);
        setQuoteData(res.data);
      },
      onError: (response) => {
        console.log("Response", response);
        // const errMsg = response.data.detail;
        toast.error("Quote not found");
        history.push("/admin/quotes");
      },
    }
  );

  return (
    <Box>
      <Spinner loading={isLoading}>
        <Typography variant="h3" component="h4">
          Quote Request
        </Typography>
        <Box>
          <Link href="/admin/quotes">
            <Typography variant="subtitle1" component="subtitle1">
              All Quotes
            </Typography>
          </Link>
        </Box>

        <Grid contaner>
          {quoteData.map((info) => (
            <h1>{info}</h1>
          ))}
        </Grid>
      </Spinner>
    </Box>
  );
};

export default QuoteDetailsPage;
