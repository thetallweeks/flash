import React, { useState, useEffect } from "react";
import { Cards } from "../types/global";
import _ from "lodash";
import { Link, useLocation } from "wouter";
import CardDeck from "../components/CardDeck";
import Toolbar from "../components/Toolbar";
import Loading from "../components/Loading";
import { IoChevronBack } from "react-icons/io5";
import { useRecoilValue } from "recoil";
import { useSwipeable } from "react-swipeable";
import { deckById } from "../store";
import classnames from "classnames";
import MoreMenu from "../components/MoreMenu";

interface StudyScreenProps {
  deckId: string;
}

function StudyScreen({ deckId }: StudyScreenProps) {
  const [location] = useLocation();
  const [loaded, setLoaded] = useState(false);
  const [flippable, setFlippable] = useState(true);
  const [side, setSide] = useState<"front" | "back">("front");
  const deck = useRecoilValue(deckById(deckId));
  const [cards, setCards] = useState<Cards>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("");
  const totalCount = cards.length;

  useEffect(() => {
    if (deck) {
      setCards(deck?.cards);
      setLoaded(true);
    } else {
      setLoaded(true);
    }
  }, [deck]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      next();
    },
    onSwipedRight: () => {
      previous();
    },
  });

  function shuffle() {
    setCards(_.shuffle(cards));
    setCurrentIndex(0);
  }

  function previous() {
    if (currentIndex > 0) {
      setFlippable(false);
      setDirection("previous");
      setCurrentIndex(currentIndex - 1);
    }
  }

  function next() {
    if (currentIndex < totalCount - 1) {
      setFlippable(false);
      setDirection("next");
      setCurrentIndex(currentIndex + 1);
    }
  }

  function toggleSide() {
    if (side === "front") {
      setSide("back");
    } else {
      setSide("front");
    }
  }

  return (
    <div className="p-10 max-w-screen-xl md:mx-auto">
      <div className="flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center text-secondary hover:text-secondary-focus"
        >
          <IoChevronBack className="mr-1" />
          Back
        </Link>
        <MoreMenu>
          <li>
            <Link
              className="active:bg-gray-300 active:text-gray-900"
              href={`${location.replace("/study/", "/decks/")}`}
            >
              Edit Deck
            </Link>
          </li>
          <li>
            <a
              className="active:bg-gray-300 active:text-gray-900"
              onClick={toggleSide}
            >
              {side === "front" ? "Test definitions" : "Test terms"}
            </a>
          </li>
        </MoreMenu>
      </div>

      {loaded ? (
        <div className="flex flex-col select-none" {...swipeHandlers}>
          <CardDeck
            className={classnames(
              "w-full sm:w-[560px] h-[340px] mx-auto mt-8 mb-8",
              direction
            )}
            cards={cards}
            currentIndex={currentIndex}
            flippable={flippable}
            side={side}
            onFinishAnimation={() => setFlippable(true)}
          />
          <Toolbar
            className="w-full sm:w-[560px] mx-auto"
            totalCount={totalCount}
            currentIndex={currentIndex}
            next={next}
            previous={previous}
            shuffle={shuffle}
          />
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default StudyScreen;
