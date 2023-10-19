type Button = HTMLButtonElement;
type Logger = HTMLDivElement;
type Metronome = HTMLParagraphElement;
type Entity = Button | Logger | Metronome;

const getButton = () => {
  return document.getElementById("button") as Button;
};

const getLogger = () => {
  return document.getElementById("logger") as Logger;
};

const getMetronome = () => {
  return document.getElementById("metronome") as Metronome;
};

export const button = getButton();
export const logger = getLogger();
export const metronome = getMetronome();

export const paintLogger = (trace: number[]) => {
  logger.innerHTML = "";

  trace
    .map((timestamp, index) => {
      const tag = document.createElement("p");

      tag.textContent = `index: ${
        index + 1
      } | timestamp: ${timestamp.toString()}`;

      return tag;
    })
    .forEach((tag) => {
      logger.insertAdjacentElement("afterbegin", tag);
    });
};

export const clickObserver = (
  item: Entity,
  listener: (...props: any[]) => void
) => {
  item.addEventListener("click", listener);

  return () => {
    item.removeEventListener("click", listener);
  };
};

export const keyObserver = (
  neededKey: string,
  listener: (...props: any[]) => void
) => {
  const subscriber = ({ key }: KeyboardEvent) => {
    if (key === neededKey) {
      listener();
    }
  };
  document.addEventListener("keyup", subscriber);

  return () => {
    document.removeEventListener("keyup", subscriber);
  };
};

export const stateCounter = (
  listener: (value: number, trace: number[]) => void
) => {
  let state: number[] = [];

  return {
    setState: (value: number) => {
      state.push(value);
      state = state.slice(-100);

      listener(
        Math.trunc(
          (60000 * state.length) / ((state.at(-1) ?? 0) - (state.at(0) ?? 0))
        ),
        state
      );
    },
  };
};

export const updateMetronome = (value: number) => {
  metronome.textContent = value.toString();
};
