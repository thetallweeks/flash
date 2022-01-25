import React, { SyntheticEvent, useState } from "react";
import { Cards } from "../types/global";
import _ from "lodash";
import classnames from "classnames";
import { IoClose } from "react-icons/io5";
import { generateId } from "../lib/ids";

interface ImportCardsProps {
  show: boolean;
  handleClose: () => void;
  importCards: (importData: Cards) => void;
}

export default function ImportCards({
  show,
  handleClose,
  importCards,
}: ImportCardsProps) {
  const [data, setData] = useState<Cards>([]);
  const [disabled, setDisabled] = useState(true);

  function handleChange(e: SyntheticEvent) {
    const target = e.target as HTMLTextAreaElement;
    const value = target.value;

    try {
      const rows = value.split(/\r?\n/);
      let parsedRows = rows.map((row) => {
        const [term, definition] = row.split(/\t| {4,}/);

        return {
          id: generateId(),
          term,
          definition,
        };
      });

      parsedRows = parsedRows.filter((row) => {
        return row.term && row.definition;
      });

      if (!_.isEmpty(parsedRows)) {
        setData(parsedRows);
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    } catch (err) {
      setDisabled(true);
    }
  }

  function handleClickImport() {
    importCards(data);
    handleClose();
  }

  return (
    <div
      id="my-modal"
      className={classnames("modal", {
        "modal-open": show,
      })}
    >
      <div className="modal-box">
        <IoClose
          className="w-8 h-8 absolute right-3 top-3 cursor-pointer fill-gray-700 hover:fill-gray-800"
          onClick={handleClose}
        />
        <div className="form-control">
          <label className="label">
            <span className="label-text">Import data</span>
          </label>
          <textarea
            className="textarea h-56 textarea-bordered"
            placeholder="Copy and paste your data here"
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="modal-action justify-between">
          <button className="btn" onClick={handleClose}>
            Cancel
          </button>
          <button
            className={classnames("btn btn-primary", {
              "btn-disabled": disabled,
            })}
            onClick={handleClickImport}
          >
            Import
          </button>
        </div>
      </div>
    </div>
  );
}
