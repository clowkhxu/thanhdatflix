import { Box, Button } from "@mui/joy";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import CommentItem from "./CommentItem";
import {
  setIdComment,
  setIndexEdit,
  setOpenModalAlertDialog,
  setOpenModalReportComment,
} from "../../redux/slice/commentsSlice";
import {
  deleleComment,
  updateComment,
} from "../../redux/asyncThunk/commentThunk";
import ModalAlertDialog from "../modals/ModalAlertDialog";
import ModalReportComment from "../modals/ModalReportComment";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { isEmpty } from "lodash";
import { socket } from "../../socket";
import ButtonSeeMore from "../common/ButtonSeeMore";

const CommentList = () => {
  const commentListStore = useSelector(
    (state: RootState) => state.comments.commentList
  );
  const openModalAlertDiaLog = useSelector(
    (state: RootState) => state.comments.openModal.modalAlertDialog
  );
  const openModalReportComment = useSelector(
    (state: RootState) => state.comments.openModal.modalReportComment
  );
  const indexEdit = useSelector((state: RootState) => state.comments.indexEdit);
  const valueEditComment = useSelector(
    (state: RootState) => state.comments.valueEditComment
  );
  const idComment = useSelector((state: RootState) => state.comments.idComment);
  const dispatch: AppDispatch = useDispatch();
  const params = useParams();
  const [commentList, setCommentList] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setCommentList(commentListStore.slice(0, 5));
  }, [commentListStore]);

  const handleDeleteComment = async () => {
    setIsLoading(true);

    const res = await dispatch(deleleComment(idComment as string));

    if (+res.payload?.EC === 0) {
      toast.success(res.payload?.EM);
    }

    dispatch(setOpenModalAlertDialog(false));
    setIsLoading(false);

    socket.emit("deleteComment", { slug: params?.slug });
  };

  const handleSetOpenModalAlertDialog = (open: boolean) => {
    dispatch(setOpenModalAlertDialog(open));
  };

  const handleSetOpenModalReportComment = (open: boolean) => {
    dispatch(setOpenModalReportComment(open));
  };

  const handSaveEditComment = async (idComment: string) => {
    if (isEmpty(valueEditComment.trim())) {
      toast.error("Vui lòng nhập nội dung!");
      return;
    }

    setIsLoading(true);
    const res = await dispatch(
      updateComment({
        content: valueEditComment,
        idComment,
      })
    );
    if (+res.payload?.EC === 0) {
      toast.success(res.payload?.EM);
      socket.emit("updateComment", { slug: params?.slug });
    }
    dispatch(setIndexEdit(-1));
    setIsLoading(false);
  };

  const handleSetIdComment = (idComment: string) => {
    dispatch(setIdComment(idComment));
  };

  return (
    <>
      <Box>
        <ul
          style={{
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            width: `${indexEdit !== -1 ? "100%" : "unset"}`,
          }}
        >
          {commentList.map((item: any, index: any) => (
            <Box key={index}>
              <CommentItem
                index={index}
                item={item}
                isLoading={isLoading}
                handSaveEditComment={handSaveEditComment}
              />
            </Box>
          ))}
        </ul>
        {commentListStore?.length > 5 &&
          commentList?.length < commentListStore?.length && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "32px",
              }}
            >
              <ButtonSeeMore
                currentData={commentList}
                originalData={commentListStore}
                countDisplay={5}
                setData={setCommentList}
                title="bình luận"
              />
            </Box>
          )}
      </Box>

      <ModalAlertDialog
        isLoading={isLoading}
        handleSubmit={handleDeleteComment}
        open={openModalAlertDiaLog}
        setOpen={handleSetOpenModalAlertDialog}
        title="Xoá bình luận"
        content="Bạn có chắc chắn muốn xoá bình luận này?"
      />

      <ModalReportComment
        idComment={idComment}
        setIdComment={handleSetIdComment}
        open={openModalReportComment}
        setOpen={handleSetOpenModalReportComment}
      />
    </>
  );
};

export default CommentList;
