#ifndef MENUSCREEN_HPP_
# define MENUSCREEN_HPP_

# include "Screens/Screen.hpp"

class MenuScreen : public Screen
{
public:
    MenuScreen(sf::RenderWindow *_w, sf::View *_v, GameManager *_m) : Screen(_w, _v, _m) { };
	virtual bool onEnter();
	virtual void onExit();
	virtual bool update();
	virtual void render(const float&);
	virtual bool eventPoll(const sf::Event&);
};

#endif /* end of include guard: MENUSCREEN_HPP_ */
