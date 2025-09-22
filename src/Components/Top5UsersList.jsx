import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Box,
  Chip,
  Card,
  IconButton,
  CardHeader,
  Collapse,
} from "@mui/material";
import { Stars } from "@mui/icons-material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import PersonIcon from "@mui/icons-material/Person";
// Lang
import { useTranslation } from "react-i18next";
// API
import useGetTop5MarketerApi from "../API/useGetTop5MarketerApi";

const Top5UsersList = ({ languageText }) => {
  //
  const { t } = useTranslation();
  //
  const { data: users, fetchStatus, isSuccess } = useGetTop5MarketerApi();
  //
  const [expanded, setExpanded] = useState(isSuccess);
  //

  useEffect(() => {
    setExpanded(isSuccess);
  }, [isSuccess]);

  // Function to format name (full name but last name as first letter only)
  const formatName = (fullName) => {
    const nameParts = fullName.trim().split(" ");
    if (nameParts.length === 1) {
      return nameParts[0]; // Only one name
    }

    // Keep all names except the last one, then add first letter of last name
    const allExceptLast = nameParts[0];
    const lastNameFirstLetter = nameParts[nameParts.length - 1].charAt(0);

    return `${allExceptLast}`;
  };

  // Sort users by points in descending order and take top 5
  const top5Users = users?.sort((a, b) => b.points - a.points).slice(0, 5);

  // Function to get rank styling and icon
  const getRankStyling = (index) => {
    const styles = [
      {
        icon: "#1",
      },
      {
        icon: "#2",
      },
      {
        icon: "#3",
      },
      {
        icon: "#4",
      },
      {
        icon: "#5",
      },
    ];

    return (
      styles[index] ||
      {
        // bgcolor: "#757575",
        // color: "#FFF",
        // icon: (index + 1).toString(),
        // gradient: "linear-gradient(45deg, #757575 30%, #616161 90%)",
      }
    );
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      dir={languageText === "ar" ? "rtl" : "ltr"}
      elevation={0}
      sx={{
        maxWidth: "1440px",
        margin: "auto",
        mt: 3,
        overflow: "hidden",
        marginBottom: "32px",
        borderRadius: "9px",
        width: "100%",
      }}
    >
      {/* Header */}
      <CardHeader
        // avatar={<EmojiEvents sx={{ color: "#FFD700", fontSize: 32 }} />}
        action={
          <IconButton
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show users"
            sx={{
              color: "#fff",
              transform: expanded ? "rotate(0deg)" : "rotate(180deg)",
              transition: "transform 0.3s ease",
            }}
          >
            <ExpandLessIcon />
          </IconButton>
        }
        title={
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: "bold",
              color: "#fff",
              fontSize: "24px",
            }}
          >
            {t("Top5Component.title")}
          </Typography>
        }
        // subheader={
        //   <Typography variant="body2" sx={{ color: "#c7dff7" }}>
        //     {t("Top5Component.subTitle")}
        //   </Typography>
        // }
        sx={{
          bgcolor: "#056ccc",
          "& .MuiCardHeader-action": {
            margin: 0,
            alignSelf: "center",
          },
        }}
      />

      {/* Users List */}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <List sx={{ p: 2, paddingBottom: 0 }}>
          {top5Users?.map((user, index) => {
            const rankStyle = getRankStyling(index);

            return (
              <React.Fragment key={user.id}>
                <ListItem
                  sx={{
                    gap: { xs: "0px", sm: "16px" }, // 0px on extra small, 16px on small and up
                    py: 2,
                    px: 2,
                    // paddingRight: { xs: "0px", sm: "16px" },
                    transition: "all 0.3s ease",
                    // backgroundColor: "red",
                    marginBottom: "16px",
                    borderRadius: "12px",
                    boxShadow: "rgba(0, 0, 0, 0.05) 0px 4px 12px",
                    border: "1px solid #7575751b",

                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 6px 16px rgba(0, 0, 0, 0.1)",
                    },
                  }}
                >
                  {/* Rank Avatar */}
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        width: { xs: 35, sm: 48 },
                        height: { xs: 35, sm: 48 },
                        backgroundColor: "#757575d0",
                      }}
                    >
                      <PersonIcon sx={{ color: "#fff", fontSize: { xs: "28px", sm: "42px" } }} />
                    </Avatar>
                  </ListItemAvatar>

                  {/* User Information */}
                  <ListItemText
                    primary={
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                        <Typography
                          variant="h6"
                          component="div"
                          dir="rtl"
                          sx={{
                            fontWeight: 600,
                            color: "#1a1a1a",
                            fontSize: { xs: "16px", sm: "20px" },
                          }}
                        >
                          {formatName(user.clientName)}
                        </Typography>
                        {index === 0 && <span>🥇</span>}
                        {index === 1 && <span>🥈</span>}
                        {index === 2 && <span>🥉</span>}
                      </Box>
                    }
                    secondary={
                      <Typography component="div">
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Chip
                              label={user.isActive ? user.code : "غير نشط"}
                              size="small"
                              variant="outlined"
                              sx={{
                                fontSize: "0.75rem",
                                fontWeight: "bold",
                                color: user.isActive ? "#164546" : "default",
                                borderColor: user.isActive ? "#164546" : "default",
                              }}
                            />
                          </Box>
                        </Box>
                      </Typography>
                    }
                  />

                  {/* Rank Number */}
                  <Box sx={{ textAlign: "center", minWidth: 60 }}>
                    {/* <Typography
                    variant="h3"
                    sx={{
                      fontWeight: "bold",
                      background: rankStyle.gradient,
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {user.code}
                  </Typography> */}

                    <Chip
                      label={rankStyle.icon}
                      // variant="outlined"

                      sx={{
                        color: "#164546",
                        borderColor: "#757575",
                        fontWeight: "bold",
                        fontSize: "18px",

                        paddingTop: { xs: "18px", sm: "22px" },
                        paddingBottom: { xs: "18px", sm: "22px" },

                        paddingLeft: { xs: "9px", sm: "14px" },
                        paddingRight: { xs: "9px", sm: "14px" },

                        borderRadius: "24px",
                      }}
                    />
                    {/* <Typography variant="caption" color="text.secondary">
                    الكود:
                  </Typography> */}
                  </Box>
                </ListItem>
              </React.Fragment>
            );
          })}
        </List>
      </Collapse>
    </Card>
  );
};

export default Top5UsersList;
