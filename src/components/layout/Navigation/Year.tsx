import { Box, Dropdown, Menu, MenuButton, MenuItem } from "@mui/joy";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import _NavLink from "../../common/_NavLink";
import { useNavigate } from "react-router-dom";
import { generateYears } from "../../../utils";

const Year = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const years: number[] = generateYears(1983, currentYear);

  return (
    <Box>
      <Dropdown>
        <MenuButton variant="plain" color="neutral">
          Năm ra mắt
          <KeyboardArrowDownIcon />
        </MenuButton>
        <Menu
          className="countrys"
          sx={{
            maxWidth: "420px",
            maxHeight: "420px",
            padding: "8px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {years.map((year, index) => (
              <MenuItem
                onClick={() => navigate(`/chi-tiet/nam/${year}`)}
                key={index}
                sx={{ borderRadius: "8px", flex: "auto" }}
              >
                {year}
              </MenuItem>
            ))}
          </Box>
        </Menu>
      </Dropdown>
    </Box>
  );
};

export default Year;
