#include "Screens/SplashScreen.hpp"

bool SplashScreen::onEnter()
{
    return true;
}

void SplashScreen::onExit()
{

}

bool SplashScreen::update()
{
	this->manager->setCurrentScreen(eScreen::GAME);
    return true;
}

void SplashScreen::render(const float &_fps)
{

}

bool SplashScreen::eventPoll(const sf::Event &event)
{
    return true;
}
