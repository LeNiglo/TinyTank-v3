#ifndef LOBBYSCREEN_HPP_
# define LOBBYSCREEN_HPP_

# include "Screens/Screen.hpp"

class LobbyScreen : public Screen
{
public:
    LobbyScreen(sf::RenderWindow *_w, sf::View *_v, GameManager *_m) : Screen(_w, _v, _m) { };
    virtual bool onEnter();
    virtual void onExit();
    virtual bool update();
    virtual void render(const float&);
    virtual bool eventPoll(const sf::Event&);
};

#endif /* LOBBYSCREEN_HPP_ */
