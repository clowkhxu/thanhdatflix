import { Alert, Option, Select, Typography } from "@mui/joy";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { useEffect, useState } from "react";
import { Filter } from "./CommentSection";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { stat } from "fs";
import { setTypeFilter } from "../../redux/slice/commentsSlice";

interface IProps {
  handleGetAllComment: (typeFilter: Filter) => Promise<void>;
}



const CommentFilter = ({ handleGetAllComment }: IProps) => {

  const typeFilter = useSelector(
    (state: RootState) => state.comments.typeFilter
  );
  const dispatch: AppDispatch = useDispatch();

  const handleChangeFilter = (type: Filter) => {
    handleGetAllComment(type);
    dispatch(setTypeFilter(type))
  };

  useEffect(() => {}, []);

  return (
    <Alert
      sx={{
        gap: "12px",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <Typography startDecorator={<FilterAltOutlinedIcon />} level="title-md">
        Lọc bình luận
      </Typography>
      <Select
        value={typeFilter}
        onChange={(event, value) => handleChangeFilter(value as Filter)}
      >
        <Option value="DESC">Mới nhất</Option>
        <Option value="ASC">Cũ nhất</Option>
      </Select>
    </Alert>
  );
};

export default CommentFilter;
