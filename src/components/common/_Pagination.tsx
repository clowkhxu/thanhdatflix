import { Stack } from "@mui/joy";
import { Experimental_CssVarsProvider, Pagination } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface IPagination {
  handleChange: (event: React.ChangeEvent<unknown>, value: number) => void;
  totalPages: number | undefined;
  currentPage: number | undefined;
}

const _Pagination = ({
  handleChange,
  totalPages,
  currentPage,
}: IPagination) => {
  const theme = useSelector((state: RootState) => state.system.theme);

  return (
    <>
      <Experimental_CssVarsProvider>
        <Stack spacing={2} sx={{ marginTop: "32px", alignItems: "center" }}>
          <Pagination
            sx={{
              "& button": {
                color: theme === "dark" ? "#fff !important" : "#000 !important",
                borderColor: "#ccc",
              },
              "& div": {
                color: theme === "dark" ? "#fff !important" : "#000 !important",
              },
            }}
            hidePrevButton
            hideNextButton
            color="primary"
            onChange={handleChange}
            count={totalPages}
            page={currentPage}
            variant="outlined"
            shape="rounded"
            size="medium"
          />
        </Stack>
      </Experimental_CssVarsProvider>
    </>
  );
};

export default _Pagination;
