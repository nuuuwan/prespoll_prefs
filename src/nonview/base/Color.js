export default class Color {
  static random() {
    // return random hsl color
    const hue = Math.floor(Math.random() * 240);
    const saturation = 100;
    const lightness = 50;
    const alpha = 0.2;
    return `hsla(${hue},${saturation}%,${lightness}%,${alpha})`;
  }
}
