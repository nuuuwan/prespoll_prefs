import { Color } from "../base";
import Candidate from "../core/Candidate";
import Voter from "../core/Voter";
import Ballot from "../core/Ballot";

export default class Election {
  constructor(candidates, voters, ballots) {
    this.candidates = candidates;
    this.voters = voters;
    this.ballots = ballots;
  }

  get nCandidates() {
    return this.candidates.length;
  }

  get nVoters() {
    return this.voters.length;
  }

  get maxPreferences() {
    if (this.nCandidates <= 1) {
      return 0;
    }
    if (this.nCandidates === 2) {
      return 1;
    }
    if (this.nCandidates === 3) {
      return 2;
    }
    return 3;
  }

  get firstPreferenceResults() {
    const idx = new Map();
    for (const candidate of this.candidates) {
      idx.set(candidate, 0);
    }

    for (const ballot of this.ballots) {
      const firstPreferenceCandidate = ballot.preferences[0];
      idx.set(firstPreferenceCandidate, idx.get(firstPreferenceCandidate) + 1);
    }
    const sortedIdx = new Map(
      Array.from(idx.entries()).sort((a, b) => b[1] - a[1])
    );
    return sortedIdx;
  }

  get validBallots() {
    return this.ballots;
  }

  get nTotalValidVotes() {
    return this.validBallots.length;
  }

  get minVotesToWin() {
    return Math.floor(this.nTotalValidVotes / 2) + 1;
  }

  get hasOutrightWinner() {
    for (const nVotes of this.firstPreferenceResults.values()) {
      if (nVotes >= this.minVotesToWin) {
        return true;
      }
    }
    return false;
  }

  get remainingCandidates() {
    return [...this.firstPreferenceResults.keys()].slice(0, 2);
  }

  get secondPreferenceResults() {
    let idx = new Map();
    const remainingCandidates = this.remainingCandidates;

    for (const candidate of remainingCandidates) {
      idx.set(candidate, 0);
    }

    for (const ballot of this.validBallots) {
      const firstPreferenceCandidate = ballot.preferences[0];
      if (remainingCandidates.includes(firstPreferenceCandidate)) {
        continue;
      }
      const secondPreferenceCandidate = ballot.preferences[1];
      if (remainingCandidates.includes(secondPreferenceCandidate)) {
        idx.set(
          secondPreferenceCandidate,
          idx.get(secondPreferenceCandidate) + 1
        );
        continue;
      }
    }
    return idx;
  }

  get thirdPreferenceResults() {
    let idx = new Map();
    const remainingCandidates = this.remainingCandidates;

    for (const candidate of remainingCandidates) {
      idx.set(candidate, 0);
    }

    for (const ballot of this.validBallots) {
      const firstPreferenceCandidate = ballot.preferences[0];
      if (remainingCandidates.includes(firstPreferenceCandidate)) {
        continue;
      }
      const secondPreferenceCandidate = ballot.preferences[1];
      if (remainingCandidates.includes(secondPreferenceCandidate)) {
        continue;
      }

      const thirdPreferenceCandidate = ballot.preferences[2];
      if (remainingCandidates.includes(thirdPreferenceCandidate)) {
        idx.set(
          thirdPreferenceCandidate,
          idx.get(thirdPreferenceCandidate) + 1
        );
      }
    }
    return idx;
  }

  get allPreferenceResults() {
    let idx = new Map();
    const remainingCandidates = this.remainingCandidates;

    for (const candidate of remainingCandidates) {
      idx.set(candidate, 0);
    }

    for (const ballot of this.validBallots) {
      const firstPreferenceCandidate = ballot.preferences[0];
      if (remainingCandidates.includes(firstPreferenceCandidate)) {
        idx.set(
          firstPreferenceCandidate,
          idx.get(firstPreferenceCandidate) + 1
        );
        continue;
      }
      const secondPreferenceCandidate = ballot.preferences[1];
      if (remainingCandidates.includes(secondPreferenceCandidate)) {
        idx.set(
          secondPreferenceCandidate,
          idx.get(secondPreferenceCandidate) + 1
        );
        continue;
      }

      const thirdPreferenceCandidate = ballot.preferences[2];
      if (remainingCandidates.includes(thirdPreferenceCandidate)) {
        idx.set(
          thirdPreferenceCandidate,
          idx.get(thirdPreferenceCandidate) + 1
        );
      }
    }
    const sortedIdx = new Map(
      Array.from(idx.entries()).sort((a, b) => b[1] - a[1])
    );
    return sortedIdx;
  }

  // Random Data

  static getRandomCandidate(candidates) {
    const totalWeight = candidates.reduce(
      (acc, candidate) => acc + candidate.weight,
      0
    );
    let remWeight = totalWeight;

    for (let candidate of candidates) {
      const p = candidate.weight / remWeight;
      if (Math.random() < p) {
        return candidate;
      }
      remWeight -= candidate.weight;
    }

    throw new Error("This should never happen.");
  }

  static getRandomPreferences(election) {
    let preferences = [];
    const candidateCandidates = new Set(election.candidates);
    const actualPreferences =
      Math.floor(Math.random() * election.maxPreferences) + 1;
    for (let i = 0; i < actualPreferences; i++) {
      const candidate = Election.getRandomCandidate([...candidateCandidates]);
      preferences.push(candidate);
      candidateCandidates.delete(candidate);
    }
    return preferences;
  }

  static getRandomCandidates(nCandidates) {
    const candidates = [];
    for (let i = 0; i < nCandidates; i++) {
      const char = String.fromCharCode(65 + (i % 26));
      candidates.push(
        new Candidate(`Candidate ${char}`, undefined, 1, Color.random())
      );
    }
    return candidates;
  }

  static getRandomVoters(nVoters) {
    const voters = [];
    for (let i = 0; i < nVoters; i++) {
      voters.push(new Voter(`Voter ${i + 1}`));
    }
    return voters;
  }

  static getRandomBallots(election) {
    const ballots = [];
    for (const voter of election.voters) {
      const preferences = Election.getRandomPreferences(election);
      const ballot = new Ballot(election, voter, preferences);
      ballots.push(ballot);
    }
    return ballots;
  }

  static random(nCandidates, nVoters) {
    const candidates = Election.getRandomCandidates(nCandidates);
    const voters = Election.getRandomVoters(nVoters);
    const election = new Election(candidates, voters, []);
    election.ballots = Election.getRandomBallots(election);
    return election;
  }

  static getPresPoll2024Candidates() {
    // "IHP MRP Presidential Election Voting Intentions Update May 2024"
    // https://www.ihp.lk/press-releases/ak-dissanayake-39-and-sajith-premadasa-38-continue-bolster-support-presidential
    const NOISE = 20;
    return [
      new Candidate("NPP", "🧔🏻‍♂️", 39 + NOISE, "#f008"),
      new Candidate("SJB", "👨🏻‍🦱", 38 + NOISE, "#2f08"),
      new Candidate("UNP", "🧓🏻", 15 + NOISE, "#0c08"),
      new Candidate("SLPP", "👨🏻", 7 + NOISE, "#8008"),
    ];
  }

  static randomPresPoll2024(nVoters) {
    const candidates = Election.getPresPoll2024Candidates();
    const voters = Election.getRandomVoters(nVoters);
    const election = new Election(candidates, voters, []);
    election.ballots = Election.getRandomBallots(election);
    return election;
  }
}
