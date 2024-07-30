import { Box, Typography } from "@mui/material";

export default function CandidateView({ candidate, iPreference }) {
  let opacity = 1;
  if (iPreference !== undefined) {
    switch (iPreference) {
      case 0:
        opacity = 1;
        break;
      case 1:
        opacity = 0.6;
        break;
      case 2:
        opacity = 0.4;
        break;
      default:
        opacity = 0.2;
    }
  }
  return (
    <Box sx={{ background: candidate.color, p: 0.5, opacity }}>
      <Typography>{candidate.nameAndEmoji}</Typography>
    </Box>
  );
}
