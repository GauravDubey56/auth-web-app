import FeatureCard from "./featureCard";
import { featuresConst } from "./dataConstants";
import { Grid } from "@mui/material";
export default function Features() {
  return (
    <>
      <Grid container spacing={2}>
        {featuresConst.map((feature, index) => (
          <Grid key={index} item xs={12} sm={4}>
            <FeatureCard feature={feature} />{" "}
          </Grid>
        ))}
      </Grid>
    </>
  );
}
