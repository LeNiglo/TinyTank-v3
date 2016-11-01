#ifndef SPLASHSCREEN_HPP_
# define SPLASHSCREEN_HPP_

# include "Screens/Screen.hpp"

class SplashScreen : public Screen {
public:
    SplashScreen(sf::RenderWindow *_w, sf::View *_v, GameManager *_m) : Screen(_w, _v, _m) { };
    virtual bool onEnter();
    virtual void onExit();
    virtual bool update();
    virtual void render(const float&);
    virtual bool eventPoll(const sf::Event&);
};

#endif /* SPLASHSCREEN_HPP_ */
