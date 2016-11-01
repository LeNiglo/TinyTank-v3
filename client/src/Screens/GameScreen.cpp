#include "Screens/GameScreen.hpp"

GameScreen::GameScreen(sf::RenderWindow *_w, sf::View *_v, GameManager *_m) : Screen(_w, _v, _m)
{
	this->mapView = new sf::View(sf::FloatRect(this->window->getSize().x - 210, this->window->getSize().y - 160, 200, 150));
}

GameScreen::~GameScreen()
{
	delete this->mapView;
}


bool GameScreen::onEnter()
{
	this->mapView->reset(sf::FloatRect(this->window->getSize().x - 210, this->window->getSize().y - 160, 200, 150));
	this->testTank = new Tiger(100, 150);
	this->currentZoom = 1.0f;
	return true;
}

void GameScreen::onExit()
{
	delete this->testTank;
}

bool GameScreen::update()
{
	int offsetX = 0;
	int offsetY = 0;
	const int movement = 4;

	if (this->testTank->getTop()) {
		offsetY -= movement;
	}

	if (this->testTank->getRight()) {
		offsetX += movement;
	}

	if (this->testTank->getBottom()) {
		offsetY += movement;
	}

	if (this->testTank->getLeft()) {
		offsetX -= movement;
	}

	if (offsetX != 0 && offsetY != 0) {
		// sqrt(8) because sqrt(2x^2) = 4 => 2x^2 = 16 => x = sqrt(16 / 2);
		offsetX = (offsetX > 0 ? 1 : -1) * sqrt(8);
		offsetY = (offsetY > 0 ? 1 : -1) * sqrt(8);
	}

	this->testTank->move(offsetX, offsetY);
	//TODO setCenter on Tank but respect map boundaries.
	// this->view->setCenter(this->testTank->getX(), this->testTank->getY());
	return true;
}

void GameScreen::render(const float &_fps)
{
	const int tankBottomX = 100;
	const int tankBottomY = 70;
	const int tankTopX = 80;
	const int tankTopY = 30;

	sf::RectangleShape bottomShape(sf::Vector2f(tankBottomX, tankBottomY));

	bottomShape.setOrigin(60, 35);
	bottomShape.setPosition(this->testTank->getX(), this->testTank->getY());
	bottomShape.setRotation(this->testTank->getRotation());
	bottomShape.setFillColor(sf::Color::White);

	sf::RectangleShape topShape(sf::Vector2f(tankTopX, tankTopY));

	topShape.setOrigin(15, 15);
	topShape.setPosition(this->testTank->getX(), this->testTank->getY());
	topShape.setRotation(this->testTank->getTopRotation());
	topShape.setFillColor(sf::Color::Blue);

	this->window->draw(bottomShape);
	this->window->draw(topShape);

	// std::cout << "Framerate = " << _fps << " FPS." << std::endl;
}

bool GameScreen::eventPoll(const sf::Event &event)
{
	const float zoomAmount = .25f;

	switch (event.type)
	{
		// TODO be able to customize everything using settings
		case sf::Event::MouseButtonPressed:
		switch (event.mouseButton.button) {
			case sf::Mouse::Left:
			this->testTank->setTopRotation(MathsHelper::getAngleWithObject(event.mouseButton.x, event.mouseButton.y, *this->testTank));
			std::cout << "Shoot at " << this->testTank->getTopRotation() << "deg, from [" << this->testTank->getX() << ", " << this->testTank->getY()<< "]." << std::endl;
			break;

			default:
			break;
		};
		break;

		case sf::Event::MouseMoved:
		// TODO limit rotation according to this->testTank->getDirection(). You aim in the direction your tank is looking at.
		this->testTank->setTopRotation(MathsHelper::getAngleWithObject(event.mouseMove.x, event.mouseMove.y, *this->testTank));
		break;

		case sf::Event::MouseWheelMoved:
		//TODO limit zoom to a minimum and to a maximum.
		this->view->zoom(1.0f - event.mouseWheel.delta * zoomAmount);
		break;

		case sf::Event::KeyPressed:
		switch (event.key.code)
		{
			case sf::Keyboard::Escape:
			this->manager->setCurrentScreen(eScreen::QUIT);
			break;

			case sf::Keyboard::Up:
			this->testTank->setBottom(false);
			this->testTank->setTop(true);
			break;

			case sf::Keyboard::Right:
			this->testTank->setLeft(false);
			this->testTank->setRight(true);
			break;

			case sf::Keyboard::Down:
			this->testTank->setTop(false);
			this->testTank->setBottom(true);
			break;

			case sf::Keyboard::Left:
			this->testTank->setRight(false);
			this->testTank->setLeft(true);
			break;

			default:
			break;
		};
		this->testTank->checkRotation();
		break;

		case sf::Event::KeyReleased:
		switch (event.key.code)
		{
			case sf::Keyboard::Up:
			this->testTank->setTop(false);
			break;

			case sf::Keyboard::Right:
			this->testTank->setRight(false);
			break;

			case sf::Keyboard::Down:
			this->testTank->setBottom(false);
			break;

			case sf::Keyboard::Left:
			this->testTank->setLeft(false);
			break;

			default:
			break;
		};
		this->testTank->checkRotation();
		break;

		default:
		break;
	};
	return true;
}
