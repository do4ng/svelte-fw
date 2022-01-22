export default function GetTime(date = new Date()) {
  return `[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]`;
}
