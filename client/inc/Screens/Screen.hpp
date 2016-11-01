#ifndef SCREEN_HPP_
# define SCREEN_HPP_

# include "config.h"

# include <SFML/graphics.hpp>
# include <SFML/audio.hpp>
# include <SFML/network.hpp>

# include "UI/ADrawable.hpp"

# define SCREEN_WIDTH 1600
# define SCREEN_HEIGHT 900

class GameManager;

enum eScreen {
    SPLASH = 0,
	MENU,
	LOBBY,
	GAME,
	QUIT
};

class Screen
{
public:
	Screen(sf::RenderWindow *_w, sf::View *_v, GameManager *_m)
	{
		this->window = _w;
        this->view = _v;
		this->manager = _m;
	};
	virtual bool onEnter() = 0;					// Called when you enter the Screen => use for init
	virtual void onExit() = 0;					// Called before you exit the Screen => use for clean / delete
	virtual bool update() = 0;					// Called every cycle of SFML
	virtual void render(const float&) = 0;		// Called during the render of SFML => use this->window->draw();
	virtual bool eventPoll(const sf::Event&) = 0;
	void setRenderWindow(sf::RenderWindow *_w) {
		this->window = _w;
	}
	void setView(sf::View *_v) {
		this->view = _v;
	}
	void setManager(GameManager *_m) {
		this->manager = _m;
	}
protected:
	sf::RenderWindow		*window;
	sf::View				*view;
	GameManager				*manager;
};

# include "GameManager.hpp"

#endif /* end of include guard: SCREEN_HPP_ */
