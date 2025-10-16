import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface BlackjackGameProps {
  balance: number;
  onBalanceChange: (newBalance: number) => void;
}

const BlackjackGame = ({ balance, onBalanceChange }: BlackjackGameProps) => {
  const [bet, setBet] = useState(50);
  const [playerCards, setPlayerCards] = useState<number[]>([]);
  const [dealerCards, setDealerCards] = useState<number[]>([]);
  const [gameState, setGameState] = useState<'betting' | 'playing' | 'finished'>('betting');
  const [message, setMessage] = useState('');

  const getRandomCard = () => Math.floor(Math.random() * 11) + 1;

  const calculateScore = (cards: number[]) => {
    let score = cards.reduce((sum, card) => sum + card, 0);
    if (score > 21 && cards.includes(11)) {
      score -= 10;
    }
    return score;
  };

  const startGame = () => {
    if (bet > balance) return;

    onBalanceChange(balance - bet);
    const player = [getRandomCard(), getRandomCard()];
    const dealer = [getRandomCard()];
    
    setPlayerCards(player);
    setDealerCards(dealer);
    setGameState('playing');
    setMessage('');
  };

  const hit = () => {
    const newCards = [...playerCards, getRandomCard()];
    setPlayerCards(newCards);
    
    if (calculateScore(newCards) > 21) {
      setMessage('Перебор! Вы проиграли.');
      setGameState('finished');
    }
  };

  const stand = () => {
    const newDealerCards = [...dealerCards];
    
    while (calculateScore(newDealerCards) < 17) {
      newDealerCards.push(getRandomCard());
    }
    
    setDealerCards(newDealerCards);
    
    const playerScore = calculateScore(playerCards);
    const dealerScore = calculateScore(newDealerCards);
    
    if (dealerScore > 21 || playerScore > dealerScore) {
      const winAmount = bet * 2;
      onBalanceChange(balance + winAmount);
      setMessage(`Победа! Ваш счёт: ${playerScore}, Дилер: ${dealerScore}. Выигрыш: ${winAmount}₽`);
    } else if (playerScore === dealerScore) {
      onBalanceChange(balance + bet);
      setMessage(`Ничья! Счёт: ${playerScore}`);
    } else {
      setMessage(`Проигрыш. Ваш счёт: ${playerScore}, Дилер: ${dealerScore}`);
    }
    
    setGameState('finished');
  };

  const reset = () => {
    setPlayerCards([]);
    setDealerCards([]);
    setGameState('betting');
    setMessage('');
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="p-4 bg-muted/50 rounded-lg">
          <h3 className="font-bold mb-2 flex items-center gap-2">
            <Icon name="User" size={20} />
            Дилер: {gameState !== 'betting' && calculateScore(dealerCards)}
          </h3>
          <div className="flex gap-2">
            {dealerCards.map((card, index) => (
              <div key={index} className="w-16 h-24 bg-white text-black rounded-lg flex items-center justify-center text-2xl font-bold border-2 border-gray-300">
                {card === 1 ? 'A' : card}
              </div>
            ))}
            {gameState === 'playing' && (
              <div className="w-16 h-24 bg-gradient-to-br from-red-600 to-black rounded-lg flex items-center justify-center text-white">
                ?
              </div>
            )}
          </div>
        </div>

        <div className="p-4 bg-primary/10 rounded-lg border-2 border-primary">
          <h3 className="font-bold mb-2 flex items-center gap-2">
            <Icon name="User" size={20} className="text-primary" />
            Ваши карты: {gameState !== 'betting' && calculateScore(playerCards)}
          </h3>
          <div className="flex gap-2">
            {playerCards.map((card, index) => (
              <div key={index} className="w-16 h-24 bg-white text-black rounded-lg flex items-center justify-center text-2xl font-bold border-2 border-primary">
                {card === 1 ? 'A' : card}
              </div>
            ))}
          </div>
        </div>
      </div>

      {message && (
        <div className={`text-center text-lg font-bold ${message.includes('Победа') ? 'text-green-500' : message.includes('Ничья') ? 'text-yellow-500' : 'text-red-500'}`}>
          {message}
        </div>
      )}

      <div className="space-y-4">
        {gameState === 'betting' && (
          <>
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
              onClick={startGame}
              disabled={bet > balance}
            >
              <Icon name="Play" size={20} className="mr-2" />
              Раздать карты
            </Button>
          </>
        )}

        {gameState === 'playing' && (
          <div className="flex gap-2">
            <Button
              size="lg"
              className="flex-1 bg-primary hover:bg-primary/90"
              onClick={hit}
            >
              <Icon name="Plus" size={20} className="mr-2" />
              Взять карту
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="flex-1 border-primary"
              onClick={stand}
            >
              <Icon name="Hand" size={20} className="mr-2" />
              Хватит
            </Button>
          </div>
        )}

        {gameState === 'finished' && (
          <Button
            size="lg"
            className="w-full bg-secondary hover:bg-secondary/90"
            onClick={reset}
          >
            <Icon name="RotateCcw" size={20} className="mr-2" />
            Новая игра
          </Button>
        )}
      </div>
    </div>
  );
};

export default BlackjackGame;
