import React  from "react";
import { Cards } from "../types/global";
import _ from "lodash";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Card from "./Card";
import classnames from "classnames";

interface CardsProps {
  cards: Cards;
  currentIndex: number;
  onFinishAnimation?: () => void;
  flippable?: boolean;
  side?: "front" | "back";
  className?: string;
}

export default function CardDeck({
  cards,
  currentIndex,
  onFinishAnimation,
  flippable,
  side,
  className = "",
}: CardsProps) {
  const subset = [_.get(cards, currentIndex)];

  if (_.isEmpty(subset)) {
    return null;
  }

  return (
    <TransitionGroup className={classnames("flex relative", className)}>
      {subset.map((card) => (
        <CSSTransition
          key={card.id}
          timeout={700}
          classNames="slide"
          onExited={onFinishAnimation}
        >
          <Card
            className="absolute"
            front={card.term}
            back={card.definition}
            side={side}
            flippable={flippable}
          />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
}
