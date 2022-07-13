import {Grid, Stack, Typography} from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, AutoComplete } from 'shared';
import PropTypes from 'prop-types';
import AppDrawer from 'shared/AppDrawer';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import toast from 'react-hot-toast';
import {useParams} from "react-router-dom";
import {useState} from "react";
import jetService from "../../services/jetService";
import JetCard from "../Jets/JetCard";
import bookingService from "../../services/bookingService";

const schema = yup.object().shape({
    flight_suggestions: yup.array().required('Flight array is required'),
});

const SuggestFlightForm = ({ open, toggleDrawer, selected, editing, setEditing }) => {
    const queryClient = useQueryClient();
    const { id } = useParams();
    const [jetsData, setJetsData] = useState([]);
    const [suggestedFlights, setSuggestedFlights] = useState([]);

    const { control, handleSubmit, setValue, reset } = useForm();

    useQuery(['suggestions', { quote_id: selected.id }], jetService.getJetSuggestionByQuoteId, {
        enabled: editing,
        onSuccess: ({ data }) => {
            setJetsData(data.data);
        }
    });

    const resetForm = () => {
        reset({
            flight_suggestions: ''
        });
    };

    const handleAddOrRemoveFlight = (id, action) => {
        if(action === 'add'){
            if(!suggestedFlights.includes(id)){
                setSuggestedFlights(arr => [...arr, id]);
            }
        } else {
            let index = suggestedFlights.indexOf(id);
            if(index > -1){
                suggestedFlights.splice(index, 1);
                let newArr = suggestedFlights;
                setSuggestedFlights(newArr);
            }
        }
        console.log(suggestedFlights);
    }


    const { mutate, isLoading } = useMutation(bookingService.addFlightSuggestions, {
        onSuccess: () => {
            toggleDrawer();
            toast.success('Flight suggestions added successfully');
        },
        onError: (e) => toast.error(e.message)
    });

    // const { mutate: edit, isLoading: loading } = useMutation(jetService.editJet, {
    //     onSuccess: () => {
    //         toggleDrawer();
    //         toast.success('Jet edited successfully');
    //         queryClient.invalidateQueries('jets').then(r => {});
    //         resetForm();
    //         setEditing(false);
    //     },
    //     onError: (e) => toast.error(e.message)
    // });

    const onSubmit = (values) => {
        mutate({ id: selected.id, payload: values });
    };


    return (
        <AppDrawer
            open={open}
            title={editing ? 'Edit Jet' : 'New Jet'}
            actionText={editing ? 'Edit' : 'Create'}
            toggleDrawer={() => {
                toggleDrawer();
                resetForm();
                setEditing(false);
            }}
            action={handleSubmit(onSubmit)}
            loading={isLoading}
        >
            <Grid container spacing={2}>
                {
                    jetsData.map(item => <JetCard key={item.id} item={item} handleAddOrRemoveFlight={handleAddOrRemoveFlight} />)
                }
            </Grid>

            <form>
                <Typography>Jet Lists</Typography>
            </form>


        </AppDrawer>
    );
};

export default SuggestFlightForm;

SuggestFlightForm.propTypes = {
    toggleDrawer: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selected: PropTypes.shape({ id: PropTypes.string }).isRequired,
    setEditing: PropTypes.func.isRequired,
    editing: PropTypes.bool.isRequired
};
