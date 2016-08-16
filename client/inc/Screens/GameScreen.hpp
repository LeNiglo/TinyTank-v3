#ifndef GAMESCREEN_HPP_
# define GAMESCREEN_HPP_

# include "Screens/Screen.hpp"

class GameScreen : public Screen
{
public:
	GameScreen(sf::RenderWindow *_w, sf::View *_v);
	~GameScreen();
	virtual bool onEnter();
	virtual void onExit();
	virtual bool update();
	virtual void render();
	virtual bool eventPoll(const sf::Event&, GameManager*);
private:
	sf::View				*mapView;
};

#endif /* end of include guard: GAMESCREEN_HPP_ */
