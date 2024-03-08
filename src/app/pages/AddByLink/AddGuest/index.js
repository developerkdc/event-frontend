import React from "react";
import {
  Autocomplete,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material"; // Import Material-UI icons
import { LoadingButton } from "@mui/lab";
import Button from "@mui/material/Button";
import { Form, Formik, FieldArray } from "formik";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Axios } from "app/services/config";
import ToastAlerts from "app/components/Toast";
import Div from "@jumbo/shared/Div";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { isValidEmail } from "@jumbo/utils";
import dayjs from "dayjs";
const AddGuestByLink = () => {
  const navigate = useNavigate();
  const showAlert = ToastAlerts();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  // console.log(id);

  var initialValues = {
    first_name: "",
    last_name: "",
    email_id: "",
    password: "",
    mobile_no: "",
    blood_group: "",
    gender: "",
    dob: "",
    refer_by_id: id ? id : null,
    member: [],
  };
  const validationSchema = yup.object({
    dob: yup
      .date()
      .test("not-current-date", "Enter Valid Date of Birth", function (value) {
        if (!value) {
          // Handle case where value is not provided
          return false;
        }

        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0); // Set time to midnight

        return value < currentDate; // Change this to <= to allow the current date
      })
      .required("Date Of Birth is required"),
    // .matches(/^[0-9]+$/, "User ID must be a number"),
    first_name: yup
      .string("Enter First Name")
      .required("First Name is required")
      .matches(/^[A-Za-z]+$/, "First Name must contain only alphabetic characters"),

    last_name: yup
      .string("Enter Last Name")
      .required("Last Name is required")
      .matches(/^[A-Za-z]+$/, "Last Name must contain only alphabetic characters"),
    email_id: yup
      .string("Enter your Email ID")
      .required("Email is required")
      .test(
        "isValidEmail",
        "Email should contain lover case characters, '@' and '.' symbols",
        (value) => isValidEmail(value) // Check if the email is valid
      ),
    mobile_no: yup
      .string()
      .typeError("Phone number must be a number")
      .required("Phone Number is Required")
      .matches(/^\d{10}$/, "Number should be 10 digits."),
    password: yup.string().required("Password is Required"),
    gender: yup.string().required("Gender is Required"),
    member: yup.array(
      yup.object({
        first_name: yup
          .string("Enter First Name")
          .required("First Name is required")
          .matches(/^[A-Za-z]+$/, "First Name must contain only alphabetic characters"),
        last_name: yup
          .string("Enter Last Name")
          .required("Last Name is required")
          .matches(/^[A-Za-z]+$/, "Last Name must contain only alphabetic characters"),
        email_id: yup
          .string("Enter your Email ID")
          .test("isValidEmail", "Email should contain lover case characters, '@' and '.' symbols", (value) => {
            // Check if the value is not null or empty before validating email format
            if (value && value.trim() !== "") {
              return isValidEmail(value); // Check if the email is valid
            }
            return true; // Return true if value is null or empty
          }),
        mobile_no: yup
          .string()
          .typeError("Phone number must be a number")
          .test("isValidMobileNumber", "Number should be 10 digits.", (value) => {
            // Check if the value is not null or empty before validating mobile number format
            if (value && value.trim() !== "") {
              // Use a regular expression to check if the number has 10 digits
              return /^\d{10}$/.test(value);
            }
            return true; // Return true if value is null or empty
          }),
        dob: yup
          .date()
          .test("not-current-date", "Enter Valid Date of Birth", function (value) {
            if (!value) {
              // Handle case where value is not provided
              return false;
            }

            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0); // Set time to midnight

            return value < currentDate; // Change this to <= to allow the current date
          })
          .required("Date Of Birth is required"),
        relation: yup.string().required("Relation is required"),
        gender: yup.string().required("Gender is Required"),
      })
    ),
  });

  const handleMemberAdd = async (data,setSubmitting) => {
    try {
      // console.log(data);
      setSubmitting(true);
      await Axios.post("/guest/add", data);
      showAlert("success", "Register successfully.QR Code has been sent on email Id.");
      setSubmitting(false);
      // navigate("/");
    } catch (error) {
      showAlert("error", error.response.data.message);
      setSubmitting(false);
    }
  };

  return (
    <React.Fragment>
      <Div
        sx={{
          mx: {
            xs: "10px", // Margin for extra small screens
            sm: "20px", // Margin for small screens
            md: "50px", // Margin for medium screens and above
          },
          my: {
            xs: "30px", // Margin for extra small screens
            sm: "20px", // Margin for small screens
            md: "50px", // Margin for medium screens and above
          },
        }}
      >
        <Typography variant="h2" mb={3} sx={{
          textAlign: {
            xs: "center"
          },
        }}>
          ADD GUEST DETAILS
        </Typography>
        <Card>
          <CardContent>
            <Formik
              validateOnChange={true}
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(data, { setSubmitting }) => {
                validationSchema
                  .validate(data, { abortEarly: false })
                  .then(() => {
                    handleMemberAdd(data,setSubmitting);
                    // setSubmitting(false);
                  })
                  .catch((validationErrors) => {
                    console.error("Validation Errors:", validationErrors);
                    setSubmitting(false);
                  });
              }}
            >
              {({ setFieldValue, isSubmitting, values, errors, touched }) => (
                <Form noValidate autoComplete="off">
                  <Grid container rowSpacing={3} columnSpacing={3}>
                    <Grid item xs={12} md={6}>
                      <JumboTextField fullWidth id="first_name" name="first_name" label="First name" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <JumboTextField fullWidth id="last_name" name="last_name" label="Last name" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <JumboTextField fullWidth id="email_id" name="email_id" label="Email" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <JumboTextField fullWidth id="password" name="password" label="Password" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <JumboTextField fullWidth type="number" id="mobile_no" name="mobile_no" label="Phone No" />
                    </Grid>
                    <Grid item  xs={12} md={6}>
                      <FormControl fullWidth error={errors.gender && touched.gender}>
                        <Autocomplete
                          fullWidth
                          size="small"
                          disablePortal
                          // getOptionLabel={(option) => option.role_name}
                          options={["Male", "Female", "Other"]}
                          name="gender"
                          onChange={(event, val) => {
                            setFieldValue("gender", val);
                          }}
                          renderInput={(params) => <TextField error={errors.gender && touched.gender} {...params} label="Gender" />}
                        />
                        {errors && errors.gender && touched.gender && <FormHelperText>{errors.gender}</FormHelperText>}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <JumboTextField fullWidth id="blood_group" name="blood_group" label="Blood Group" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      {/* <FormControl key={values.dob} fullWidth error={errors.dob && touched.dob}> */}
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Date of Birth"
                          id="dob"
                          format="DD-MM-YYYY"
                          name="dob"
                          value={values.dob ? dayjs(values.dob) : null}
                          onChange={(newValue) => {
                            setFieldValue("dob", newValue);
                          }}
                          sx={{
                            "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
                              borderColor: "red !important", // Border color when error is present
                            },
                            width: "100%",
                          }}
                          slotProps={{ textField: { size: "small", error: errors?.dob && touched?.dob } }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              name="dob"
                              // error={Boolean(errors?.member?.[index]?.dob)} // Set error prop based on validation
                              error={errors?.dob && touched?.dob} // Set error prop based on validation
                            />
                          )}
                        />
                      </LocalizationProvider>
                      {errors.dob && touched.dob && (
                        <FormHelperText
                          sx={{
                            color: "#E73145",
                            fontSize: "11px",
                            mt: 0.7,
                            ml: 1.5,
                          }}
                        >
                          {errors.dob}
                        </FormHelperText>
                      )}
                      {/* </FormControl> */}
                    </Grid>

                    {/* <Grid item xs={3}></Grid> */}
                    {/* <Grid item xs={6} alignContent="center">
                    <FormControlLabel
                      style={{ padding: "0px", margin: "0px", height: "100%" }}
                      control={
                        <Switch
                          onChange={(e) => {
                            setFieldValue("status", values.status ? false : true);
                          }}
                          defaultChecked={values.status ? true : false}
                          color="primary"
                        />
                      }
                      label="Status"
                      name="status"
                      labelPlacement="start"
                    />
                  </Grid> */}
                  </Grid>
                  <Grid item xs={12} alignContent="center">
                    <FieldArray
                      name="member"
                      render={(arrayHelpers) => (
                        <Div sx={{ mt: "20px" }}>
                          {values?.member?.map((member, index) => (
                            <Div
                              key={index}
                              sx={{
                                marginTop: "10px",
                                display: "flex",
                                flexWrap: "wrap",
                                alignItems: "flex-start",
                                justifyContent: "center",
                              }}
                            >
                              <Div sx={{ display: "flex", flexDirection: "column", width: "97%" }}>
                                <Typography variant="h5">{`Member ${index + 1}`}</Typography>
                                <Grid container rowSpacing={3} columnSpacing={3}>
                                  <Grid item xs={12} md={3} lg={2}>
                                    <JumboTextField fullWidth id="first_name" name={`member.${index}.first_name`} label="First Name" />
                                  </Grid>
                                  <Grid item xs={12} md={3} lg={2}>
                                    <JumboTextField fullWidth id="last_name" name={`member.${index}.last_name`} label="Last Name" />
                                  </Grid>
                                  <Grid item xs={12} md={3} lg={2}>
                                    <JumboTextField
                                      fullWidth
                                      id="mobile_no"
                                      type="number"
                                      name={`member.${index}.mobile_no`}
                                      label="Phone No"
                                    />
                                  </Grid>
                                  <Grid item xs={12} md={3} lg={2}>
                                    <JumboTextField fullWidth id="email_id" name={`member.${index}.email_id`} label="Email ID" />
                                  </Grid>
                                  <Grid item xs={12} md={3} lg={2}>
                                    <JumboTextField fullWidth id="blood_group" name={`member.${index}.blood_group`} label="Blood Group" />
                                  </Grid>
                                  <Grid item xs={12} md={3} lg={2}>
                                    <FormControl fullWidth error={errors?.member?.[index]?.gender && touched?.member?.[index]?.gender}>
                                      <Autocomplete
                                        fullWidth
                                        size="small"
                                        disablePortal
                                        // getOptionLabel={(option) => option.role_name}
                                        options={["Male", "Female", "Other"]}
                                        name={`member.${index}.gender`}
                                        onChange={(event, val) => {
                                          setFieldValue(`member.${index}.gender`, val);
                                        }}
                                        renderInput={(params) => (
                                          <TextField
                                            error={errors?.member?.[index]?.gender && touched?.member?.[index]?.gender}
                                            {...params}
                                            label="Gender"
                                          />
                                        )}
                                      />
                                      {errors && errors?.member?.[index]?.gender && touched?.member?.[index]?.gender && (
                                        <FormHelperText>{errors?.member?.[index]?.gender}</FormHelperText>
                                      )}
                                    </FormControl>
                                  </Grid>
                                  <Grid item xs={12} md={3} lg={2}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                      <DatePicker
                                        label="Date of Birth"
                                        id="dob"
                                        fullWidth
                                        width="100%"
                                        format="DD-MM-YYYY"
                                        name={`member.${index}.dob`}
                                        sx={{
                                          "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "red !important", // Border color when error is present
                                          },
                                          width: "100%",
                                        }}
                                        value={values?.member?.[index]?.dob ? dayjs(values?.member?.[index]?.dob) : null}
                                        onChange={(newValue) => {
                                          setFieldValue(`member.${index}.dob`, newValue);
                                        }}
                                        slotProps={{
                                          textField: {
                                            size: "small",
                                            error: errors?.member?.[index]?.dob && touched?.member?.[index]?.dob,
                                          }, // Set error prop based on validation
                                        }}
                                        renderInput={(params) => (
                                          <TextField
                                            {...params}
                                            name={`member.${index}.dob`}
                                            // error={Boolean(errors?.member?.[index]?.dob)} // Set error prop based on validation
                                            error={errors?.member?.[index]?.dob && touched?.member?.[index]?.dob} // Set error prop based on validation
                                          />
                                        )}
                                      />
                                    </LocalizationProvider>

                                    {errors?.member?.[index]?.dob && touched?.member?.[index]?.dob && (
                                      <FormHelperText
                                        sx={{
                                          color: "#E73145",
                                          fontSize: "11px",
                                          mt: 0.7,
                                          ml: 1.5,
                                        }}
                                      >
                                        {errors?.member?.[index]?.dob}
                                      </FormHelperText>
                                    )}
                                  </Grid>
                                  <Grid item xs={12} md={3} lg={2}>
                                    <JumboTextField fullWidth id="relation" name={`member.${index}.relation`} label="Relation" />
                                  </Grid>
                                </Grid>
                              </Div>
                              <Div sx={{ mt: "10px" }}>
                                <RemoveCircleOutline
                                  onClick={() => arrayHelpers.remove(index)}
                                  sx={{
                                    // ml: 2,
                                    // mt: errors?.member && touched?.member ? 0.5 : 3.5,
                                    color: "red",
                                    ":hover": { cursor: "pointer" },
                                  }}
                                />
                              </Div>
                            </Div>
                          ))}
                          <Div
                            sx={{
                              display: "flex",
                              mt: 2,
                              alignItems: "center",
                              width: "200px",
                              ":hover": {
                                cursor: "pointer",
                                color: "black",
                                fontWeight: "600",
                              },
                            }}
                            onClick={() =>
                              arrayHelpers.push({
                                first_name: "",
                                last_name: "",
                                email_id: "",
                                mobile_no: "",
                                dob: "",
                                relation: "",
                                blood_group: "",
                                gender: "",
                              })
                            }
                          >
                            <AddCircleOutline />
                            <Typography
                              sx={{
                                fontSize: "15px",
                                fontWeight: "500",
                                ml: 1.5,

                                ":hover": { cursor: "pointer", color: "black" },
                              }}
                            >
                              Add Member
                            </Typography>
                          </Div>
                        </Div>
                      )}
                    />
                  </Grid>

                  <Grid container columnSpacing={3} mt={5}>
                    <Grid item xs={12} textAlign="center">
                      <LoadingButton variant="contained" size="medium" type="submit" loading={isSubmitting}>
                        Register
                      </LoadingButton>
                    </Grid>
                    {/* <Grid item xs={6} textAlign="left">
                    <Button
                      variant="outlined"
                      onClick={() => {
                        Swal.fire({
                          title: "Are you sure you want to cancel?",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonText: "Yes",
                          cancelButtonText: "No",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            navigate("/");
                          }
                        });
                      }}
                    >
                      Cancel
                    </Button>
                  </Grid> */}
                  </Grid>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </Div>
    </React.Fragment>
  );
};

export default AddGuestByLink;
