#ifndef LOBBYSCREEN_HPP_
# define LOBBYSCREEN_HPP_

# include "Screens/Screen.hpp"

class LobbyScreen : public Screen
{
public:
    LobbyScreen(sf::RenderWindow *_w, sf::View *_v) : Screen(_w, _v) { };
    virtual bool onEnter();
    virtual void onExit();
    virtual bool update();
    virtual void render();
    virtual bool eventPoll(const sf::Event&, GameManager*);
};

#endif /* LOBBYSCREEN_HPP_ */
