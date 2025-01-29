import { createSlice } from "@reduxjs/toolkit";
import { getCommentList } from "../asyncThunk/commentThunk";
import { ITypeFilter } from "../../interfaces/comments";

export type CommentList = {
  name: string;
  content: string;
};

type OpenModal = {
  modalAlertDialog: boolean;
  modalReportComment: boolean;
};

export interface IComments {
  commentList: CommentList[];
  openModal: OpenModal;
  isLoading: boolean;
  isError: boolean;
  typeFilter: "DESC" | "ASC";
  indexEdit: number;
  valueEditComment: string;
  idComment: string;
}

const initialState: IComments = {
  commentList: [],
  openModal: {
    modalAlertDialog: false,
    modalReportComment: false,
  },
  isLoading: true,
  isError: false,
  typeFilter: "DESC",
  indexEdit: -1,
  valueEditComment: "",
  idComment: "",
};

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setOpenModalAlertDialog: (state, action) => {
      state.openModal.modalAlertDialog = action.payload;
    },
    setOpenModalReportComment: (state, action) => {
      state.openModal.modalReportComment = action.payload;
    },
    setEditComment: (state, action) => {
      state.indexEdit = action.payload.index;
      state.valueEditComment = action.payload.content;
    },
    setIndexEdit: (state, action) => {
      state.indexEdit = action.payload;
    },
    setIdComment: (state, action) => {
      state.idComment = action.payload;
    },
    setValueEditComment: (state, action) => {
      state.valueEditComment = action.payload;
    },
    setTypeFilter: (state, action) => {
      state.typeFilter = action.payload;
    },
    getTypeFilter: (state) => {
      let typeFilter = JSON.parse(
        localStorage.getItem("filter-comments") as string
      );
      typeFilter =
        typeFilter === "DESC" || typeFilter === "ASC" ? typeFilter : "DESC";

      state.typeFilter = typeFilter;
      localStorage.setItem("filter-comments", JSON.stringify(typeFilter));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCommentList.pending, (state, action) => {})
      .addCase(getCommentList.fulfilled, (state, action) => {
        state.commentList = action.payload?.DT ?? [];
        state.isLoading = !action.payload?.DT;
      })
      .addCase(getCommentList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

// Action creators are generated for each case reducer function
export const {
  setOpenModalAlertDialog,
  setOpenModalReportComment,
  setEditComment,
  setIdComment,
  setIndexEdit,
  setValueEditComment,
  setTypeFilter
} = commentsSlice.actions;

export default commentsSlice.reducer;
