import { Box, Dropdown, Menu, MenuButton, MenuItem } from "@mui/joy";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import HistoryIcon from "@mui/icons-material/History";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import _NavLink from "../../common/_NavLink";
import Year from "./Year";
import NavListItem from "./NavListItem";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { IUser } from "../../../interfaces/user";
import { useNavigate } from "react-router-dom";

const arrNav = [
  { name: "Phim Lẻ", slug: "phim-le" },
  { name: "Phim Bộ", slug: "phim-bo" },
  { name: "Hoạt Hình", slug: "hoat-hinh" },
  { name: "Tv Shows", slug: "tv-shows" },
];

const NavLeft = () => {
  const categories = useSelector((state: RootState) => state.movies.categories);
  const countries = useSelector((state: RootState) => state.movies.countries);
  const user: IUser = useSelector((state: RootState) => state.users.user);
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex" }}>
      <Dropdown>
        <MenuButton variant="plain">
          Danh mục
          <KeyboardArrowDownIcon />
        </MenuButton>
        <Menu>
          {arrNav.map((item, index: number) => (
            <MenuItem
              onClick={() => navigate(`/chi-tiet/danh-sach/${item.slug}`)}
              key={index}
            >
              {item.name}
            </MenuItem>
          ))}
        </Menu>
      </Dropdown>

      <NavListItem data={categories} describe="the-loai" title="Thể loại" />
      <NavListItem data={countries} describe="quoc-gia" title="Quốc gia" />

      <Year />

      {(user.access_token || user?.refresh_token) && (
        <Dropdown>
          <MenuButton variant="plain">
            Tuỳ chọn
            <KeyboardArrowDownIcon />
          </MenuButton>
          <Menu>
            <MenuItem>
              <HistoryIcon />
              <_NavLink path="/lich-su-da-xem" content="Lịch sử đã xem" />
            </MenuItem>
            <MenuItem>
              <BookmarkBorderIcon />
              <_NavLink path="/phim-da-luu" content="Phim đã lưu" />
            </MenuItem>
          </Menu>
        </Dropdown>
      )}
    </Box>
  );
};

export default NavLeft;
