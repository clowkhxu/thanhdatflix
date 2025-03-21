import { useState, useEffect } from "react";
import { Alert, Box, Typography } from "@mui/joy";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import axios from "axios";

const SectionVideoPlayer = () => {
  const [decodedLink, setDecodedLink] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const currentEpisode = useSelector(
    (state: RootState) => state.watch.currentEpisode
  );

  useEffect(() => {
    const decodeLink = async () => {
      if (currentEpisode.link_embed) {
        setIsLoading(true);
        setError(null);
        
        try {
          // Gọi API từ Render để giải mã link
          const response = await axios.post('https://api.clow.fun/api/concunhonho', {
            encryptedData: currentEpisode.link_embed
          });
          
          setDecodedLink(response.data.decryptedUrl);  
        } catch (err) {
          console.error('Lỗi khi giải mã link:', err);
          setError('Không thể giải mã link video. Vui lòng thử lại sau.');
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    decodeLink();
  }, [currentEpisode.link_embed]);

  return (
    <>
      <Alert>
        <Typography level="title-lg">{currentEpisode.filename}</Typography>
      </Alert>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          paddingBottom: "56.25%", // 16:9 aspect ratio
          borderRadius: "8px",
          border: "1px solid rgba(61, 71, 81, 0.3)",
          overflow: "hidden",
        }}
      >
        {isLoading && <Typography>Đang tải video...</Typography>}
        {error && <Typography color="danger">{error}</Typography>}
        {decodedLink && !isLoading && (
          <iframe
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
            src={decodedLink}
            frameBorder="0"
            allow="fullscreen"
          ></iframe>
        )}
      </Box>
    </>
  );
};

export default SectionVideoPlayer;
