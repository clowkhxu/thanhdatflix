import { Box, IconButton, Tooltip, Typography } from "@mui/joy";
import HistoryIcon from "@mui/icons-material/History";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ClearIcon from "@mui/icons-material/Clear";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

interface SearchListProps {
  data: any;
  handleSearch: (value: string) => void;
  handleRemoveSearch: (item: any) => void;
  handleFavouriteSearchHistory?: (
    keyword: string,
    idSearchHistory: string
  ) => void;
  type: "recent" | "favorite";
}

const SearchList = ({
  data,
  type,
  handleSearch,
  handleRemoveSearch,
  handleFavouriteSearchHistory,
}: SearchListProps) => {
  const theme = useSelector((state: RootState) => state.system.theme);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <Typography level="title-md" color="neutral">
        {type === "recent" ? "Gần đây" : "Yêu thích"}
      </Typography>
      <ul className="search-list">
        {data.map((item: any, index: number) => (
          <li key={index}>
            <Box
              sx={{
                padding: "4px 8px",
                border: "1px solid rgba(61, 71, 81, 0.3)",
                borderRadius: "12px",
                display: "flex",
                height: "48px",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
                cursor: "pointer",
                transition: "0.1s",
                "&:hover": {
                  color: `${theme === "light" ? "#006BD6" : "#66B3FF"}`,
                  backgroundColor:
                    theme === "light" ? "#ebf5ff" : "rgb(9,34,59)",
                  borderColor: theme === "light" ? "#66b3ff" : "rgb(5,61,119)",
                },
              }}
            >
              <Box
                onClick={() => handleSearch(item?.keyword)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  flex: "1",
                  height: "100%",
                }}
              >
                <Typography
                  startDecorator={
                    type === "recent" ? (
                      <HistoryIcon color="primary" />
                    ) : (
                      <StarBorderIcon color="primary" />
                    )
                  }
                >
                  {item?.keyword}
                </Typography>
              </Box>
              <Box>
                {type === "recent" && (
                  <Tooltip title="Đánh dấu yêu thích">
                    <IconButton
                      title="Đánh dấu yêu thích"
                      onClick={() => {
                        if (handleFavouriteSearchHistory) {
                          handleFavouriteSearchHistory(item.keyword, item.id);
                        }
                      }}
                      color="primary"
                    >
                      <StarBorderIcon />
                    </IconButton>
                  </Tooltip>
                )}
                <Tooltip title="Xoá khỏi lịch sử">
                  <IconButton
                    title="Xoá"
                    onClick={() => handleRemoveSearch(item.id)}
                    color="primary"
                  >
                    <ClearIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default SearchList;
