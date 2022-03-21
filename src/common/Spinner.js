import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { CircularProgress, circularProgressClasses } from "@mui/material";
import MKBox from "../components/MKComponents/MKBox";

export default function Spinner() {
  return (
    <MKBox component="section" py={6} mt={6}>
      <Container>
        <Grid
          container
          item
          xs={12}
          lg={12}
          mx="auto"
          justifyContent="center"
          flexDirection="column"
          alignContent="center"
        >
          <CircularProgress
            variant="indeterminate"
            disableShrink
            sx={{
              color: (theme) => (theme.palette.mode === "light" ? "#1a90ff" : "#308fe8"),
              animationDuration: "550ms",
              [`& .${circularProgressClasses.circle}`]: {
                strokeLinecap: "round",
              },
            }}
            size={40}
            thickness={4}
          />
        </Grid>
      </Container>
    </MKBox>
  );
}
