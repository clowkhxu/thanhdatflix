import { Box, Button, Table, Typography } from "@mui/joy";
import HistoryIcon from "@mui/icons-material/History";
import { formatDate } from "../../utils";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import ButtonSeeMore from "../../components/common/ButtonSeeMore";

const TableActivitiesUser = ({ setOpenModalAlertDialog }: any) => {
  const activityFromStore = useSelector(
    (state: RootState) => state.activityLog.activityList
  );
  const [activityList, setActivityList] = useState<any[]>([]);
  const theme = useSelector((state: RootState) => state.system.theme);

  useEffect(() => {
    setActivityList(activityFromStore.slice(0, 10));
  }, [activityFromStore]);

  return (
    <Box
      sx={{
        border: "1px solid rgba(61, 71, 81, 0.3)",
        padding: "16px",
        borderRadius: "12px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          startDecorator={<HistoryIcon />}
          level="title-lg"
          color={theme === "light" ? "primary" : "neutral"}
        >
          Lịch sử hoạt động
        </Typography>
        {activityList.length > 0 && (
          <Button
            onClick={() => setOpenModalAlertDialog(true)}
            size="sm"
            color="danger"
          >
            Xoá lịch sử
          </Button>
        )}
      </Box>
      <Table sx={{ marginTop: "12px" }} aria-label="basic table">
        <thead>
          <tr>
            <th style={{ width: "75%" }}>Tên hoạt động</th>
            <th style={{ width: "25%" }}>Thời gian</th>
          </tr>
        </thead>
        <tbody>
          {activityList.length === 0 && (
            <tr>
              <td style={{ textAlign: "center" }} colSpan={2}>
                <Typography
                  sx={{ marginTop: "12px" }}
                  level="title-md"
                  color={theme === "light" ? "primary" : "neutral"}
                >
                  Không có hoạt động nào gần đây!
                </Typography>
              </td>
            </tr>
          )}
          {activityList.length > 0 &&
            activityList.map((item: any, index: number) => (
              <tr key={index}>
                <td style={{ wordBreak: "break-word" }}>{item?.action}</td>
                <td style={{ wordBreak: "break-word" }}>
                  {formatDate(item?.createdAt)}
                </td>
              </tr>
            ))}
        </tbody>
        {activityFromStore.length > 10 &&
          activityList?.length < activityFromStore?.length && (
            <tfoot>
              <tr>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  <Box sx={{ marginTop: "24px" }}>
                    <ButtonSeeMore
                      originalData={activityFromStore}
                      currentData={activityList}
                      countDisplay={10}
                      setData={setActivityList}
                      title="hoạt động"
                    />
                  </Box>
                </td>
              </tr>
            </tfoot>
          )}
      </Table>
    </Box>
  );
};

export default TableActivitiesUser;
