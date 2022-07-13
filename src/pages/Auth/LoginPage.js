import {
  Box,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useMutation } from "react-query";
import toast from "react-hot-toast";
import authServices from "../../services/authServices";
import Auth from "../../utils/Auth";
import Button from "@mui/material/Button";

const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { handleSubmit, register } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      password: "",
      email: "",
    },
  });
  const history = useHistory();

  const { mutate, isLoading } = useMutation(authServices.login, {
    onSuccess: ({ data }) => {
      console.log(data);
      Auth.setToken(data.access);
      history.push("/admin/quotes");
    },
    onError: ({ response }) => {
      const errMsg = response.data.detail;
      toast.error(errMsg);
    },
  });

  const onSubmit = (values) => {
    console.log("Submitting...");
    mutate(values);
  };

  const inputStyle = {
    "& .MuiInputBase-root": {
      borderRadius: "4px !important",
      height: 45,
      backgroundColor: "none",
    },
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <Box
      m="auto"
      p={3}
      justifyContent="center"
      alignItems="center"
      display="flex"
      flexDirection="column"
      sx={{ backgroundColor: "#ffffff" }}
    >
      {/*<img src={logo} alt="logo" width="136px" />*/}
      <Typography variant="h5" mt="24px" fontWeight={500}>
        Sign in to your Account
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} direction="column" mt="24px">
          <TextField
            label="Email Address"
            {...register("email")}
            sx={inputStyle}
          />
          <TextField
            label="Password"
            {...register("password")}
            sx={inputStyle}
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button variant="inherit" onClick={togglePasswordVisibility}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        </Stack>
        <Typography textAlign="right" variant="body2">
          <Link to="/forgot-password">Forgot Password?</Link>
        </Typography>
        <Box mt="40px">
          <Button
            fullWidth
            sx={{ padding: "10px", fontSize: "16px" }}
            type="submit"
            loading={isLoading}
          >
            Sign In
          </Button>
        </Box>
        <Stack mt="16px">
          <Typography variant="caption">
            By signing in, I accept the SwiftJet Terms of Service and
          </Typography>
          <Typography variant="caption">
            acknowledge the Privacy Policy.
          </Typography>
        </Stack>
      </form>
    </Box>
  );
};

export default LoginPage;
