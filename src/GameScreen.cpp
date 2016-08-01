#include "GameScreen.hpp"

GameScreen::GameScreen(sf::RenderWindow *_w, sf::View *_v) : Screen(_w, _v)
{
    this->mapView = new sf::View(sf::FloatRect(SCREEN_WIDTH - 210, SCREEN_HEIGHT - 160, 200, 150));
}


bool GameScreen::onEnter()
{
	return true;
}

void GameScreen::onExit()
{

}

bool GameScreen::update()
{
	return true;
}

void GameScreen::render()
{

}

bool GameScreen::eventPoll(const sf::Event &event, GameManager *manager)
{
	return true;
}
