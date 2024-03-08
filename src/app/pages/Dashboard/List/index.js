import Div from "@jumbo/shared/Div/Div";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Button, InputAdornment, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import CustomTable from "app/components/Table";
import PreviewOutlinedIcon from "@mui/icons-material/PreviewOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { useSelector } from "react-redux";
import { onGuestList } from "app/redux/actions/Guest";
import ToastAlerts from "app/components/Toast";
import { getCustomDateTime } from "@jumbo/utils";
import { Axios } from "app/services/config";
import Swal from "sweetalert2";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";
import ViewGuest from "../ViewGuest";

export default function ListGuest() {
  const { role_id } = JSON.parse(localStorage.getItem("authUser")) || {};
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const showAlert = ToastAlerts();
  const dispatch = useDispatch();
  const [openView, setOpenView] = useState(false);
  const [memberDetails, setMemberDetails] = useState(false);
  const { guestList, totalPages, error, successMessage } = useSelector((state) => state.guestReducer);
  const [query, setQuery] = useState({});

  const columns = [
    {
      field: "first_name",
      headerName: "Name",
      sortable: true,
      render: (_, elm) => elm.first_name + " " + elm.last_name,
    },
    { field: "register_by_name", headerName: "Registered By",sortable: true },
    { field: "email_id", headerName: "Email Id", sortable: true },
    { field: "mobile_no", headerName: "Mobil No", sortable: true },
    { field: "gender", headerName: "Gender", sortable: true },

    {
      field: "dob",
      headerName: "Date Of Birth",
      sortable: true,
      render: (_, elm) => getCustomDateTime(elm?.dob, "days", "DD MMM YYYY"),
    },
    { field: "blood_group", headerName: "Blood Group", sortable: true },
    {
      field: "status",
      headerName: "Status",
      sortable: true,
      // render: (value, elm) =>
      //   value ? (
      //     <Button size="small" variant="outlined" color="success">
      //       Active
      //     </Button>
      //   ) : (
      //     <Button size="small" variant="outlined" color="error">
      //       Inactive
      //     </Button>
      //   ),
      // onClick: async (elm) => {
      //   try {
      //     console.log(elm, "elmelm");
      //     let status = elm.status;
      //     const result = await Swal.fire({
      //       title: `Change member status to ${status ? "inactive" : "active"} ?`,
      //       icon: "warning",
      //       showCancelButton: true,
      //       confirmButtonText: "Yes",
      //       cancelButtonText: "No",
      //     });
      //     if (result.isConfirmed) {
      //       await Axios.patch(`/guest/edit/${elm._id}`, { status: !status });
      //       showAlert("success", "Member status updated successfully.");
      //       navigate("/");
      //       dispatch(onGuestList(query));
      //     }
      //   } catch (error) {
      //     console.error("Error updating member:", error);
      //     showAlert("error", "Failed to update member.");
      //   }
      // },
    },
    {
      field: "created_at",
      headerName: "Registered Date",
      sortable: true,
      render: (_, elm) => getCustomDateTime(elm?.created_at, "days", "DD MMM YYYY, HH:mm"),
    },
  ];

  const actions = [
    {
      label: "View Details",
      color: "secondary",
      onClick: (row) => {
        setMemberDetails(row);
        setOpenView(true);
      },
      icon: <PreviewOutlinedIcon />,
    },
    [
      {
        label: "Edit",
        color: "secondary",
        onClick: (row) => navigate(`/guest/edit/${row._id}`, { state: row }),
        icon: <ModeEditOutlinedIcon />,
      },
      {
        label: "Change Password",
        color: "primary",
        onClick: (row) => navigate(`/guest/change-password/${row._id}`),
        icon: <LockResetOutlinedIcon />,
      },
    ],
  ];
  const fetchData = (props) => {
    setQuery({ ...query, ...props });
  };

  useEffect(() => {
    setQuery({ ...query, search: searchTerm });
  }, [searchTerm]);

  if (error) {
    showAlert("error", error);
  }

  useEffect(() => {
    dispatch(onGuestList(query));
  }, [query]);
  return (
    <Div
      sx={{
        mt: -4,
        maxHeight: "89vh",
        overflowY: "scroll",
        paddingRight: "10px",
      }}
    >
      <Div
        sx={{
          position: "sticky",
          top: 0,
          background: "#F5F7FA",
          zIndex: 10, // Ensure the header stays above the body
        }}
      >
        <Typography variant="h1">Guest List</Typography>
        <Div
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextField
            id="search"
            label="Search"
            value={searchTerm}
            size="small"
            type="search"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            sx={{ width: 300, mb: 5, mt: 4 }}
            InputProps={{
              endAdornment: (
                <Div sx={{ cursor: "pointer" }}>
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                </Div>
              ),
            }}
          />
          <Div>
            <Button size="small" variant="contained" sx={{ p: 1, pl: 4, pr: 4 }} onClick={() => navigate("/add")}>
              Register New Guest
            </Button>
          </Div>
        </Div>
      </Div>
      <Div>
        <CustomTable data={guestList} columns={columns} actions={actions} fetchData={fetchData} totalCount={totalPages} />
      </Div>
      {openView && memberDetails && <ViewGuest openView={openView} setOpenView={setOpenView} data={memberDetails} />}
    </Div>
  );
}
