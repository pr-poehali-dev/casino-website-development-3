import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface RouletteGameProps {
  balance: number;
  onBalanceChange: (newBalance: number) => void;
}

const RouletteGame = ({ balance, onBalanceChange }: RouletteGameProps) => {
  const [bet, setBet] = useState(50);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [message, setMessage] = useState('');

  const numbers = Array.from({ length: 37 }, (_, i) => i);
  const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];

  const getNumberColor = (num: number) => {
    if (num === 0) return 'bg-green-600';
    return redNumbers.includes(num) ? 'bg-red-600' : 'bg-gray-900';
  };

  const spin = () => {
    if (selectedNumber === null || bet > balance) return;
    
    setIsSpinning(true);
    setMessage('');
    onBalanceChange(balance - bet);
    
    setTimeout(() => {
      const winningNumber = Math.floor(Math.random() * 37);
      setResult(winningNumber);
      setIsSpinning(false);
      
      if (winningNumber === selectedNumber) {
        const winAmount = bet * 35;
        onBalanceChange(balance - bet + winAmount);
        setMessage(`Победа! Выпало ${winningNumber}. Выигрыш: ${winAmount}₽`);
      } else {
        setMessage(`Выпало ${winningNumber}. Попробуйте ещё!`);
      }
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <div className={`w-64 h-64 rounded-full border-8 border-primary flex items-center justify-center relative ${isSpinning ? 'animate-spin' : ''}`}>
          <div className="text-center">
            <div className="text-6xl font-bold gold-text-gradient">
              {isSpinning ? '?' : result !== null ? result : '0'}
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              {isSpinning ? 'Вращается...' : 'Рулетка'}
            </div>
          </div>
        </div>
      </div>

      {message && (
        <div className={`text-center text-lg font-bold ${message.includes('Победа') ? 'text-green-500' : 'text-yellow-500'}`}>
          {message}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Выберите число (0-36):</label>
          <div className="grid grid-cols-10 gap-1 max-h-48 overflow-y-auto p-2 border border-primary/30 rounded-lg">
            {numbers.map((num) => (
              <button
                key={num}
                onClick={() => setSelectedNumber(num)}
                className={`${getNumberColor(num)} text-white p-2 rounded hover:opacity-80 transition-opacity ${
                  selectedNumber === num ? 'ring-2 ring-primary' : ''
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Ставка: {bet}₽</label>
          <input
            type="range"
            min="10"
            max={Math.min(500, balance)}
            step="10"
            value={bet}
            onChange={(e) => setBet(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <Button
          size="lg"
          className="w-full bg-primary hover:bg-primary/90"
          onClick={spin}
          disabled={isSpinning || selectedNumber === null || bet > balance}
        >
          <Icon name="Play" size={20} className="mr-2" />
          Крутить рулетку
        </Button>
      </div>
    </div>
  );
};

export default RouletteGame;
