import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import publicRoutes from "./routes";
import DefaultLayout from "./components/layout/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import { useEffect } from "react";
import { getUserAccount } from "./redux/asyncThunk/userThunk";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { setIsMobile, setWidth } from "./redux/slice/systemSlice";
import { IUser } from "./interfaces/user";

function App() {
  const user: IUser = useSelector((state: RootState) => state.users.user);
  const dispatch: AppDispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const handleResize = () => {
      dispatch(setWidth(window.innerWidth));
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    dispatch(setIsMobile(isMobile));
  }, [isMobile]);

  useEffect(() => {
    const handleInit = async () => {
      await dispatch(getUserAccount());
    };

    if (!user?.access_token || !user?.refresh_token) {
      handleInit();
    }
  }, []);


  return (
    <Router>
      <Routes>
        {publicRoutes.map((route, index) => {
          const Layout = DefaultLayout;
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </Router>
  );
}

export default App;
