import React, { SyntheticEvent } from "react";
import { Cards } from "../types/global";
import _ from "lodash";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import EditCard from "./EditCard";

interface EditCardListProps {
  cards: Cards;
  handleChangeCard: (e: SyntheticEvent) => void;
  moveCard: (fromIndex: number, toIndex: number) => void;
  deleteCard: (index: number) => void;
}

export default function EditCardList({
  cards,
  handleChangeCard,
  moveCard,
  deleteCard,
}: EditCardListProps) {
  function onDragEnd(result: DropResult) {
    if (!result.destination) {
      return;
    }

    moveCard(result.source.index, result.destination.index);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {_.map(cards, (card, index: number) => {
              return (
                <Draggable
                  key={card.id}
                  draggableId={card.id ?? card.term}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      className="pb-6"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <EditCard
                        index={index}
                        card={card}
                        handleChangeCard={handleChangeCard}
                        deleteCard={deleteCard}
                      />
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
