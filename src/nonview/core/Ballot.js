export default class Ballot {
  constructor(election, voter, preferences) {
    this.election = election;
    this.voter = voter;
    this.preferences = preferences; // list of candidates in order of preference
  }

  getPreference(candidate) {
    return this.preferences.indexOf(candidate);
  }
}
