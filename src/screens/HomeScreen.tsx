import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { decksState } from "../store";
import _ from "lodash";
import { Link, useLocation } from "wouter";
import { IoAdd, IoBook } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { createDeck, getDecks } from "../api/decks";
import { Deck } from "../types/global";

function HomeScreen() {
  const [, setLocation] = useLocation();
  const [decks, setDecks] = useRecoilState(decksState);

  useEffect(() => {
    const load = async () => {
      const allDecks = await getDecks();
      if (allDecks) {
        setDecks(allDecks);
      }
    };
    load();
  }, [setDecks]);

  async function handleClickAdd() {
    const newSet = await createDeck();
    if (newSet) {
      setLocation(`/decks/${newSet.id}`);
    }
  }

  return (
    <div className="p-10 max-w-screen-xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl">Decks</h2>
        <button className="btn btn-primary" onClick={handleClickAdd}>
          <span>Add Deck</span>
          <IoAdd className="" />
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {_.map(decks, (deck: Deck) => {
          return (
            <div
              key={deck.id}
              className="group relative w-full h-40 flex flex-col bg-white rounded-sm shadow-md-c transition-transform hover:scale-[1.03]"
            >
              <Link className="p-4 w-full h-full" href={`/study/${deck.id}`}>
                <div className="text-lg font-semibold">
                  {deck.name}
                </div>
                <div className="text-sm">{_.size(deck.cards)} Terms</div>
              </Link>
              <div className="absolute bottom-0 left-0 right-0 flex transition-all opacity-0 group-hover:flex group-hover:opacity-100">
                <Link
                  className="grow flex justify-center items-center text-sm p-2 bg-gray-100 hover:bg-gray-200 border rounded-bl-sm cursor-pointer"
                  href={`/study/${deck.id}`}
                >
                  Study
                  <IoBook className="ml-1 mt-px" />
                </Link>
                <Link
                  className="grow flex justify-center items-center text-sm p-2 bg-gray-100 hover:bg-gray-200 border rounded-br-sm border-l-0 cursor-pointer"
                  href={`/decks/${deck.id}`}
                >
                  Edit
                  <MdEdit className="ml-1" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HomeScreen;
