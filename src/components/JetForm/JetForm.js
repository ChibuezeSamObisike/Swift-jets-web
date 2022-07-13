import { Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, AutoComplete } from "shared";
import PropTypes from "prop-types";
import AppDrawer from "shared/AppDrawer";
import { useMutation, useQuery, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import jetService from "../../services/jetService";

const schema = yup.object().shape({
  jet_code: yup.string().required("Jet name is required"),
  flight_date: yup.string().required("Flight date is required"),
  max_passengers: yup.number().required("Max capacity is required"),
  price: yup.number().required("Price is required"),
  flight_from: yup.string().required("Flight from is required"),
  flight_to: yup.string().required("Flight to is required"),
});

const JetForm = ({ open, toggleDrawer, selected, editing, setEditing }) => {
  const { register, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      jet_code: "",
      flight_date: "",
      max_passengers: "",
      price: "",
      flight_from: "",
      flight_to: "",
    },
    resolver: yupResolver(schema),
  });

  useQuery(["jet", { id: selected.id }], jetService.getJetById, {
    enabled: editing,
    onSuccess: ({ data }) => {
      const {
        jet_code,
        flight_date,
        max_passengers,
        price,
        flight_from,
        flight_to,
      } = data;
      setValue("jet_code", jet_code);
      setValue("flight_date", flight_date);
      setValue("max_passengers", max_passengers);
      setValue("price", price);
      setValue("flight_from", flight_from);
      setValue("flight_to", flight_to);
    },
  });

  const resetForm = () => {
    reset({
      jet_code: "",
      flight_date: "",
      max_passengers: "",
      price: "",
      flight_from: "",
      flight_to: "",
    });
  };

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(jetService.addNewJet, {
    onSuccess: () => {
      toggleDrawer();
      toast.success("Jet created successfully");
      queryClient.invalidateQueries("jets").then((r) => {});
      resetForm();
    },
    onError: (e) => toast.error(e.message),
  });

  const { mutate: edit, isLoading: loading } = useMutation(jetService.editJet, {
    onSuccess: () => {
      toggleDrawer();
      toast.success("Jet edited successfully");
      queryClient.invalidateQueries("jets").then((r) => {});
      resetForm();
      setEditing(false);
    },
    onError: (e) => toast.error(e.message),
  });

  const onSubmit = (values) => {
    if (editing) {
      edit({ id: selected.id, payload: values });
    } else {
      mutate(values);
    }
  };

  const terminalList = [
    { value: "LAGOS", label: "Lagos" },
    { value: "ABUJA", label: "Abuja" },
    { value: "PORT HARCOURT", label: "Port Harcourt" },
  ];

  // TODO: Handle form reset

  return (
    <AppDrawer
      open={open}
      title={editing ? "Edit Jet" : "New Jet"}
      actionText={editing ? "Edit" : "Create"}
      toggleDrawer={() => {
        toggleDrawer();
        resetForm();
        setEditing(false);
      }}
      action={handleSubmit(onSubmit)}
      loading={isLoading || loading}
    >
      <form>
        <Stack spacing={2}>
          <TextField label="Jet Name" {...register("jet_code")} />
          <TextField label="Max Capacity" {...register("max_passengers")} />
          <TextField label="Price" name="price" {...register("price")} />
          <TextField label="Flight Date" {...register("flight_date")} />
          <AutoComplete
            hasCheckbox={false}
            label="Flight From"
            {...register("flight_from")}
            options={terminalList}
          />
          <AutoComplete
            hasCheckbox={false}
            label="Flight To"
            {...register("flight_to")}
            options={terminalList}
          />
        </Stack>
      </form>
    </AppDrawer>
  );
};

export default JetForm;

JetForm.propTypes = {
  toggleDrawer: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selected: PropTypes.shape({ id: PropTypes.string }).isRequired,
  setEditing: PropTypes.func.isRequired,
  editing: PropTypes.bool.isRequired,
};
