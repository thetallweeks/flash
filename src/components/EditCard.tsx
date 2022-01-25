import React, {SyntheticEvent} from "react";
import Textarea from 'react-textarea-autosize';
import { MdDragIndicator } from "react-icons/md";
import { IoTrash } from "react-icons/io5";
import { Card } from "../types/global";

interface EditCardProps {
  index: number;
  card: Card;
  handleChangeCard: (e: SyntheticEvent) => void;
  deleteCard: (index: number) => void;
}

export default function EditCard({ index, card, handleChangeCard, deleteCard }: EditCardProps) {
  return (
    <div className="flex items-start">
      <MdDragIndicator className="w-5 h-5 mt-10 mr-2" />
      <span className="btn btn-sm btn-circle mr-4 mt-9 cursor-default">
        {index + 1}
      </span>
      <div className="grow mr-4">
        <label className="label">
          <span className="label-text">Term</span>
        </label>
        <Textarea
          className="textarea textarea-bordered leading-5 w-full h-10 min-h-[2.5rem] resize-none"
          name={`${index}.term`}
          value={card.term}
          onChange={handleChangeCard}
        />
      </div>
      <div className="grow mr-4">
        <label className="label">
          <span className="label-text">Definition</span>
        </label>
        <Textarea
          className="textarea textarea-bordered leading-5 w-full h-10 min-h-[2.5rem]"
          name={`${index}.definition`}
          value={card.definition}
          onChange={handleChangeCard}
        />
      </div>
      <IoTrash
        className="w-5 h-5 mt-10 cursor-pointer"
        onClick={() => deleteCard(index)}
      />
    </div>
  );
}
