import { Deck, Decks } from "../types/global";
import db from "../db";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import _ from "lodash";
import { generateId } from "../lib/ids";

const collectionName = "decks";

export async function createDeck() {
  try {
    return await addDoc(collection(db, collectionName), {
      name: "",
      cards: [],
    });
  } catch (err) {
    console.log(err);
  }
}

export async function getDeck(deckId = ""): Promise<Deck | undefined> {
  try {
    const deck = await getDoc(doc(db, collectionName, deckId));
    return deck.data() as Deck;
  } catch (err) {
    console.log(err);
  }
}

function ensureIds(data: Partial<Deck>) {
  if (!data.cards) {
    return data;
  }
  return {
    ...data,
    cards: _.map(data.cards, (card) => ({
      ...card,
      id: card.id ?? generateId(),
    })),
  };
}

export async function updateDeck(deckId = "", data: Partial<Deck>) {
  try {
    const formattedData = ensureIds(data);
    await updateDoc(doc(db, collectionName, deckId), formattedData);
  } catch (err) {
    console.log(err);
  }
}

export async function deleteDeck(deckId = "") {
  try {
    await deleteDoc(doc(db, collectionName, deckId));
  } catch (err) {
    console.log(err);
  }
}

export async function getDecks(): Promise<Decks | undefined> {
  try {
    const allDecks = await getDocs(collection(db, collectionName));
    return allDecks.docs.map((doc) => {
      const data = doc.data() as Deck;
      return { id: doc.id, ...data };
    });
  } catch (err) {
    console.log(err);
  }
}
