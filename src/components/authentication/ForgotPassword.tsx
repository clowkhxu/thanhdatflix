import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { Box, Button, IconButton, Input, Typography } from "@mui/joy";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import KeyIcon from "@mui/icons-material/Key";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useState } from "react";
import _ from "lodash";
import { forgotPassword, sendOTP } from "../../redux/asyncThunk/userThunk";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import toast from "react-hot-toast";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { setType } from "../../redux/slice/systemSlice";
import { validateEmail } from "../../utils";

interface ValueInput {
  email: string;
  password: string;
  authCode: string;
}

interface ValidInput {
  email: boolean;
  password: boolean;
  authCode: boolean;
}

const ForgotPassword = ({ setOpen }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const defaultValue: ValueInput = {
    email: "",
    password: "",
    authCode: "",
  };
  const defaultValidIput: ValidInput = {
    email: true,
    password: true,
    authCode: true,
  };
  const [valueInput, setValueInput] = useState<ValueInput>(defaultValue);
  const [isValidInput, setIsValidInput] =
    useState<ValidInput>(defaultValidIput);
  const [isLoadingSendCode, setIsLoadingSendCode] = useState<boolean>(false);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const theme = useSelector((state: RootState) => state.system.theme);

  const handleCheckValidInput = (): boolean => {
    let check = true;
    const _isValidInput: ValidInput = _.clone(isValidInput);

    if (valueInput.email === "") {
      _isValidInput.email = false;
      check = false;
    }

    if (valueInput.password === "") {
      _isValidInput.password = false;
      check = false;
    }

    if (valueInput.authCode === "") {
      _isValidInput.authCode = false;
      check = false;
    }

    setIsValidInput(_isValidInput);
    return check;
  };

  const handleOnchangeInput = (value: string, type: string) => {
    const _valueInput: ValueInput = _.clone(valueInput);
    const _isValidInput: ValidInput = _.clone(isValidInput);
    (_valueInput as any)[type] = value;
    (_isValidInput as any)[type] = true;
    setValueInput(_valueInput);
    setIsValidInput(_isValidInput);
  };

  const handleSubmit = async () => {
    const check: boolean = handleCheckValidInput();
    if (check) {
      setIsLoadingSubmit(true);
      const res: any = await dispatch(
        forgotPassword({
          email: valueInput.email,
          code: valueInput.authCode,
          password: valueInput.password,
          type_otp: "FORGOT_PASSWORD",
        })
      );

      if (+res.payload?.EC === 0) {
        toast.success(res.payload?.EM);
        setOpen(false);
        dispatch(setType("login"));
      } else {
        toast.error(res.payload?.EM);
      }
      setIsLoadingSubmit(false);
    }
  };

  const handleSendOTP = async () => {
    if (!validateEmail(valueInput.email)) {
      return toast.error("Email không hợp lệ!");
    }

    setIsLoadingSendCode(true);
    const res: any = await dispatch(
      sendOTP({
        email: valueInput.email,
        type_otp: "FORGOT_PASSWORD",
      })
    );
    if (+res.payload?.EC === 0) {
      toast.success(res.payload?.EM);
    }
    setIsLoadingSendCode(false);
  };

  return (
    <>
      <Box sx={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <IconButton onClick={() => dispatch(setType("login"))}>
          <ArrowBackIcon />
        </IconButton>
        <Typography
          level="title-lg"
          color={theme === "light" ? "primary" : "neutral"}
        >
          Quên mật khẩu?
        </Typography>
      </Box>
      <Box>
        <Input
          value={valueInput.email}
          onChange={(e) => handleOnchangeInput(e.target.value, "email")}
          error={!isValidInput.email}
          startDecorator={<AlternateEmailIcon />}
          size="md"
          placeholder="Email"
          type="email"
        
        />
        {!isValidInput.email && (
          <Typography level="title-sm" color="danger" sx={{ marginTop: "8px" }}>
            Email không được trống!
          </Typography>
        )}
      </Box>
      <Box>
        <Input
          value={valueInput.password}
          onChange={(e) => handleOnchangeInput(e.target.value, "password")}
          error={!isValidInput.password}
          startDecorator={<LockOutlinedIcon />}
          size="md"
          endDecorator={
            showPassword ? (
              <IconButton onClick={() => setShowPassword(false)}>
                <VisibilityIcon />
              </IconButton>
            ) : (
              <IconButton onClick={() => setShowPassword(true)}>
                <VisibilityOffIcon />
              </IconButton>
            )
          }
          placeholder="Mật khẩu mới"
          type={showPassword ? "text" : "password"}
        />
        {!isValidInput.password && (
          <Typography level="title-sm" color="danger" sx={{ marginTop: "8px" }}>
            Mật khẩu không được trống!
          </Typography>
        )}
      </Box>
      <Box>
        <Input
          value={valueInput.authCode}
          onChange={(e) => handleOnchangeInput(e.target.value, "authCode")}
          error={!isValidInput.authCode}
          startDecorator={<KeyIcon />}
          size="md"
          placeholder="Mã xác thực"
          type="text"
          endDecorator={
            <Button
              loading={isLoadingSendCode}
              disabled={valueInput.email === ""}
              onClick={() => handleSendOTP()}
              variant={theme === "light" ? "soft" : "solid"}
              color={theme === "light" ? "primary" : "neutral"}
            >
              Gửi mã
            </Button>
          }
        />

        {!isValidInput.authCode && (
          <Typography level="title-sm" color="danger" sx={{ marginTop: "8px" }}>
            Mã xác thực không được trống!
          </Typography>
        )}
      </Box>

      <Button
        color={theme === "light" ? "primary" : "neutral"}
        loading={isLoadingSubmit}
        onClick={() => handleSubmit()}
      >
        Xác nhận
      </Button>
    </>
  );
};

export default ForgotPassword;
