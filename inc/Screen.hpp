#ifndef SCREEN_HPP_
#define SCREEN_HPP_

# include "config.h"

# include <SFML/graphics.hpp>
# include <SFML/audio.hpp>
# include <SFML/network.hpp>

class ScreenManager;

enum eScreen {
	MENU = 0,
	QUIT
};

class Screen
{
public:
	virtual bool onEnter() = 0;		// Called when you enter the Screen => use for init
	virtual void onExit() = 0;		// Called before you exit the Screen => use for clean / delete
	virtual bool update() = 0;		// Called every cycle of SFML
	virtual void render() = 0;		// Called during the render of SFML => use this->window->draw();
	virtual bool eventPoll(const sf::Event&, ScreenManager*) = 0;
	void setRenderWindow(sf::RenderWindow *_w) {
		this->window = _w;
	}
	void setView(sf::View *_v) {
		this->view = _v;
	}
protected:
	sf::RenderWindow		*window;
	sf::View				*view;
};

# include "ScreenManager.hpp"

#endif /* end of include guard: SCREEN_HPP_ */
