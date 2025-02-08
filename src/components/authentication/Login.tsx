import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { Box, Button, Divider, IconButton, Input, Typography } from "@mui/joy";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import GoogleIcon from "@mui/icons-material/Google";
import { setType } from "../../redux/slice/systemSlice";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useRef, useState } from "react";
import _ from "lodash";
import { login } from "../../redux/asyncThunk/userThunk";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import toast from "react-hot-toast";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";


const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || "";

interface ValueInput {
  email: string;
  password: string;
}

interface ValidInput {
  email: boolean;
  password: boolean;
}

const Login = ({ setOpen }: any) => {
  const dispatch: AppDispatch = useDispatch();
  const defaultValueLogin: ValueInput = { email: "", password: "" };
  const defaultValidInput: ValidInput = { email: true, password: true };
  const [valueInput, setValueInput] = useState<ValueInput>(defaultValueLogin);
  const [isValidInput, setIsValidInput] = useState<ValidInput>(defaultValidInput);
  const emailRef = useRef<HTMLInputElement>(null);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const theme = useSelector((state: RootState) => state.system.theme);

  const handleCheckValidInput = (): boolean => {
    let check = true;
    const _isValidInput = _.clone(isValidInput);
    if (valueInput.email === "") {
      emailRef.current?.focus();
      _isValidInput.email = false;
      check = false;
    }
    if (valueInput.password === "") {
      _isValidInput.password = false;
      check = false;
    }
    setIsValidInput(_isValidInput);
    return check;
  };

  const handleOnchangeInput = (value: string, type: string) => {
    setValueInput((prev) => ({ ...prev, [type]: value }));
    setIsValidInput((prev) => ({ ...prev, [type]: true }));
  };

  const handleLogin = async () => {
    if (handleCheckValidInput()) {
      setIsLogin(true);
      const res: any = await dispatch(
        login({ email: valueInput.email, password: valueInput.password })
      );
      if (+res.payload?.EC !== 0) {
        toast.error(res.payload?.EM);
      }
      setIsLogin(false);
    }
  };

  const handleGoogleSuccess = (response: any) => {
    console.log("Google Login Success:", response);
    const idToken = response.credential;
    toast.success("Đăng nhập thành công với Google!");
  };

  const handleGoogleFailure = () => {
    toast.error("Đăng nhập Google thất bại!");
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Typography sx={{ marginBottom: "12px" }} level="title-lg" color={theme === "light" ? "primary" : "neutral"}>
        Đăng nhập
      </Typography>
      <Box>
        <Input
          ref={emailRef}
          error={!isValidInput.email}
          onChange={(e) => handleOnchangeInput(e.target.value, "email")}
          value={valueInput.email}
          startDecorator={<AlternateEmailIcon />}
          size="md"
          placeholder="Email"
          type="text"
        />
        {!isValidInput.email && <Typography level="title-sm" color="danger" sx={{ marginTop: "8px" }}>Email không được bỏ trống!</Typography>}
      </Box>
      <Box>
        <Input
          error={!isValidInput.password}
          onChange={(e) => handleOnchangeInput(e.target.value, "password")}
          value={valueInput.password}
          startDecorator={<LockOutlinedIcon />}
          size="md"
          endDecorator={showPassword ? <IconButton onClick={() => setShowPassword(false)}><VisibilityIcon /></IconButton> : <IconButton onClick={() => setShowPassword(true)}><VisibilityOffIcon /></IconButton>}
          placeholder="Mật khẩu"
          type={showPassword ? "text" : "password"}
        />
        {!isValidInput.password && <Typography level="title-sm" color="danger" sx={{ marginTop: "8px" }}>Mật khẩu không được bỏ trống!</Typography>}
      </Box>
      <Button color={theme === "light" ? "primary" : "neutral"} loading={isLogin} onClick={handleLogin}>
        Đăng nhập
      </Button>
      <Typography onClick={() => dispatch(setType("forgot-password"))} sx={{ marginLeft: "auto", cursor: "pointer", "&:hover": { textDecoration: "underline" } }} level="title-sm" color="neutral">
        Quên mật khẩu?
      </Typography>
      <Divider sx={{ margin: "12px 0" }} />
      <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleFailure} />
      <Box sx={{ display: "flex", gap: "4px", marginTop: "12px", justifyContent: "center" }}>
        <Typography level="title-sm" color="neutral">Chưa có tài khoản?</Typography>
        <Typography onClick={() => dispatch(setType("register"))} level="title-sm" color={theme === "light" ? "primary" : "neutral"} sx={{ cursor: "pointer", "&:hover": { textDecoration: "underline" } }}>
          Đăng ký
        </Typography>
      </Box>
    </GoogleOAuthProvider>
  );
};

export default Login;
