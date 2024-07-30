export default class Human {
  constructor(name) {
    this.name = name;
    this.emoji = ["👨🏻", "👩🏻"][Math.floor(Math.random() * 2)];
  }

  get nameAndEmoji() {
    return this.emoji + " " + this.name;
  }
}
