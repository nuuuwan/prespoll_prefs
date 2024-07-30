export default class Human {
  constructor(name, emoji = undefined) {
    this.name = name;
    this.emoji = emoji || ["👨🏻", "👩🏻"][Math.floor(Math.random() * 2)];
  }

  get nameAndEmoji() {
    return this.emoji + " " + this.name;
  }
}
