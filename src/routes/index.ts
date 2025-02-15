import Search from "../pages/Search";
import Detail from "../pages/Detail";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Info from "../pages/Info";
import SavedMovies from "../pages/SavedMovies";
import ViewingHistory from "../pages/WatchHistory";
import UserInfo from "../pages/UserInfo";
import Watch from "../pages/Watch/Watch";
import Authenticate from "../pages/Authenticate";
import AnotherUserInfo from "../pages/AnotherUserInfo";

const publicRoutes = [
  { path: "/", component: Home },
  { path: "/chi-tiet/:describe/:slug", component: Detail },
  { path: "/dang-xem/:slug", component: Watch },
  { path: "/tim-kiem/:keyword", component: Search },
  { path: "/thong-tin/:slug", component: Info },
  { path: "/phim-da-luu", component: SavedMovies },
  { path: "/lich-su-da-xem", component: ViewingHistory },
  { path: "/trang-ca-nhan", component: UserInfo },
  { path: "/xem-thong-tin/:id", component: AnotherUserInfo },
  { path: "/authenticate", component: Authenticate },
  { path: "*", component: NotFound },
];
export default publicRoutes;
