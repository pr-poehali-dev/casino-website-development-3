import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedGame, setSelectedGame] = useState<any>(null);
  const [demoBalance, setDemoBalance] = useState(1000);
  const [isPlaying, setIsPlaying] = useState(false);

  const games = [
    {
      id: 1,
      title: 'Европейская рулетка',
      category: 'Рулетка',
      description: 'Классическая рулетка с одним зеро',
      icon: 'Target',
      color: 'from-red-600 to-black'
    },
    {
      id: 2,
      title: 'Американская рулетка',
      category: 'Рулетка',
      description: 'Рулетка с двойным зеро',
      icon: 'Target',
      color: 'from-green-600 to-black'
    },
    {
      id: 3,
      title: 'Mega Fortune',
      category: 'Слоты',
      description: 'Прогрессивный джекпот-слот',
      icon: 'Sparkles',
      color: 'from-purple-600 to-pink-600'
    },
    {
      id: 4,
      title: 'Book of Ra',
      category: 'Слоты',
      description: 'Древнеегипетские приключения',
      icon: 'Sparkles',
      color: 'from-yellow-600 to-orange-600'
    },
    {
      id: 5,
      title: 'Starburst',
      category: 'Слоты',
      description: 'Космические драгоценности',
      icon: 'Sparkles',
      color: 'from-blue-600 to-purple-600'
    },
    {
      id: 6,
      title: 'Блэкджек',
      category: 'Игры',
      description: 'Классическая карточная игра',
      icon: 'Spade',
      color: 'from-gray-700 to-black'
    },
    {
      id: 7,
      title: 'Баккара',
      category: 'Игры',
      description: 'Элегантная карточная игра',
      icon: 'Club',
      color: 'from-red-700 to-black'
    },
    {
      id: 8,
      title: 'Покер',
      category: 'Игры',
      description: 'Техасский холдем',
      icon: 'Heart',
      color: 'from-red-600 to-red-900'
    }
  ];

  const navItems = [
    { id: 'home', label: 'Главная', icon: 'Home' },
    { id: 'roulette', label: 'Рулетка', icon: 'Target' },
    { id: 'slots', label: 'Слоты', icon: 'Sparkles' },
    { id: 'games', label: 'Игры', icon: 'Gamepad2' },
    { id: 'support', label: 'Поддержка', icon: 'MessageCircle' }
  ];

  const filteredGames = activeSection === 'home' 
    ? games 
    : activeSection === 'roulette'
    ? games.filter(g => g.category === 'Рулетка')
    : activeSection === 'slots'
    ? games.filter(g => g.category === 'Слоты')
    : activeSection === 'games'
    ? games.filter(g => g.category === 'Игры')
    : [];

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-primary/30 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Icon name="Crown" size={32} className="text-primary animate-pulse" />
              <h1 className="text-2xl font-bold gold-text-gradient">ELITE CASINO</h1>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeSection === item.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:text-primary'
                  }`}
                >
                  <Icon name={item.icon} size={18} />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <Icon name="LogIn" size={18} className="mr-2" />
              Войти
            </Button>
          </div>
        </div>
      </nav>

      {activeSection === 'home' && (
        <section className="gold-gradient py-32 px-4 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 animate-spin-slow">
              <Icon name="Sparkles" size={100} className="text-primary" />
            </div>
            <div className="absolute bottom-10 right-10 animate-spin-slow" style={{ animationDirection: 'reverse' }}>
              <Icon name="Sparkles" size={100} className="text-primary" />
            </div>
          </div>
          
          <div className="container mx-auto text-center relative z-10">
            <h2 className="text-6xl font-black mb-6 gold-text-gradient animate-fade-in">
              ДОБРО ПОЖАЛОВАТЬ В ЭЛИТНОЕ КАЗИНО
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Играйте в лучшие игры казино в демо-режиме абсолютно бесплатно. Без регистрации. Без рисков.
            </p>
            <div className="flex gap-4 justify-center animate-scale-in" style={{ animationDelay: '0.4s' }}>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-6 text-lg">
                <Icon name="Play" size={24} className="mr-2" />
                Начать играть
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-primary text-white hover:bg-primary/20 font-bold px-8 py-6 text-lg">
                <Icon name="Info" size={24} className="mr-2" />
                Узнать больше
              </Button>
            </div>
          </div>
        </section>
      )}

      {activeSection === 'support' ? (
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-2xl">
            <Card className="card-glow bg-card border-primary/30">
              <CardHeader className="text-center">
                <Icon name="Headphones" size={48} className="mx-auto mb-4 text-primary" />
                <CardTitle className="text-3xl gold-text-gradient">Служба поддержки</CardTitle>
                <CardDescription className="text-lg">Мы всегда готовы помочь вам</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                  <Icon name="Mail" size={24} className="text-primary mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">Email поддержка</h3>
                    <p className="text-muted-foreground">support@elitecasino.com</p>
                    <p className="text-sm text-muted-foreground mt-1">Ответ в течение 24 часов</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                  <Icon name="MessageCircle" size={24} className="text-primary mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">Онлайн чат</h3>
                    <p className="text-muted-foreground">Доступен 24/7</p>
                    <Button className="mt-2 bg-primary hover:bg-primary/90">
                      Открыть чат
                    </Button>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                  <Icon name="Phone" size={24} className="text-primary mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">Телефон</h3>
                    <p className="text-muted-foreground">+7 (800) 555-35-35</p>
                    <p className="text-sm text-muted-foreground mt-1">Пн-Вс, 9:00-21:00 МСК</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      ) : (
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 gold-text-gradient">
                {activeSection === 'home' ? 'Все игры' : 
                 activeSection === 'roulette' ? 'Рулетка' :
                 activeSection === 'slots' ? 'Слоты' : 'Карточные игры'}
              </h2>
              <p className="text-muted-foreground text-lg">
                Демо-режим доступен без регистрации
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredGames.map((game, index) => (
                <Card 
                  key={game.id} 
                  className="group overflow-hidden hover-scale card-glow bg-card border-primary/30 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className={`h-32 bg-gradient-to-br ${game.color} flex items-center justify-center`}>
                    <Icon name={game.icon} size={64} className="text-white opacity-90 group-hover:scale-110 transition-transform duration-300" />
                  </CardHeader>
                  <CardContent className="p-6">
                    <CardTitle className="mb-2 text-xl">{game.title}</CardTitle>
                    <CardDescription className="mb-4">{game.description}</CardDescription>
                    <div className="flex gap-2">
                      <Button 
                        className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                        onClick={() => setSelectedGame(game)}
                      >
                        <Icon name="Play" size={16} className="mr-2" />
                        Играть
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                        onClick={() => setSelectedGame(game)}
                      >
                        <Icon name="Info" size={16} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      <Dialog open={!!selectedGame} onOpenChange={(open) => !open && setSelectedGame(null)}>
        <DialogContent className="max-w-4xl h-[80vh] bg-card border-primary">
          <DialogHeader>
            <DialogTitle className="text-2xl gold-text-gradient flex items-center gap-2">
              <Icon name={selectedGame?.icon || 'Play'} size={28} />
              {selectedGame?.title}
            </DialogTitle>
            <DialogDescription className="text-lg">
              Демо-режим • Баланс: <span className="text-primary font-bold">{demoBalance}₽</span>
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex-1 flex flex-col items-center justify-center gap-6 py-8">
            {!isPlaying ? (
              <>
                <div className={`w-48 h-48 rounded-full bg-gradient-to-br ${selectedGame?.color} flex items-center justify-center animate-pulse`}>
                  <Icon name={selectedGame?.icon || 'Play'} size={96} className="text-white" />
                </div>
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-bold">Готовы к игре?</h3>
                  <p className="text-muted-foreground max-w-md">
                    {selectedGame?.description}
                  </p>
                  <div className="flex gap-3 justify-center">
                    <Button 
                      size="lg" 
                      className="bg-primary hover:bg-primary/90"
                      onClick={() => setIsPlaying(true)}
                    >
                      <Icon name="Play" size={20} className="mr-2" />
                      Начать игру
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline"
                      className="border-primary"
                      onClick={() => setSelectedGame(null)}
                    >
                      Назад
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="w-full max-w-2xl aspect-video bg-gradient-to-br from-gray-900 to-black rounded-xl border-2 border-primary flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20">
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute animate-pulse"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animationDelay: `${Math.random() * 2}s`
                        }}
                      >
                        <Icon name="Sparkles" size={24} className="text-primary" />
                      </div>
                    ))}
                  </div>
                  <div className="text-center z-10 space-y-4">
                    <Icon name={selectedGame?.icon || 'Play'} size={80} className="mx-auto text-primary animate-spin-slow" />
                    <p className="text-2xl font-bold gold-text-gradient">Демо-версия игры</p>
                    <p className="text-muted-foreground">Полная версия доступна после регистрации</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button 
                    size="lg"
                    variant="outline"
                    className="border-primary"
                    onClick={() => {
                      setDemoBalance(demoBalance - 50);
                    }}
                    disabled={demoBalance < 50}
                  >
                    <Icon name="Coins" size={20} className="mr-2" />
                    Сделать ставку (50₽)
                  </Button>
                  <Button 
                    size="lg"
                    className="bg-secondary hover:bg-secondary/90"
                    onClick={() => {
                      setIsPlaying(false);
                      setDemoBalance(1000);
                    }}
                  >
                    <Icon name="RotateCcw" size={20} className="mr-2" />
                    Сбросить баланс
                  </Button>
                  <Button 
                    size="lg"
                    variant="outline"
                    onClick={() => {
                      setIsPlaying(false);
                      setDemoBalance(1000);
                      setSelectedGame(null);
                    }}
                  >
                    Закрыть
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <footer className="border-t border-primary/30 bg-card/50 py-12 px-4 mt-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Crown" size={28} className="text-primary" />
                <h3 className="text-xl font-bold gold-text-gradient">ELITE CASINO</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                Элитное онлайн казино с лучшими играми и щедрыми бонусами.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-primary">Игры</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="hover:text-primary cursor-pointer transition-colors">Рулетка</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Слоты</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Карточные игры</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Live казино</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-primary">Информация</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="hover:text-primary cursor-pointer transition-colors">О нас</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Правила</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Ответственная игра</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Конфиденциальность</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-primary">Контакты</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  support@elitecasino.com
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  +7 (800) 555-35-35
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-primary/30 text-center text-sm text-muted-foreground">
            <p>© 2024 Elite Casino. Все права защищены. 18+</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;