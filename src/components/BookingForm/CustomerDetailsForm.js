import {Box, Dialog, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField} from "@mui/material";
import {useForm} from "react-hook-form";
import DialogTitle from '@mui/material/Dialog';

const CustomerDetailsForm = ({ booking_data }) => {
    const {register, handleSubmit} = useForm();



    return (
        <Dialog>
            <DialogTitle>Complete Booking Request</DialogTitle>



                <input type="submit"/>

        </Dialog>
    )
}

export default CustomerDetailsForm;