import { Paper, Typography } from "@mui/material";
import { CandidateView } from "../atoms";

export default function BallotView({ ballot }) {
  return (
    <Paper sx={{ m: 1, p: 1, display: "inline-block" }}>
      <Typography variant="h5">{ballot.voter.nameAndEmoji}</Typography>

      <table>
        <tbody>
          {ballot.election.candidates.map(function (candidate, iCandidate) {
            const iPreference = ballot.getPreference(candidate);
            const renderedPreference =
              iPreference === -1 ? "-" : iPreference + 1;
            return (
              <tr key={"candidate-" + iCandidate}>
                <td>
                  <CandidateView
                    candidate={candidate}
                    iPreference={iPreference}
                  />
                </td>
                <td>{renderedPreference}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Paper>
  );
}
