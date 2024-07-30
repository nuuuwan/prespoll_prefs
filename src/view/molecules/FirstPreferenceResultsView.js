import { Box, Typography } from "@mui/material";
import { CandidateView } from "../atoms";

export default function FirstPreferenceResultsView({ election }) {
  const entries = [...election.firstPreferenceResults.entries()];
  const nTotalValidVotes = election.nTotalValidVotes;
  const minVotesToWin = election.minVotesToWin;
  const hasOutrightWinner = election.hasOutrightWinner;
  return (
    <Box sx={{ m: 1, p: 1, display: "inline-block" }}>
      <Typography variant="h4">First Preference Results</Typography>
      <Typography variant="body1">
        {minVotesToWin} Votes Needed to Win Outright
      </Typography>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>1st</th>
            <th>%</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {entries.map(function ([candidate, nVotes], i) {
            const pVotes = nVotes / nTotalValidVotes;

            let emoji = "";
            if (hasOutrightWinner) {
              emoji = i === 0 ? "✔️" : "❌";
            } else {
              emoji = i >= 2 ? "❌" : "❔";
            }
            return (
              <tr key={"candidate-" + i}>
                <td>
                  <CandidateView candidate={candidate} />
                </td>
                <td>
                  <Typography>{nVotes}</Typography>
                </td>
                <td>
                  <Typography>
                    {pVotes.toLocaleString(undefined, {
                      style: "percent",
                      minimumFractionDigits: 0,
                    })}
                  </Typography>
                </td>
                <td>{emoji}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Typography variant="body1">
        {election.hasOutrightWinner
          ? "✔️ Outright Winner."
          : "❔ No Outright Winner (based on 1st Pref. Votes)."}
      </Typography>
      <Typography variant="body1">❌ Eliminated</Typography>
    </Box>
  );
}
