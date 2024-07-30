import Human from "../core/Human";

export default class Candidate extends Human {
  constructor(name, color) {
    super(name);
    this.color = color;
  }
}
