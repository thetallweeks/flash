import { atom, selector, selectorFamily } from "recoil";
import { Decks } from "./types/global";
import _ from "lodash";
import { getDecks, getDeck } from "./api/decks";

export const decksState = atom({
  key: "decksState",
  default: [] as Decks,
});

export const allDecks = selector({
  key: "allDecks",
  get: async ({ get }) => {
    const decks = get(decksState);

    if (decks) {
      return decks;
    } else {
      return getDecks();
    }
  }
})

export const deckById = selectorFamily({
  key: "deckById",
  get:
    (id: string) =>
    async ({ get }) => {
      if (!id) {
        return null;
      }

      const allDecks = get(decksState);
      const deck = _.find(allDecks, { id });

      if (deck) {
        return deck;
      } else {
        return getDeck(id);
      }
    },
});
