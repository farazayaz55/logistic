import { ChangeEvent, useState } from "react";
import { api } from "@/utils/trpc";
import {
  Container,
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Input,
  Checkbox,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { MyProSidebarProvider } from "../Components/Sidebar/sidebarContext";
import Navbar from "../Components/Navbar";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { TbArrowNarrowDown, TbArrowNarrowUp } from "react-icons/tb";
import Image from "next/image";

const Tracking = () => {
  const [selectedValue, setSelectedValue] = useState("sea");
  const [trackingNumber,setTrackingNumber]=useState()
  const [table,setTable]=useState(false)
  const mutateFn=api.airSolutions.getTrackingDetails.useMutation()
  const handleSeaTracking = () => {};
  const handleAirTracking = () => {
    setTable(true)
    mutateFn.mutate({
      trackingNumber:trackingNumber
    })
  };
  const codes = [
    {
      value: "23Za",
      label: "23Za",
    },
    {
      value: "22G5",
      label: "22G5",
    },
    {
      value: "33Bu",
      label: "33Bu",
    },
  ];

  const [flight, setFlight] = useState<string>("");

  const handleRadio = (event:ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };
  const RADIO = styled(Radio)({
    color: "#000",
    "&.Mui-checked": {
      color: "#000",
    },
  });

  return (
    <MyProSidebarProvider>
      <div style={{ height: "100%", width: "100%" }}>
        <main>
          <Box
            sx={{ margin: "20px", background: "#fff", borderRadius: "15px" }}
          >
            <Navbar />
          </Box>
          <Container>
            <Grid container spacing={2}>
              <Grid item sm={12} md={12} lg={12} sx={{ height: "50%" }}>
                <Box
                  sx={{
                    width: "100%",
                    borderRadius: "15px",
                    backgroundColor: "#fff",
                    padding: "30px 0px 30px 0px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "30px",
                      textAlign: "center",
                      color: "#00254d",
                    }}
                  >
                    Tracking
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Image
      src="https://img.freepik.com/premium-vector/global-transportation-system-abstract-concept-vector-illustration_107173-31150.jpg?w=740"
      alt="Global transportation system"
      height={300}
      width={740}
    />

                  </Box>
                  <Card sx={{ width: "80%", marginLeft: "10%" }}>
                    <CardContent>
                      <Box>
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                        >
                          <FormControlLabel
                            value="sea"
                            control={<RADIO />}
                            label="Sea Tracking"
                            onChange={handleRadio}
                            checked={selectedValue === "sea"}
                          />
                          <FormControlLabel
                            value="air"
                            control={<RADIO />}
                            label="Air Tracking"
                            onChange={handleRadio}
                            checked={selectedValue === "air"}
                          />
                        </RadioGroup>
                      </Box>
                      {selectedValue === "air" ? (
                        <>
                          <Grid container spacing={2}>
                            <Grid item sm={2} md={2} lg={2}>
                              <TextField
                                select
                                margin="normal"
                                required
                                fullWidth
                                name="company"
                                label="Company"
                                type="company"
                                id="company"
                                defaultValue="33Bu"
                              >
                                {codes.map((option) => (
                                  <MenuItem
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </Grid>
                            <Grid item sm={10} md={6} lg={6}>
                              <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="Number"
                                label="Tracking Number"
                                type="text"
                                id="Trackingnumber"
                                value={trackingNumber}
                                onChange={(event)=>setTrackingNumber(event.target.value)}
                              />
                            </Grid>
                            <Grid item sm={12} md={4} lg={4}>
                              <Button
                                onClick={handleAirTracking}
                                sx={{
                                  marginTop: "15px",
                                  textTransform: "none",
                                  background: "#00254d",
                                  color: "#fff",
                                  height: "50px",
                                  padding: "10px 20px 10px 20px",
                                  "&:hover": {
                                    background: "#00254d",
                                    color: "#fff",
                                  },
                                }}
                              >
                                Track
                              </Button>
                            </Grid>
                          </Grid>
                        </>
                      ) : (
                        ""
                      )}
                      {selectedValue === "sea" ? (
                        <>
                          <Grid container spacing={2}>
                           
                            <Grid item sm={10} md={8} lg={8}>
                              <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="billNo"
                                label="B/L No Or Container No"
                                type="text"
                                id="billNo"
                              />
                            </Grid>
                            <Grid item sm={12} md={4} lg={4}>
                              <Button
                                onClick={handleSeaTracking}
                                sx={{
                                  marginTop: "15px",
                                  textTransform: "none",
                                  background: "#00254d",
                                  color: "#fff",
                                  height: "50px",
                                  padding: "10px 20px 10px 20px",
                                  "&:hover": {
                                    background: "#00254d",
                                    color: "#fff",
                                  },
                                }}
                              >
                                Track
                              </Button>
                            </Grid>
                          </Grid>
                        </>
                      ) : (
                        ""
                      )}
                    </CardContent>
                  </Card>
                </Box>
              </Grid>
              {
                table?(
                  <table
                  className="table"
                  style={{ width: "100%", marginBottom: "30px" }}
                >
                  {/* head */}
                  <thead>
                    <tr>
                      <th>
                        <label>
                          <input type="checkbox" className="checkbox" />
                        </label>
                      </th>
                      <th>Airline</th>
                      <th>Flight Number</th>
                      <th>Altitude</th>
                      <th>Latitude </th>
                      <th>Longitude</th>
                      <th>Speed</th>
                    </tr>
                  </thead>

                  <tbody>
                    {
                      mutateFn.data?.map((freight:object)=>{
                        return(
                          <>
                          <tr>
                          <th>
                        <label>
                          <input type="checkbox" className="checkbox" />
                        </label>
                      </th>
                      <td>{freight.airline.icaoCode}</td>
                      <td>{freight.flight.iataNumber}</td>
                      <td>{freight.geography.altitude}</td>
                      <td>{freight.geography.latitude}</td>
                      <td>{freight.geography.longitude}</td>
                      <td>{freight.speed.horizontal}</td>


                          </tr>
                          </>
                        )
                      })
                    }
                  </tbody>
                </table>
                ):("")
              }
            </Grid>
          </Container>
        </main>
      </div>
    </MyProSidebarProvider>
  );
};

export default Tracking;
