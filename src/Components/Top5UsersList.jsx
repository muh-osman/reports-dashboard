import style from "./Top5UsersList.module.scss";
import React, { useState, useEffect } from "react";
import { Typography, Box, Card, Chip, IconButton, CardHeader, Collapse } from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
// MUI Table
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import InfoIcon from "@mui/icons-material/Info";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import ClickAwayListener from "@mui/material/ClickAwayListener";
// Lang
import { useTranslation } from "react-i18next";
// API
import useGetTop5MarketerApi from "../API/useGetTop5MarketerApi";

// MUI Table
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#f0f4f9",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(order, name, code, monthBalance, reward, clientId) {
  return { order, name, code, monthBalance, reward, clientId };
}

const Top5UsersList = ({ languageText, userId }) => {
  //
  const { t } = useTranslation();
  //
  const { data: users, fetchStatus, isSuccess } = useGetTop5MarketerApi();
  // Check if userId exists in any of the clientId values in the API data to show/hide "الرصيد الشهري" column
  const shouldShowColumn = users?.some((item) => item?.clientId === userId);
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

  // Sort users by monthPoints in descending order and take top 5
  const top5Users = users?.sort((a, b) => b.monthPoints - a.monthPoints).slice(0, 5);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // Create table rows from API data
  const fixedRewards = ["100%", "60%", "40%", "20%", "10%"];
  const rows =
    top5Users?.map((user, index) =>
      createData(
        index + 1, // order
        formatName(user.clientName), // formatted name
        user.code, // code from API
        Math.floor(user?.monthPoints),
        fixedRewards[index] || 0,
        user?.clientId // For comparison with userId
      )
    ) || [];

  //
  const currentDate = new Date();
  const monthYear = currentDate.toLocaleString("default", {
    month: "short",
    year: "numeric",
  });

  //
  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };
  return (
    <Card
      dir={languageText === "ar" ? "rtl" : "ltr"}
      elevation={1}
      sx={{
        maxWidth: "1440px",
        margin: "auto",
        // mt: 3,
        overflow: "hidden",
        // marginBottom: "32px",
        borderRadius: "9px",
        width: "100%",
      }}
    >
      {/* Header */}
      <CardHeader
        dir="ltr"
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
              fontSize: "28px",
              marginBottom: "4px",
            }}
          >
            Top 5
          </Typography>
        }
        subheader={
          <Typography variant="body2" sx={{ color: "#c7dff7" }}>
            {monthYear}
          </Typography>
        }
        sx={{
          padding: { xs: "16px", md: "32px" },
          bgcolor: "#164547",
          "& .MuiCardHeader-action": {
            margin: 0,
            alignSelf: "center",
          },
        }}
      />

      {/* Users List */}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box>
          <div className={style.table_box}>
            <div>
              <TableContainer sx={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }} component={Paper}>
                <Table dir={languageText === "ar" ? "rtl" : "ltr"} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell sx={{ backgroundColor: "#164547 !important", fontWeight: "bold", width: "10%" }} align="center">
                        {t("Top5Component.order")}
                      </StyledTableCell>
                      <StyledTableCell sx={{ backgroundColor: "#164547 !important", fontWeight: "bold", width: "30%" }} align="center">
                        {t("Top5Component.name")}
                      </StyledTableCell>
                      <StyledTableCell sx={{ backgroundColor: "#164547 !important", fontWeight: "bold", width: "30%" }} align="center">
                        {t("Top5Component.code")}
                      </StyledTableCell>

                      {/* الرصيد الشهري */}
                      {/* {shouldShowColumn && (
                        <StyledTableCell
                          sx={{
                            backgroundColor: "#164547 !important",
                            fontWeight: "bold",
                            width: "30%",
                            whiteSpace: "nowrap",
                          }}
                          align="center"
                        >
                          {t("Top5Component.monthBalance")}
                        </StyledTableCell>
                      )} */}

                      <StyledTableCell
                        dir={languageText === "ar" ? "ltr" : "rtl"}
                        sx={{
                          backgroundColor: "#164547 !important",
                          fontWeight: "bold",
                          width: "30%",
                          whiteSpace: "nowrap",
                        }}
                        align="center"
                      >
                        <ClickAwayListener onClickAway={handleTooltipClose}>
                          <span>
                            <Tooltip
                              onClose={handleTooltipClose}
                              open={open}
                              disableFocusListener
                              disableHoverListener
                              disableTouchListener
                              title={t("Top5Component.percentageOfCommission")}
                              slotProps={{
                                popper: {
                                  disablePortal: true,
                                },
                              }}
                            >
                              <Button onClick={handleTooltipOpen} sx={{ padding: 0, minWidth: "unset" }}>
                                <InfoIcon
                                  sx={{
                                    verticalAlign: "middle",
                                    color: "#fff",
                                    ...(languageText === "ar" ? { marginRight: "5px" } : { marginLeft: "5px" }),
                                    fontSize: "18px",
                                  }}
                                />
                              </Button>
                            </Tooltip>
                          </span>
                        </ClickAwayListener>

                        {t("Top5Component.reward")}
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <StyledTableRow key={row.name}>
                        <StyledTableCell sx={{ width: "10%" }} align="center">
                          {row.order}
                        </StyledTableCell>
                        <StyledTableCell sx={{ width: "30%" }} align="center">
                          {row.name}
                        </StyledTableCell>
                        <StyledTableCell sx={{ width: "30%" }} align="center">
                          <Chip
                            label={row.code}
                            // color="primary"
                            variant="outlined"
                            sx={{
                              fontWeight: "bold",
                              minWidth: "70px",
                            }}
                          />
                        </StyledTableCell>

                        {/* الرصيد الشهري */}
                        {/* {shouldShowColumn && (
                          <StyledTableCell sx={{ width: "30%" }} align="center">
                            {row.clientId === userId ? row.monthBalance : "-"}
                          </StyledTableCell>
                        )} */}

                        <StyledTableCell sx={{ width: "30%" }} align="center">
                          {row.reward}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </Box>
      </Collapse>
    </Card>
  );
};

export default Top5UsersList;
