import { Box, Button, IconButton, Input, Typography } from "@mui/joy";
import SearchIcon from "@mui/icons-material/Search";
import Divider from "@mui/joy/Divider";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import _, { debounce } from "lodash";
import "../../../styles/ModalSearch.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import {
  addSearchHistory,
  deleteSearchHistory,
  getSearchHistory,
} from "../../../redux/asyncThunk/searchHistoryThunk";
import { addActivityLog } from "../../../redux/asyncThunk/activityLogThunk";
import SkeletonModalSearch from "../../common/SkeletonModalSearch";
import { searchPreview } from "../../../redux/asyncThunk/moviesThunk";
import ModalContainer from "../ModalContainer";
import SearchList from "./SearchList";
import SearchPreview from "./SearchPreview";
import SearchInput from "./SearchInput";

type ModalSearch = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const ModalSearch = ({ open, setOpen }: ModalSearch) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const navigate = useNavigate();
  const params = useParams();
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.users.user);
  const searchRecent = useSelector(
    (state: RootState) => state.searchHistory.searchRecent
  );
  const searchFavourite = useSelector(
    (state: RootState) => state.searchHistory.searchFavourite
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingButton, setIsLoadingButton] = useState<boolean>(false);
  const incognitoMode = useSelector(
    (state: RootState) => state.system.incognitoMode
  );

  useEffect(() => {
    const searchHistory = [...searchRecent, ...searchFavourite];

    const handleInit = async () => {
      setIsLoading(true);
      await dispatch(getSearchHistory(user?.id as string));
      setIsLoading(false);
    };

    if (user?.access_token || user?.refresh_token) {
      handleInit();
    }
  }, [user]);

  useEffect(() => {
    const handleShowPreview = async () => {
      if (searchValue.trim() !== "") {
        setIsLoading(true);
        await dispatch(searchPreview(searchValue));
        setIsLoading(false);
      }
    };

    const debouncedSearch = debounce(handleShowPreview, 500);

    debouncedSearch();

    return () => debouncedSearch.cancel();
  }, [searchValue, params?.keyword]);

  const handleSearchInput = async () => {
    if (searchValue === params?.keyword) {
      setOpen(false);
      setSearchValue("");
      return;
    }

    if (searchValue !== "") {
      if ((user?.access_token || user?.refresh_token) && !incognitoMode) {
        setIsLoadingButton(true);
        await dispatch(
          addSearchHistory({
            userId: user?.id as string,
            type: "recent",
            keyword: searchValue,
          })
        );
        await dispatch(getSearchHistory(user?.id as string));
        await dispatch(
          addActivityLog({
            userId: user?.id as string,
            action: `Tìm kiếm từ khoá "${searchValue}"`,
          })
        );
        setIsLoadingButton(false);
      }
      navigate(`/tim-kiem/${searchValue}`);
      setSearchValue("");
      setOpen(false);
    }
  };

  const handleClickSearchPreview = (slug: string) => {
    navigate(`/thong-tin/${slug}`);
    setOpen(false);
    setSearchValue("");
  };

  const handleSeeAll = () => {
    navigate(`/tim-kiem/${searchValue}`);
    setOpen(false);
    setSearchValue("");
  };

  const handleSearchFromSearchList = async (value: string) => {
    navigate(`/tim-kiem/${value}`);
    setOpen(false);
    await dispatch(
      addActivityLog({
        userId: user?.id as string,
        action: `Tìm kiếm từ khoá "${value}"`,
      })
    );
    setSearchValue("");
  };

  const handleFavouriteSearchHistory = async (
    keyword: string,
    idSearchHistory: string
  ) => {
    setIsLoading(true);
    await dispatch(
      addSearchHistory({
        userId: user?.id as string,
        type: "favourite",
        keyword,
        idSearchHistory,
      })
    );
    await dispatch(getSearchHistory(user?.id as string));
    setIsLoading(false);
  };

  const handleRemoveSearch = async (id: string) => {
    setIsLoading(true);
    await dispatch(deleteSearchHistory(id));
    await dispatch(getSearchHistory(user?.id as string));
    setIsLoading(false);
  };

  return (
    <ModalContainer
      open={open}
      setOpen={setOpen}
      sx={{
        animation: "scaleIn 0.3s",
        minWidth: {
          xs: "90%",
          sm: "640px",
        },
        maxWidth: {
          xs: "90%",
          sm: "680px",
        },
        borderRadius: "md",
        p: 2,
        boxShadow: "lg",
      }}
    >
      <SearchInput
        searchValue={searchValue}
        isLoadingButton={isLoadingButton}
        handleSearchInput={handleSearchInput}
        setSearchValue={setSearchValue}
      />

      <Divider sx={{ margin: "24px -16px" }} />

      {isLoading && <SkeletonModalSearch />}

      {searchValue !== "" && !isLoading && (
        <SearchPreview
          handleClickSearchPreview={handleClickSearchPreview}
          handleSeeAll={handleSeeAll}
        />
      )}

      {searchValue === "" && !isLoading && (
        <Box
          sx={{
            height: {
              xs: "calc(100vh - 300px)",
              sm: "calc(100vh - 200px)",
            },
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          {searchRecent.length === 0 && searchFavourite.length === 0 && (
            <Typography
              sx={{ textAlign: "center" }}
              level="title-lg"
              color="neutral"
            >
              Lịch sử tìm kiếm trống!
            </Typography>
          )}
          {searchRecent.length > 0 && (
            <SearchList
              data={searchRecent}
              handleSearch={handleSearchFromSearchList}
              handleRemoveSearch={handleRemoveSearch}
              handleFavouriteSearchHistory={handleFavouriteSearchHistory}
              type="recent"
            />
          )}
          {searchFavourite.length > 0 && (
            <SearchList
              data={searchFavourite}
              handleSearch={handleSearchFromSearchList}
              handleRemoveSearch={handleRemoveSearch}
              type="favorite"
            />
          )}
        </Box>
      )}
    </ModalContainer>
  );
};

export default ModalSearch;
