import { Box, Chip, Typography } from "@mui/joy";
import { Link } from "react-router-dom";

type IProps = {
  label: string;
  value: string | any;
  type: "only" | "many";
  canPress: boolean;
  describe?: string;
};

const InfoRow = ({ label, value, type, canPress, describe }: IProps) => (
  <Box sx={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
    <Typography level="title-md" color="primary">
      {label}
    </Typography>

    {type === "many" && Array.isArray(value) ? (
      value.map((item, index) => (
        <Chip
          key={index}
          variant="solid"
          color={`${canPress ? "primary" : "neutral"}`}
        >
          {typeof item === "object" && canPress ? (
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to={`/chi-tiet/${describe}/${item.slug}`}
            >
              {item.name}
            </Link>
          ) : (
            item
          )}
        </Chip>
      ))
    ) : (
      <Typography level="body-md">{value}</Typography>
    )}
  </Box>
);

export default InfoRow;
