import { IconCalculator as IconCalc } from '@tabler/icons-react';
import { Window } from 'liqid-ui';
import { type KeyboardEvent, useState } from 'react';

interface CalculatorProps {
  isOpen: boolean;
  handleClose: () => void;
  zIndex: number;
  onFocus: () => void;
  resetKey?: number;
}

export const Calculator = ({
  isOpen,
  handleClose,
  zIndex,
  onFocus,
  resetKey,
}: CalculatorProps) => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay(`${display}.`);
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const backspace = () => {
    if (
      display.length === 1 ||
      (display.length === 2 && display.startsWith('-'))
    ) {
      setDisplay('0');
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const key = e.key;

    if (/^[0-9]$/.test(key)) {
      inputDigit(key);
    } else if (key === '.' || key === ',') {
      inputDecimal();
    } else if (key === '+') {
      performOperation('+');
    } else if (key === '-') {
      performOperation('-');
    } else if (key === '*') {
      performOperation('×');
    } else if (key === '/') {
      performOperation('÷');
    } else if (key === 'Enter' || key === '=') {
      calculate();
    } else if (key === 'Escape' || key === 'Delete') {
      clear();
    } else if (key === 'Backspace') {
      backspace();
    } else if (key === '%') {
      inputPercent();
    }
  };

  const toggleSign = () => {
    setDisplay(display.charAt(0) === '-' ? display.slice(1) : `-${display}`);
  };

  const inputPercent = () => {
    const value = Number.parseFloat(display);
    setDisplay(String(value / 100));
  };

  const performOperation = (nextOperator: string) => {
    const inputValue = Number.parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operator) {
      const currentValue = previousValue;
      let result: number;

      switch (operator) {
        case '+':
          result = currentValue + inputValue;
          break;
        case '-':
          result = currentValue - inputValue;
          break;
        case '×':
          result = currentValue * inputValue;
          break;
        case '÷':
          result = inputValue !== 0 ? currentValue / inputValue : 0;
          break;
        default:
          result = inputValue;
      }

      setDisplay(String(result));
      setPreviousValue(result);
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const calculate = () => {
    if (operator && previousValue !== null) {
      const inputValue = Number.parseFloat(display);
      let result: number;

      switch (operator) {
        case '+':
          result = previousValue + inputValue;
          break;
        case '-':
          result = previousValue - inputValue;
          break;
        case '×':
          result = previousValue * inputValue;
          break;
        case '÷':
          result = inputValue !== 0 ? previousValue / inputValue : 0;
          break;
        default:
          result = inputValue;
      }

      setDisplay(String(result));
      setPreviousValue(null);
      setOperator(null);
      setWaitingForOperand(true);
    }
  };

  const numberClass = 'button glass';
  const operatorClass = 'button glass selected';
  const functionClass = 'button glass';

  return (
    <Window
      title={
        <span className="flex items-center gap-2">
          <IconCalc size={18} /> Calculator
        </span>
      }
      handleClose={handleClose}
      isOpen={isOpen}
      zIndex={zIndex}
      onFocus={onFocus}
      resetKey={resetKey}
    >
      <div className="h-full flex flex-col grow w-full gap-2">
        {/* Display */}
        <div className="glass rounded-xl py-2 text-right">
          <input
            type="text"
            value={display}
            onKeyDown={handleKeyDown}
            readOnly
            className="w-full text-3xl p-3 font-semibold text-right bg-transparent outline-none cursor-default"
          />
        </div>

        {/* Button Grid */}
        <div className="grid grid-cols-4 gap-2 flex-1">
          {/* Row 1 */}
          <button type="button" className={functionClass} onClick={clear}>
            AC
          </button>
          <button type="button" className={functionClass} onClick={toggleSign}>
            +/−
          </button>
          <button
            type="button"
            className={functionClass}
            onClick={inputPercent}
          >
            %
          </button>
          <button
            type="button"
            className={operatorClass}
            onClick={() => performOperation('÷')}
          >
            ÷
          </button>

          {/* Row 2 */}
          <button
            type="button"
            className={numberClass}
            onClick={() => inputDigit('7')}
          >
            7
          </button>
          <button
            type="button"
            className={numberClass}
            onClick={() => inputDigit('8')}
          >
            8
          </button>
          <button
            type="button"
            className={numberClass}
            onClick={() => inputDigit('9')}
          >
            9
          </button>
          <button
            type="button"
            className={operatorClass}
            onClick={() => performOperation('×')}
          >
            ×
          </button>

          {/* Row 3 */}
          <button
            type="button"
            className={numberClass}
            onClick={() => inputDigit('4')}
          >
            4
          </button>
          <button
            type="button"
            className={numberClass}
            onClick={() => inputDigit('5')}
          >
            5
          </button>
          <button
            type="button"
            className={numberClass}
            onClick={() => inputDigit('6')}
          >
            6
          </button>
          <button
            type="button"
            className={operatorClass}
            onClick={() => performOperation('-')}
          >
            −
          </button>

          {/* Row 4 */}
          <button
            type="button"
            className={numberClass}
            onClick={() => inputDigit('1')}
          >
            1
          </button>
          <button
            type="button"
            className={numberClass}
            onClick={() => inputDigit('2')}
          >
            2
          </button>
          <button
            type="button"
            className={numberClass}
            onClick={() => inputDigit('3')}
          >
            3
          </button>
          <button
            type="button"
            className={operatorClass}
            onClick={() => performOperation('+')}
          >
            +
          </button>

          {/* Row 5 */}
          <button
            type="button"
            className={`${numberClass} col-span-2`}
            onClick={() => inputDigit('0')}
          >
            0
          </button>
          <button type="button" className={numberClass} onClick={inputDecimal}>
            .
          </button>
          <button type="button" className={operatorClass} onClick={calculate}>
            =
          </button>
        </div>
      </div>
    </Window>
  );
};
