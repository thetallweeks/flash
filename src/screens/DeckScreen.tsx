import React, { SyntheticEvent, useEffect, useState } from "react";
import { Deck, Cards } from "../types/global";
import { useLocation, Link } from "wouter";
import { useRecoilValue } from "recoil";
import { deckById } from "../store";
import _ from "lodash";
import fp from "lodash/fp";
import { updateDeck, deleteDeck } from "../api/decks";
import { IoAdd, IoChevronBack, IoTrash } from "react-icons/io5";
import { BiImport } from "react-icons/bi";
import Loading from "../components/Loading";
import EditCardList from "../components/EditCardList";
import ImportCards from "../components/ImportCards";
import { generateId } from "../lib/ids";

interface DeckScreenProps {
  deckId?: string;
}

function DeckScreen({ deckId = "" }: DeckScreenProps) {
  const [, setLocation] = useLocation();
  const [loaded, setLoaded] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const deck = useRecoilValue(deckById(deckId)) as Deck;

  const [formData, setFormData] = useState<Deck>({
    name: "",
    cards: [],
  });

  useEffect(() => {
    if (deck) {
      setFormData({
        name: deck?.name,
        cards: deck?.cards,
      });
      setLoaded(true);
    } else {
      setLoaded(true);
    }
  }, [deck]);

  function handleChangeName(e: SyntheticEvent) {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    setFormData({
      ...formData,
      name: value,
    });
  }

  function handleChangeCard(e: SyntheticEvent) {
    const target = e.target as HTMLInputElement;
    const name = target.name;
    const value = target.value;

    setFormData({
      ...formData,
      cards: fp.set(name, value, formData.cards),
    });
  }

  function handleAddCard() {
    setFormData({
      ...formData,
      cards: [
        ...formData.cards,
        {
          id: generateId(),
          term: "",
          definition: "",
        },
      ],
    });
  }

  function importCards(data: Cards) {
    setFormData({
      ...formData,
      cards: [...formData.cards, ...data],
    });
  }

  function moveCard(fromIndex: number, toIndex: number) {
    const c = formData.cards.slice(); // create a copy so mutation is ok
    c.splice(toIndex, 0, c.splice(fromIndex, 1)[0]);

    setFormData({
      ...formData,
      cards: c,
    });
  }

  function deleteCard(index: number) {
    setFormData({
      ...formData,
      cards: [
        ...formData.cards.slice(0, index),
        ...formData.cards.slice(index + 1),
      ],
    });
  }

  async function handleSave() {
    if (formData.name && !_.isEmpty(formData.cards)) {
      await updateDeck(deckId, formData);
      setLocation("/");
    } else {
      console.log("Can't save without name or cards");
    }
  }

  async function handleDeleteSet() {
    await deleteDeck(deckId);
    setLocation("/");
  }

  if (!deckId) {
    return null;
  }

  return (
    <div className="p-10 max-w-screen-xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/"
          className="flex items-center text-secondary hover:text-secondary-focus"
        >
          <IoChevronBack className="mr-1" />
          Back
        </Link>
        <button className="btn btn-sm btn-primary" onClick={handleSave}>
          Save
        </button>
      </div>

      {loaded ? (
        <div>
          <div>
            <label className="label">
              <span className="label-text text-xl">Name</span>
            </label>
            <input
              className="input input-bordered w-96"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChangeName}
            />
          </div>

          <div>
            <div className="flex items-center mt-10 mb-2">
              <h3 className="text-xl">Cards</h3>
            </div>
            <div>
              <EditCardList
                cards={formData.cards}
                handleChangeCard={handleChangeCard}
                moveCard={moveCard}
                deleteCard={deleteCard}
              />
              <button className="btn btn-sm mr-5" onClick={handleAddCard}>
                <span>Add Card</span>
                <IoAdd className="ml-1" />
              </button>
              <button
                className="btn btn-sm btn-ghost inline-flex items-center"
                onClick={() => {
                  setShowImportModal(true);
                }}
              >
                <span>Import</span>
                <BiImport className="ml-1" />
              </button>
              <ImportCards
                show={showImportModal}
                handleClose={() => {
                  setShowImportModal(false);
                }}
                importCards={importCards}
              />
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}

      <div className="divider mt-10 mb-10"></div>
      <footer className="flex justify-between">
        <button className="btn btn-error" onClick={handleDeleteSet}>
          <span>Delete</span>
          <IoTrash className="ml-1.5" />
        </button>
        <button className="btn btn-primary" onClick={handleSave}>
          Save
        </button>
      </footer>
    </div>
  );
}

export default DeckScreen;
