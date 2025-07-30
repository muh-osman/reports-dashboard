// FalakVideo.jsx
import React, { useState } from "react";
import { Grid, Card, CardMedia, CardActions, Button } from "@mui/material";
import useGetAllFalakVideosApi from "../API/useGetAllFalakVideosApi";
import { useDownloadFalkVideoApi } from "../API/useDownloadFalkVideoApi";

const FalakVideo = ({ code, percent, overlayRef, t }) => {
  const { data } = useGetAllFalakVideosApi();
  const { mutate: downloadVideo, isPending } = useDownloadFalkVideoApi(code, percent, overlayRef, t);
  const [pendingVideos, setPendingVideos] = useState({});

  const handleDownload = (videoId) => {
    setPendingVideos((prev) => ({ ...prev, [videoId]: true }));
    downloadVideo(
      { id: videoId },
      {
        onSettled: () => {
          setPendingVideos((prev) => ({ ...prev, [videoId]: false }));
        },
      }
    );
  };

  return (
    <Grid
      container
      spacing={3}
      sx={{ marginTop: "16px", justifyContent: "center" }}
    >
      {data?.data?.map((video) => (
        <Grid item xs={12} sm={6} md={4} key={video.id}>
          <Card>
            <CardMedia
              component="video"
              src={video.video_url}
              controls
              sx={{ height: 200 }}
              crossOrigin="anonymous"
            />
            <CardActions sx={{ justifyContent: "space-between" }}>
              <Button
                onClick={() => handleDownload(video.id)}
                disabled={pendingVideos[video.id]} // Use local pending state
                variant="contained"
                size="medium"
                sx={{ width: "100%" }}
              >
                {pendingVideos[video.id] ? "جاري المعالجة..." : "تحميل"}
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default FalakVideo;
