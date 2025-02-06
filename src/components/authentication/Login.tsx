import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { Box, Button, Divider, IconButton, Input, Typography } from "@mui/joy";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import GoogleIcon from "@mui/icons-material/Google";
import { setType } from "../../redux/slice/systemSlice";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useRef } from "react";
import _ from "lodash";
import toast from "react-hot-toast";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

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
  const defaultValueLogin: ValueInput = {
    email: "",
    password: "",
  };
  const defaultValidIput: ValidInput = {
    email: true,
    password: true,
  };
  const [valueInput, setValueInput] = useState<ValueInput>(defaultValueLogin);
  const [isValidInput, setIsValidInput] =
    useState<ValidInput>(defaultValidIput);
  const emailRef = useRef<HTMLInputElement>(null);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const theme = useSelector((state: RootState) => state.system.theme);

  const handleCheckValidInput = (): boolean => {
    let check: boolean = true;
    const _isValidInput: ValidInput = _.clone(isValidInput);
    if (valueInput.email === "") {
      if (emailRef.current) {
        emailRef.current.focus();
      }
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
    const _valueInput: ValueInput = _.clone(valueInput);
    const _isValidInput: ValidInput = _.clone(isValidInput);
    (_valueInput as any)[type] = value;
    (_isValidInput as any)[type] = true;
    setValueInput(_valueInput);
    setIsValidInput(_isValidInput);
  };

  const handleLogin = async () => {
    const check: boolean = handleCheckValidInput();

    if (check) {
      setIsLogin(true);
      // Thực hiện logic đăng nhập nếu cần
      setIsLogin(false);
    }
  };

  // Hàm xử lý đăng nhập bằng Google
  const handleLoginGoogle = (response: any) => {
    if (response.credential) {
      // Lấy thông tin người dùng từ token JWT
      const userObject = parseJwt(response.credential);
      console.log(userObject); // Thông tin người dùng

      // Lưu token hoặc thông tin người dùng vào localStorage hoặc sessionStorage
      localStorage.setItem("authToken", response.credential);

      // Chuyển hướng hoặc làm bất kỳ hành động nào sau khi đăng nhập thành công
      window.location.href = '/dashboard'; // Chuyển hướng đến trang sau khi đăng nhập
    }
  };

  // Hàm giải mã JWT token
  const parseJwt = (token: string) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  };

  useEffect(() => {
    // Khởi tạo Google Login API với thông tin bạn cung cấp
    window.google.accounts.id.initialize({
      client_id: "463029945-kuiu9rkfkh0bc5965dpisi35520uqd6b.apps.googleusercontent.com", // Client ID của bạn
      project_id: "clowtruyen-448900", // ID của dự án
      auth_uri: "https://accounts.google.com/o/oauth2/auth", // URI xác thực
      token_uri: "https://oauth2.googleapis.com/token", // URI token
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs", // URL chứng chỉ
      client_secret: "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", // Secret Key (không nên chia sẻ công khai)
      callback: handleLoginGoogle, // Callback xử lý đăng nhập
    });

    // Render nút đăng nhập Google
    window.google.accounts.id.renderButton(
      document.getElementById("google-sign-in-button"),
      {
        theme: "outline",
        size: "large",
      }
    );
  }, []);

  return (
    <>
      <Typography
        sx={{ marginBottom: "12px" }}
        level="title-lg"
        color={theme === "light" ? "primary" : "neutral"}
      >
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
        {!isValidInput.email && (
          <Typography level="title-sm" color="danger" sx={{ marginTop: "8px" }}>
            Email không được bỏ trống!
          </Typography>
        )}
      </Box>
      <Box>
        <Input
          error={!isValidInput.password}
          onChange={(e) => handleOnchangeInput(e.target.value, "password")}
          value={valueInput.password}
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
          placeholder="Mật khẩu"
          type={showPassword ? "text" : "password"}
        />
        {!isValidInput.password && (
          <Typography level="title-sm" color="danger" sx={{ marginTop: "8px" }}>
            Mật khẩu không được bỏ trống!
          </Typography>
        )}
      </Box>

      <Button
        color={theme === "light" ? "primary" : "neutral"}
        loading={isLogin}
        onClick={() => handleLogin()}
      >
        Đăng nhập
      </Button>

      <Typography
        onClick={() => dispatch(setType("forgot-password"))}
        sx={{
          marginLeft: "auto",
          cursor: "pointer",
          "&:hover": {
            textDecoration: "underline",
          },
        }}
        level="title-sm"
        color="neutral"
      >
        Quên mật khẩu?
      </Typography>
      <Divider sx={{ margin: "12px 0" }} />

      {/* Nút đăng nhập Google */}
      <div id="google-sign-in-button"></div>

      <Box
        sx={{
          display: "flex",
          gap: "4px",
          marginTop: "12px",
          justifyContent: "center",
        }}
      >
        <Typography level="title-sm" color="neutral">
          Chưa có tài khoản?
        </Typography>
        <Typography
          onClick={() => dispatch(setType("register"))}
          level="title-sm"
          color={theme === "light" ? "primary" : "neutral"}
          sx={{
            cursor: "pointer",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          Đăng ký
        </Typography>
      </Box>
    </>
  );
};

export default Login;
