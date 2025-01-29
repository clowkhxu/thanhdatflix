import { Box, Button, IconButton, Input } from "@mui/joy";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import SearchIcon from "@mui/icons-material/Search";

interface SearchInputProps {
  searchValue: string;
  isLoadingButton: boolean;
  handleSearchInput: () => void;
  setSearchValue: (value: string) => void;
}

const SearchInput = ({
  searchValue,
  isLoadingButton,
  handleSearchInput,
  setSearchValue,
}: SearchInputProps) => {
  const width = useSelector((state: RootState) => state.system.width);
  const theme = useSelector((state: RootState) => state.system.theme);

  return (
    <Box>
      <Input
        autoFocus
        size="lg"
        onKeyDown={(e) => e.code === "Enter" && handleSearchInput()}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        sx={{ flex: "1" }}
        color={theme === "light" ? "primary" : "neutral"}
        variant="outlined"
        placeholder="Tìm kiếm phim..."
        startDecorator={
          width > 476 && (
            <SearchIcon color={theme === "light" ? "primary" : "secondary"} />
          )
        }
        endDecorator={
          width > 476 ? (
            <Button
              size="sm"
              color={theme === "light" ? "primary" : "neutral"}
              loading={isLoadingButton}
              disabled={searchValue === ""}
              onClick={handleSearchInput}
              variant="solid"
            >
              Tìm kiếm
            </Button>
          ) : (
            <IconButton
              loading={isLoadingButton}
              disabled={searchValue === ""}
              onClick={handleSearchInput}
              variant="solid"
              color={theme === "light" ? "primary" : "neutral"}
            >
              <SearchIcon />
            </IconButton>
          )
        }
      />
    </Box>
  );
};

export default SearchInput;
