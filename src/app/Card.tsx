import { useEffect, useState } from 'react';
import { FaCopy, FaSave, FaSearch, FaTimes } from 'react-icons/fa';
import { ansiFormat } from '../support/formatting';
import {
  copyCardToClipboard,
  getWorkingDirectory,
  saveCard,
  simpleCommandWithResult,
  sortCardOutput,
} from '../support/nana';
import { Output, SortingOptionsType } from './Output';
import { Prompt } from './Prompt';

export type CardPropTypes = {
  workingDir?: string;
  input: string;
  output?: string;
};

export type ICard = CardPropTypes & {
  id: string;
};

export const Card = (
  props: ICard & {
    history: string[];
    onInputChange: (newInput: string) => void;
    onSubmit: (newProps: CardPropTypes, isError: boolean) => void;
    onClose: () => void;
  }
) => {
  const {
    id,
    input,
    workingDir,
    history,
    output,
    onClose,
    onSubmit,
    onInputChange,
  } = props;

  const [activeHistoryIndex, setActiveHistoryIndex] = useState(-1);

  const resetActiveHistoryIndex = () => {
    setActiveHistoryIndex(history.length);
  };

  useEffect(resetActiveHistoryIndex, [history.length]);

  const handleSubmit = async () => {
    const workingDir = await getWorkingDirectory();
    let isError = false;
    let output: string;
    try {
      output = JSON.parse(await simpleCommandWithResult(id, input));
    } catch (error) {
      output = ansiFormat(error as string);
      isError = true;
    }

    onSubmit({ input, workingDir, output }, isError);
    resetActiveHistoryIndex();
  };

  const handleSortBy = async (sortingOptions: SortingOptionsType) => {
    const { column, ascending } = sortingOptions;
    if (!column) return;

    const workingDir = await getWorkingDirectory();
    let isError = false;
    let output: string;
    try {
      output = JSON.parse(await sortCardOutput(id, column, ascending));
    } catch (error) {
      output = ansiFormat(error as string);
      isError = true;
    }

    onSubmit({ input, workingDir, output }, isError);
  };

  const handleHistory = (delta: number) => {
    const index = activeHistoryIndex + delta;
    if (index >= 0 && index < history.length) {
      onInputChange(history[index]);
      setActiveHistoryIndex(index);
    }
  };

  return (
    <div className="mb-2 flex flex-col">
      <div
        id="card-header"
        className="flex w-full translate-y-1 items-center justify-between rounded-t bg-solarized-blue py-1 px-2  font-mono text-sm text-solarized-base2 dark:bg-solarized-base01"
      >
        <div className="flex">
          {/* TODO: disable buttons when no results are present */}
          <FaCopy
            className="cursor-pointer hover:text-green-300"
            onClick={async () => {
              await copyCardToClipboard(id);
            }}
          />
        </div>
        <div className="font-bold">{workingDir}</div>

        <FaTimes
          className="cursor-pointer text-solarized-base3 hover:text-solarized-red dark:text-solarized-base03"
          onClick={onClose}
        />
      </div>

      <div
        id="card-body"
        className="rounded bg-solarized-blue px-2 pb-2 pt-2 dark:bg-solarized-base01"
      >
        <div id="header" className="flex">
          <Prompt
            input={input ?? ''}
            onSubmit={handleSubmit}
            onHistoryUp={() => {
              handleHistory(-1);
            }}
            onHistoryDown={() => {
              handleHistory(1);
            }}
            onInputChange={onInputChange}
          />
        </div>

        {output !== undefined && (
          <div className="mt-2 rounded-sm border-solarized-base1 text-left font-mono text-sm text-solarized-base3 dark:border-solarized-base0 dark:bg-solarized-base02">
            <Output
              value={output}
              onSortOutput={(sortingOptions) => handleSortBy(sortingOptions)}
            />
          </div>
        )}
      </div>
    </div>
  );
};
