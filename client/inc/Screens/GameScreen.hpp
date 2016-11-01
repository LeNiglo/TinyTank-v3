#ifndef GAMESCREEN_HPP_
# define GAMESCREEN_HPP_

# include "Screens/Screen.hpp"


# include "Objects/Tanks/Tiger.hpp"

class GameScreen : public Screen
{
public:
	GameScreen(sf::RenderWindow*, sf::View*, GameManager*);
	~GameScreen();
	virtual bool onEnter();
	virtual void onExit();
	virtual bool update();
	virtual void render(const float&);
	virtual bool eventPoll(const sf::Event&);
private:
	sf::View				*mapView;

	float					currentZoom;

	Tank					*testTank;
};

#endif /* end of include guard: GAMESCREEN_HPP_ */
