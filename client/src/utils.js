export function delay(ms) {
  return new Promise(res => setTimeout(res, ms));
}

export const initialFilter = [
  { name: 'Background', options: [
    { name: 'Cherry Red', selected: false },
    { name: 'Creamsicle Orange', selected: false },
    { name: 'Banana Yellow', selected: false },
    { name: 'Slushie Blue', selected: false },
    { name: 'Lime Green', selected: false },
    { name: 'Grape Purple', selected: false },
  ] },
  { name: 'Hair', options: [
    { name: 'Shagadelic', selected: false },
    { name: 'Baldylocks', selected: false },
    { name: 'Hightop', selected: false },
    { name: 'Silkysmooth', selected: false },
    { name: 'Sidewave', selected: false },
    { name: 'Patchy', selected: false },
    { name: 'Mousse', selected: false },
    { name: 'Oceanic', selected: false },
  ] },
  { name: 'Eyes', options: [
    { name: 'Beady', selected: false },
    { name: 'Woody', selected: false },
    { name: 'Uneven', selected: false },
    { name: 'Uni', selected: false },
    { name: 'Block', selected: false },
    { name: 'Stary', selected: false },
    { name: 'Looky', selected: false },
    { name: 'Wideopen', selected: false },
    { name: 'Squint', selected: false },
    { name: 'Wink', selected: false },
  ] },
  { name: 'Nose', options: [
    { name: 'Straight', selected: false },
    { name: 'Skidoodle', selected: false },
    { name: 'Oink', selected: false },
    { name: 'Nostril', selected: false },
    { name: 'Angle', selected: false },
  ] },
  { name: 'Mouth', options: [
    { name: 'Pursed', selected: false },
    { name: 'Oh', selected: false },
    { name: 'Smiley', selected: false },
    { name: 'Golly', selected: false },
    { name: 'Jagged', selected: false },
    { name: 'Frowny', selected: false },
  ] },
  { name: 'Beard', options: [
    { name: 'Stache', selected: false },
    { name: 'Sidewall', selected: false },
    { name: 'Goat', selected: false },
    { name: 'Scruff', selected: false },
  ] },
];
