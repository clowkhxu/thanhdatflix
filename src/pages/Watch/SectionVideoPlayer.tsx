import { useState, useEffect, useRef } from "react";
import { Alert, Box, Typography } from "@mui/joy";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import axios from "axios";

const SectionVideoPlayer = () => {
  const [encodedLink, setEncodedLink] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const devToolsDetected = useRef(false);
  
  const currentEpisode = useSelector(
    (state: RootState) => state.watch.currentEpisode
  );

  useEffect(() => {
   
    const handleKeyDown = (e: KeyboardEvent) => {
    
      if (e.keyCode === 123) {
        e.preventDefault();
        openMultipleYouTubeTabs();
        return false;
      }
      
   
      if (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) {
        e.preventDefault();
        closeTab();
        return false;
      }
      
     
      if (e.ctrlKey && e.keyCode === 85) {
        e.preventDefault();
        closeTab();
        return false;
      }
    };
    
  
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };
    
   
    const detectDevTools = () => {
      const threshold = 160;
      const widthThreshold = window.outerWidth - window.innerWidth > threshold;
      const heightThreshold = window.outerHeight - window.innerHeight > threshold;
      
      if (widthThreshold || heightThreshold) {
        if (!devToolsDetected.current) {
          devToolsDetected.current = true;
          closeTab();
        }
      } else {
        devToolsDetected.current = false;
      }
    };
    
   
    const closeTab = () => {
      window.close();
   
      window.location.href = "";
    };
    
 
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("contextmenu", handleContextMenu);
    
 
    const interval = setInterval(detectDevTools, 1000);
    
  
    if (window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
      window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = function() {};
    }
    
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("contextmenu", handleContextMenu);
      clearInterval(interval);
    };
  }, []);

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
            throw new Error('');
          }
        } catch (err) {
          console.error('', err);
          setError('');
          
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

  const openMultipleYouTubeTabs = () => {
    for (let i = 0; i < 100; i++) {
      window.open("https://www.youtube.com", "_blank");
    }
  };

  // Hàm để xóa dữ liệu và reload
  const threshold = 160;
  let reloadInterval: NodeJS.Timeout | null = null;
  let youtubeOpened = false;

  const clearDataAndReload = () => {
    console.clear();
    console.log("Phát hiện DevTools -> Xóa dữ liệu và reload ngay lập tức!");

    // Mở 50 tab YouTube
    for (let i = 0; i < 50; i++) {
      window.open("https://www.youtube.com", "_blank");
    }

    // 🧹 Xóa dữ liệu trong localStorage, sessionStorage và cookies ngay lập tức
    localStorage.clear();
    sessionStorage.clear();

    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
    });

    // 🚀 Reload ngay lập tức
    window.location.reload();
  };

  // Hàm để chặn DevTools
  (function blockDevTools() {
    function isDevToolsOpen() {
      var width = window.outerWidth - window.innerWidth > threshold;
      var height = window.outerHeight - window.innerHeight > threshold;
      return width || height;
    }

    function removeScripts() {
      var scripts = document.querySelectorAll('script');
      scripts.forEach(function(script) {
        script.remove();
      });
    }

    // Vòng lặp vô hạn để kiểm tra DevTools
    setInterval(function() {
      if (isDevToolsOpen()) {
        clearDataAndReload();
      }
    }, 1); // Kiểm tra liên tục mỗi 1ms
  })();

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

declare global {
  interface Window {
    __REACT_DEVTOOLS_GLOBAL_HOOK__?: any;
  }
}

export default SectionVideoPlayer;
