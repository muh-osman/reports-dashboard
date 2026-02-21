import style from "./ViewVideosPage.module.scss";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// ReactPlayer
import ReactPlayer from "react-player";
// API
import useGetVideoLinksApi from "../../API/useGetVideoLinksApi";
// Cookies
import { useCookies } from "react-cookie";
// Material-UI
import { Box, Grid, CircularProgress, Alert, Card, CardContent } from "@mui/material";
import VideocamIcon from "@mui/icons-material/Videocam";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
// Images
import thum1 from "../../Assets/Images/thumbnail-3.png";
import thum2 from "../../Assets/Images/thumbnail-2.png";
import thum3 from "../../Assets/Images/thumbnail-1.png";

export default function ViewVideosPage() {
  // Create array of thumbnail images
  const thumbnails = [thum1, thum2, thum3];
  //
  let { cardId } = useParams();
  //
  const [cookies, setCookie] = useCookies(["tokenApp"]);
  //
  const navigate = useNavigate();
  useEffect(() => {
    if (!cookies.tokenApp) {
      navigate(`${process.env.PUBLIC_URL}/login`, { replace: true });
    }
  }, []);

  // State for valid video URLs
  const [videoUrls, setVideoUrls] = useState([]);

  console.log(videoUrls);

  //   Api
  const { data, fetchStatus, isSuccess, error, isLoading } = useGetVideoLinksApi(cardId);

  // Extract valid video URLs when data changes
  // Extract video URLs when data changes
  useEffect(() => {
    if (data?.success && data?.data?.videos) {
      const urls = data.data.videos.map((video) => video.video_url);
      setVideoUrls(urls);
    }
  }, [data]);

  if (isLoading || fetchStatus === "fetching") {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">Error loading videos: {error.message || "Unknown error"}</Alert>
      </Box>
    );
  }

  if (!isSuccess || !data?.success) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="warning">Unable to load video data</Alert>
      </Box>
    );
  }

  return (
    <div className={style.container}>
      <Box>
        {videoUrls.length === 0 ? (
          <Alert severity="info" sx={{ mt: 2 }}>
            No videos available for this report
          </Alert>
        ) : (
          <>
            <Box display="flex" width={"100%"} justifyContent="center" alignItems="center" mb={3}>
              <VideocamIcon sx={{ fontSize: 66, color: "#757575" }} />
            </Box>
            <Grid container spacing={3} justifyContent="center" alignItems="center">
              {videoUrls.map((url, index) => (
                <Grid item xs={12} md={10} lg={8} key={index}>
                  <Card elevation={2}>
                    <CardContent sx={{ padding: "0px !important" }}>
                      <Box
                        sx={{
                          position: "relative",
                          paddingTop: "56.25%", // 16/9
                          borderRadius: 1,
                          overflow: "hidden",
                          bgcolor: "black",
                        }}
                      >
                        <Box
                          sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                          }}
                        >
                          <ReactPlayer
                            light={
                              <img
                                src={thumbnails[index] || thumbnails[0]}
                                alt="Thumbnail"
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            }
                            src={url}
                            controls={true}
                            style={{ width: "100%", height: "auto", aspectRatio: "16/9" }}
                            playIcon={
                              <PlayArrowIcon
                                sx={{
                                  fontSize: 80,
                                  color: "#fff",
                                  backgroundColor: "#174545",
                                  borderRadius: "50%",
                                  border: "4px solid #fff",
                                  //   filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.5))",
                                  transition: "transform 0.2s",
                                  position: "absolute",
                                  "&:hover": {
                                    transform: "scale(1.1)",
                                  },
                                }}
                              />
                            }
                            playing={false}
                          />
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Box>
    </div>
  );
}
