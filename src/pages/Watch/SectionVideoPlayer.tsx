import { useState, useEffect } from "react";
import { Alert, Box, Typography } from "@mui/joy";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

// Hàm mã hóa m3u8 link với AES-CBC
async function encryptWithAES(data: string, key: string) {
  const encoder = new TextEncoder();
  const keyBuffer = encoder.encode(key);
  const iv = crypto.getRandomValues(new Uint8Array(16)); // Random IV for AES

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

const SectionVideoPlayer = () => {
  const [encodedLink, setEncodedLink] = useState<string | null>(null);
  const currentEpisode = useSelector(
    (state: RootState) => state.watch.currentEpisode
  );
  const secretKey = "6848472821384434"; // Your secret key

  useEffect(() => {
    const encodeLink = async () => {
      if (currentEpisode.link_embed) {
        const encoded = await encryptWithAES(currentEpisode.link_embed, secretKey);
        setEncodedLink(encoded);
      }
    };
    encodeLink();
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
        {encodedLink && (
          <iframe
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
            src={`https://cdn-clowphim.blogspot.com/share/${encodedLink}`}
            frameBorder="0"
            allow="fullscreen"
          ></iframe>
        )}
      </Box>
    </>
  );
};

export default SectionVideoPlayer;
