//
//  SplashScreen.hpp
//  TinyTank
//
//  Created by Guillaume Lefrant on 01/08/16.
//
//

#ifndef SPLASHSCREEN_HPP_
# define SPLASHSCREEN_HPP_

# include "Screen.hpp"

class SplashScreen : public Screen {
public:
    SplashScreen(sf::RenderWindow *_w, sf::View *_v) : Screen(_w, _v) { };
    virtual bool onEnter();
    virtual void onExit();
    virtual bool update();
    virtual void render();
    virtual bool eventPoll(const sf::Event&, GameManager*);
};

#endif /* SPLASHSCREEN_HPP_ */
