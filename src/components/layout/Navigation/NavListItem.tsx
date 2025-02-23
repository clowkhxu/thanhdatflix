import { Box, Dropdown, Menu, MenuButton, MenuItem, Skeleton } from "@mui/joy";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import _NavLink from "../../common/_NavLink";

import "../../../styles/Navigation.scss";
import SkeletonNav from "../../common/SkeletonNav";
import { ICategory, ICountry } from "../../../interfaces/movie";
import { useNavigate } from "react-router-dom";

interface IProps {
  data: ICategory[] | ICountry[];
  describe: string;
  title: string;
}

const NavListItem = ({ data, describe, title }: IProps) => {
  const navigate = useNavigate();

  return (
    <Box>
      <Dropdown>
        <MenuButton variant="plain" color="neutral">
          {title}
          <KeyboardArrowDownIcon />
        </MenuButton>
        <Menu
          className="categorys"
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            maxWidth: "560px",
            padding: "8px",
          }}
        >
          {data.length === 0 && <SkeletonNav quantity={15} width={106} />}
          {data.length > 0 &&
            data.map((item, index: number) => (
              <MenuItem
                onClick={() => navigate(`/chi-tiet/${describe}/${item.slug}`)}
                key={index}
                sx={{ borderRadius: "8px", width: "25%" }}
              >
                {item.name} 
              </MenuItem>
            ))}
        </Menu>
      </Dropdown>
    </Box>
  );
};

export default NavListItem;
