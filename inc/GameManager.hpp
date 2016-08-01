#ifndef GAMEMANAGER_HPP_
# define GAMEMANAGER_HPP_

# include "SplashScreen.hpp"
# include "MenuScreen.hpp"
# include "LobbyScreen.hpp"
# include "GameScreen.hpp"

class GameManager
{
public:
	GameManager();
	~GameManager();
	bool						init();
	int							loop();
private:
	bool						eventPoll();
    void                        setCurrentScreen(const eScreen&);
private:
	sf::View					*view;
	sf::RenderWindow			*window;
	std::vector<Screen*>		screens;
	eScreen						currentScreen;

	// NetworkManager			*network;
};

#endif /* end of include guard: GAMEMANAGER_HPP_ */
