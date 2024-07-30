import { Box, Typography } from "@mui/material";
import { CandidateView } from "../atoms";

export default function AllPreferenceResultsView({ election }) {
  const entries = [...election.allPreferenceResults.entries()];
  const idx1 = election.firstPreferenceResults;
  const idx2 = election.secondPreferenceResults;
  const idx3 = election.thirdPreferenceResults;

  const isFlipped = idx1.get(entries[0][0]) < idx1.get(entries[1][0]);

  return (
    <Box sx={{ m: 1, p: 1, display: "inline-block" }}>
      <Typography variant="h4">All Preference Results</Typography>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>1st</th>
            <th>2nd</th>
            <th>3rd</th>
            <th>All</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {entries.map(function ([candidate, nVotes], i) {
            return (
              <tr key={"candidate-" + i}>
                <td>
                  <CandidateView candidate={candidate} />
                </td>
                <td>
                  <Typography variant="body2">{idx1.get(candidate)}</Typography>
                </td>
                <td>
                  <Typography variant="body2">{idx2.get(candidate)}</Typography>
                </td>
                <td>
                  <Typography variant="body2">{idx3.get(candidate)}</Typography>
                </td>
                <td>
                  <Typography variant="title1">{nVotes}</Typography>
                </td>
                <td>{i === 0 ? "✔️" : ""}</td>
                <td>{isFlipped && i === 0 ? "⬆️" : ""}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Typography variant="body1">✔️ Outright Winner</Typography>
      {isFlipped ? (
        <Typography variant="body1">⬆️ Flipped 1st Pref. Result</Typography>
      ) : null}
    </Box>
  );
}
