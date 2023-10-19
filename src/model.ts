import {
  button,
  clickObserver,
  stateCounter,
  paintLogger,
  keyObserver,
  updateMetronome,
} from "./helpers";

const state = stateCounter((pivot, trace) => {
  paintLogger(trace);
  updateMetronome(pivot);
});

clickObserver(button, () => {
  state.setState(Math.trunc(performance.now()));
});

keyObserver(" ", () => {
  state.setState(Math.trunc(performance.now()));
});
