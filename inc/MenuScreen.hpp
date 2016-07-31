#ifndef MENUSCREEN_HPP_
#define MENUSCREEN_HPP_

# include "Screen.hpp"
# include "UI/ADrawable.hpp"

class MenuScreen : public Screen
{
public:
	virtual bool onEnter();
	virtual void onExit();
	virtual bool update();
	virtual void render();
	virtual bool eventPoll(const sf::Event&, ScreenManager*);
};

#endif /* end of include guard: MENUSCREEN_HPP_ */
