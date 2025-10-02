import { useState } from "react";
import { X } from "lucide-react";

interface CalculatorProps {
  onClose: () => void;
}

export const Calculator = ({ onClose }: CalculatorProps) => {
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("");

  const handleNumber = (num: string) => {
    setDisplay(display === "0" ? num : display + num);
  };

  const handleOperator = (op: string) => {
    setEquation(display + " " + op + " ");
    setDisplay("0");
  };

  const handleEquals = () => {
    try {
      const result = eval(equation + display);
      setDisplay(String(result));
      setEquation("");
    } catch {
      setDisplay("Error");
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setEquation("");
  };

  const buttons = [
    ["C", "±", "%", "÷"],
    ["7", "8", "9", "×"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "="],
  ];

  const handlePress = (btn: string) => {
    if (btn === "C") handleClear();
    else if (btn === "=") handleEquals();
    else if (["+", "-", "×", "÷"].includes(btn)) handleOperator(btn === "×" ? "*" : btn === "÷" ? "/" : btn);
    else if (btn === "±") setDisplay(String(-parseFloat(display)));
    else if (btn === "%") setDisplay(String(parseFloat(display) / 100));
    else handleNumber(btn);
  };

  return (
    <div className="w-full h-full bg-background flex flex-col animate-scale-in">
      <div className="bg-card p-4 flex items-center justify-between border-b border-border">
        <h2 className="text-lg font-semibold">Calculator</h2>
        <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="p-6 text-right">
          {equation && <div className="text-sm text-muted-foreground mb-2">{equation}</div>}
          <div className="text-5xl font-light">{display}</div>
        </div>

        <div className="flex-1 p-4 grid grid-rows-5 gap-3">
          {buttons.map((row, i) => (
            <div key={i} className="grid grid-cols-4 gap-3">
              {row.map((btn) => (
                <button
                  key={btn}
                  onClick={() => handlePress(btn)}
                  className={`rounded-2xl font-semibold text-xl transition-all active:scale-95 ${
                    btn === "="
                      ? "col-span-2 bg-primary text-primary-foreground"
                      : ["+", "-", "×", "÷"].includes(btn)
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted hover:bg-muted/80"
                  }`}
                >
                  {btn}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
