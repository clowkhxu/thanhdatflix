import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ModalClose,
} from "@mui/joy";
import _NavLink from "../../common/_NavLink";
import Accordion from "@mui/joy/Accordion";
import AccordionDetails from "@mui/joy/AccordionDetails";
import AccordionGroup from "@mui/joy/AccordionGroup";
import AccordionSummary from "@mui/joy/AccordionSummary";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { IUser } from "../../../interfaces/user";
import { generateYears } from "../../../utils";

type _Drawer = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const _Drawer = ({ open, setOpen }: _Drawer) => {
  const categories = useSelector((state: RootState) => state.movies.categories);
  const countries = useSelector((state: RootState) => state.movies.countries);
  const user: IUser = useSelector((state: RootState) => state.users.user);
  const currentYear = new Date().getFullYear();
  const years: number[] = generateYears(1983, currentYear);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => setOpen(false), [params]);

  const handleNavigate = (path: string) => navigate(path);

  return (
    <Drawer
      open={open}
      onClose={() => setOpen(false)}
      sx={{
        "--Drawer-transitionDuration": open ? "0.4s" : "0.2s",
        "--Drawer-transitionFunction": open
          ? "cubic-bezier(0.79,0.14,0.15,0.86)"
          : "cubic-bezier(0.77,0,0.18,1)",
        "& > div": {
            backdropFilter: "unset",
        }
      }}
    >
      <ModalClose />
      <Box role="presentation" sx={{ p: 2, marginTop: "24px" }}>
        <List>
          <ListItem>
            <ListItemButton onClick={() => handleNavigate("/")}>
              Trang chủ
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              onClick={() => handleNavigate("/chi-tiet/danh-sach/phim-le")}
            >
              Phim lẻ
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              onClick={() => handleNavigate("/chi-tiet/danh-sach/phim-bo")}
            >
              Phim bộ
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              onClick={() => handleNavigate("/chi-tiet/danh-sach/hoat-hinh")}
            >
              Phim hoạt hình
            </ListItemButton>
          </ListItem>
          <AccordionGroup disableDivider>
            <AccordionItem
              title="Thể loại"
              items={categories}
              onClick={(slug) => handleNavigate(`/chi-tiet/the-loai/${slug}`)}
            />
            <AccordionItem
              title="Quốc gia"
              items={countries}
              onClick={(slug) => handleNavigate(`/chi-tiet/quoc-gia/${slug}`)}
            />
            <AccordionItem
              title="Năm ra mắt"
              items={years}
              onClick={(year) => handleNavigate(`/chi-tiet/nam/${year}`)}
            />
          </AccordionGroup>
        </List>
        {(user?.access_token || user?.refresh_token) && (
          <Box>
            <Divider />
            <List>
              <ListItem>
                <ListItemButton>
                  <_NavLink path="/lich-su-da-xem" content="Lịch sử đã xem" />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton>
                  <_NavLink path="/phim-da-luu" content="Phim đã lưu" />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default _Drawer;

type AccordionItemProps = {
  title: string;
  items: any[];
  onClick: (slug: string) => void;
};

const AccordionItem = ({ title, items, onClick }: AccordionItemProps) => {
  if (items.length === 0) return null;

  return (
    <Accordion>
      <AccordionSummary>{title}</AccordionSummary>
      <AccordionDetails>
        {items.map((item, index) => (
          <ListItem key={index}>
            <ListItemButton onClick={() => onClick(item.slug || item)}>
              {item.name || item}
            </ListItemButton>
          </ListItem>
        ))}
      </AccordionDetails>
    </Accordion>
  );
};
