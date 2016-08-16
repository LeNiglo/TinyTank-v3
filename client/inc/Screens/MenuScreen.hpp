#ifndef MENUSCREEN_HPP_
# define MENUSCREEN_HPP_

# include "Screens/Screen.hpp"

class MenuScreen : public Screen
{
public:
    MenuScreen(sf::RenderWindow *_w, sf::View *_v) : Screen(_w, _v) { };
	virtual bool onEnter();
	virtual void onExit();
	virtual bool update();
	virtual void render();
	virtual bool eventPoll(const sf::Event&, GameManager*);
};

#endif /* end of include guard: MENUSCREEN_HPP_ */
