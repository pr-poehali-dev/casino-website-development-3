import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface SlotGameProps {
  balance: number;
  onBalanceChange: (newBalance: number) => void;
}

const SlotGame = ({ balance, onBalanceChange }: SlotGameProps) => {
  const [bet, setBet] = useState(50);
  const [slots, setSlots] = useState(['🍒', '🍋', '🍊']);
  const [isSpinning, setIsSpinning] = useState(false);
  const [message, setMessage] = useState('');

  const symbols = ['🍒', '🍋', '🍊', '🍇', '💎', '⭐', '7️⃣'];

  const spin = () => {
    if (bet > balance) return;

    setIsSpinning(true);
    setMessage('');
    onBalanceChange(balance - bet);

    let spins = 0;
    const interval = setInterval(() => {
      setSlots([
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)]
      ]);
      spins++;

      if (spins > 20) {
        clearInterval(interval);
        const finalSlots = [
          symbols[Math.floor(Math.random() * symbols.length)],
          symbols[Math.floor(Math.random() * symbols.length)],
          symbols[Math.floor(Math.random() * symbols.length)]
        ];
        setSlots(finalSlots);
        setIsSpinning(false);

        if (finalSlots[0] === finalSlots[1] && finalSlots[1] === finalSlots[2]) {
          let multiplier = 5;
          if (finalSlots[0] === '💎') multiplier = 20;
          if (finalSlots[0] === '7️⃣') multiplier = 50;
          
          const winAmount = bet * multiplier;
          onBalanceChange(balance - bet + winAmount);
          setMessage(`🎉 ДЖЕКПОТ! Выигрыш: ${winAmount}₽ (x${multiplier})`);
        } else if (finalSlots[0] === finalSlots[1] || finalSlots[1] === finalSlots[2]) {
          const winAmount = bet * 2;
          onBalanceChange(balance - bet + winAmount);
          setMessage(`Два совпадения! Выигрыш: ${winAmount}₽`);
        } else {
          setMessage('Попробуйте ещё раз!');
        }
      }
    }, 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center gap-4">
        {slots.map((symbol, index) => (
          <div
            key={index}
            className={`w-32 h-32 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center text-6xl border-4 border-primary ${
              isSpinning ? 'animate-pulse' : ''
            }`}
          >
            {symbol}
          </div>
        ))}
      </div>

      {message && (
        <div className={`text-center text-lg font-bold ${message.includes('ДЖЕКПОТ') || message.includes('Два') ? 'text-green-500' : 'text-yellow-500'}`}>
          {message}
        </div>
      )}

      <div className="space-y-4">
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

        <div className="text-sm text-muted-foreground space-y-1">
          <p>💎💎💎 - x20</p>
          <p>7️⃣7️⃣7️⃣ - x50</p>
          <p>Три одинаковых - x5</p>
          <p>Два одинаковых - x2</p>
        </div>

        <Button
          size="lg"
          className="w-full bg-primary hover:bg-primary/90"
          onClick={spin}
          disabled={isSpinning || bet > balance}
        >
          <Icon name="Play" size={20} className="mr-2" />
          Крутить слоты
        </Button>
      </div>
    </div>
  );
};

export default SlotGame;
