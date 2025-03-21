import { useState, useEffect } from "react";
import { Alert, Box, Typography } from "@mui/joy";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import axios from "axios";

const SectionVideoPlayer = () => {
  const [encodedLink, setEncodedLink] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const currentEpisode = useSelector(
    (state: RootState) => state.watch.currentEpisode
  );

  useEffect(() => {
    const encodeLink = async () => {
      if (currentEpisode.link_embed) {
        setIsLoading(true);
        setError(null);
        
        try {
      
          const response = await axios.post('https://api.clow.fun/api/encrypt', {
            data: currentEpisode.link_embed
          });
          
          if (response.data && response.data.encodedLink) {
            setEncodedLink(response.data.encodedLink);
          } else {
            throw new Error('Không nhận được link mã hóa từ API');
          }
        } catch (err) {
          console.error('Lỗi khi mã hóa link:', err);
          setError('Không thể mã hóa link video. Vui lòng thử lại sau.');
          
          try {
            const encoded = await encryptWithAES(currentEpisode.link_embed, "");
            setEncodedLink(encoded);
          } catch (encryptError) {
          
          }
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    encodeLink();
  }, [currentEpisode.link_embed]);

 
  async function encryptWithAES(data: string, key: string) {
    const encoder = new TextEncoder();
    const keyBuffer = encoder.encode(key);
    const iv = crypto.getRandomValues(new Uint8Array(16)); 

    const secretKey = await crypto.subtle.importKey(
      "raw",
      keyBuffer,
      { name: "AES-CBC" },
      false,
      ["encrypt"]
    );

    const encryptedData = await crypto.subtle.encrypt(
      { name: "AES-CBC", iv: iv },
      secretKey,
      encoder.encode(data)
    );

    const encryptedBase64 = base64urlencode(encryptedData);
    const ivBase64 = base64urlencode(iv.buffer);
    return `${ivBase64}.${encryptedBase64}`;
  }

  function base64urlencode(buffer: ArrayBuffer) {
    const uint8Array = new Uint8Array(buffer);
    let base64 = "";
    uint8Array.forEach(byte => base64 += String.fromCharCode(byte));
    return window.btoa(base64)
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }

  return (
    <>
      <Alert>
        <Typography level="title-lg">{currentEpisode.filename}</Typography>
      </Alert>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          paddingBottom: "56.25%", 
          borderRadius: "8px",
          border: "1px solid rgba(61, 71, 81, 0.3)",
          overflow: "hidden",
        }}
      >
        {isLoading && (
          <div style={{ 
            position: "absolute", 
            top: "50%", 
            left: "50%", 
            transform: "translate(-50%, -50%)" 
          }}>
            <Typography>Đang tải video...</Typography>
          </div>
        )}
        {error && !encodedLink && (
          <div style={{ 
            position: "absolute", 
            top: "50%", 
            left: "50%", 
            transform: "translate(-50%, -50%)",
            color: "red" 
          }}>
            <Typography>{error}</Typography>
          </div>
        )}
        {encodedLink && (
          <iframe
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
            src={`https://rcp-clowphim.blogspot.com/share/${encodedLink}`}
            frameBorder="0"
            allow="fullscreen"
          ></iframe>
        )}
      </Box>
    </>
  );
};

export default SectionVideoPlayer;
