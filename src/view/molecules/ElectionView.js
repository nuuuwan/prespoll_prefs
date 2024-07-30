import { Box, Typography } from "@mui/material";
import BallotView from "./BallotView";
import FirstPreferenceResultsView from "./FirstPreferenceResultsView";
import AllPreferenceResultsView from "./AllPreferenceResultsView";

export default function ElectionView({ election }) {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6">Presidential Election Simulator</Typography>
      <Typography variant="h4">Ballots Cast</Typography>

      {election.ballots.map(function (ballot, i) {
        return <BallotView key={"ballot-" + i} ballot={ballot} />;
      })}

      <Box sx={{ m: 2 }}>
        <FirstPreferenceResultsView election={election} />
        <AllPreferenceResultsView election={election} />
      </Box>
    </Box>
  );
}
