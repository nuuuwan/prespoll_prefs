import { Box, Typography } from "@mui/material";

export default function CandidateView({ candidate, iPreference }) {
  let opacity = 1;
  if (iPreference !== undefined) {
    const MIN_OPACITY = 0.1;
    opacity = MIN_OPACITY;
    if (iPreference > -1) {
      opacity = 0.25 + (3 - iPreference) * 0.5 * (1 - MIN_OPACITY);
    }
  }
  return (
    <Box sx={{ background: candidate.color, p: 0.5, opacity }}>
      <Typography>{candidate.nameAndEmoji}</Typography>
    </Box>
  );
}
