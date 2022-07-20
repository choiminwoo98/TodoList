import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

export interface ITodo {
  id: number;
  text: string;
}
interface IToDoState {
  [key: string]: ITodo[];
}

const { persistAtom } = recoilPersist({
  key: "recoil-persist",
  storage: localStorage,
});

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    to_do: [],
    doing: [],
    done: [],
  },
  effects: [
    ({ setSelf, onSet }) => {
      const todoStoreKey = "Todo";
      const savedValue = localStorage.getItem(todoStoreKey);
      if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
      }
      onSet((newValue, _, isReset) => {
        isReset
          ? localStorage.removeItem(todoStoreKey)
          : localStorage.setItem(todoStoreKey, JSON.stringify(newValue));
      });
    },
  ],
});
