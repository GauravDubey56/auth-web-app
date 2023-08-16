import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/system/Unstable_Grid/Grid";
export default function FeatureCard({ feature }) {
  const showFirstSentence = (text="") => {
    // return text.split(".")[0]
    return text.substring(0, 50);
  }
  const [showText, setShowText] = React.useState(false);
  return (
    // <Grid item xs={12} sm={6}>
    <Card>
      <CardMedia
        component="img"
        alt="image"
        height="140"
        image={feature.imageSrc}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {feature.title}
        </Typography>
          <Typography variant="body2" color="text.secondary">
            {showText ? feature.description: showFirstSentence(feature.description)}
          </Typography>

      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => {
            setShowText(!showText);
          }}
        >
          {showText ? "Show Less": "Lean More"}
        </Button>
      </CardActions>
    </Card>
    // </Grid>
  );
}
