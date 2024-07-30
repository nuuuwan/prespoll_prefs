import Human from "../core/Human";

export default class Candidate extends Human {
  constructor(name, emoji, weight, color) {
    super(name, emoji);
    this.weight = weight;
    this.color = color;
  }
}
