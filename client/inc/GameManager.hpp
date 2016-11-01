#ifndef GAMEMANAGER_HPP_
# define GAMEMANAGER_HPP_

# include "Screens/SplashScreen.hpp"
# include "Screens/MenuScreen.hpp"
# include "Screens/LobbyScreen.hpp"
# include "Screens/GameScreen.hpp"

class GameManager
{
public:
	GameManager();
	~GameManager();
	bool						init();
	int							loop();
	void                        setCurrentScreen(const eScreen&);
private:
	bool						eventPoll();
private:
	sf::View					*view;
	sf::RenderWindow			*window;
	std::vector<Screen*>		screens;
	eScreen						currentScreen;

	// NetworkManager			*network;
};

#endif /* end of include guard: GAMEMANAGER_HPP_ */
