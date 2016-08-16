#include "GameManager.hpp"

GameManager::GameManager()
{
    this->window = new sf::RenderWindow(sf::VideoMode(SCREEN_WIDTH, SCREEN_HEIGHT), "Emergency Intelligence Project");
    this->window->setFramerateLimit(5);
    
    this->view = new sf::View(sf::FloatRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT));
    this->window->setView(*this->view);
    
    this->currentScreen = eScreen::SPLASH;
}

GameManager::~GameManager()
{
    
}

bool						GameManager::init()
{
    // init screens 1 by 1
    
    // SPLASH
    SplashScreen *splashScreen = new SplashScreen(this->window, this->view);
    this->screens.push_back(splashScreen);
    
    // MENU
    MenuScreen *menuScreen = new MenuScreen(this->window, this->view);
    this->screens.push_back(menuScreen);
    
    // LOBBY
    LobbyScreen *lobbyScreen = new LobbyScreen(this->window, this->view);
    this->screens.push_back(lobbyScreen);
    
    // GAME
    GameScreen *gameScreen = new GameScreen(this->window, this->view);
    this->screens.push_back(gameScreen);
    
    // QUIT
    this->screens.push_back(NULL);

    return true;
}

int							GameManager::loop()
{
    while (this->window->isOpen()) {
        if (!this->eventPoll()) {
            return EXIT_FAILURE;
        }
        
        this->screens[this->currentScreen]->update();
        
        this->window->clear();
        this->screens[this->currentScreen]->render();
        this->window->display();
    }
    return EXIT_SUCCESS;
}

bool						GameManager::eventPoll()
{
    sf::Event event;
    
    while (this->window->pollEvent(event)) {
        if (!this->screens[this->currentScreen]->eventPoll(event, this)) {
            return false;
        }
        
        switch (event.type)
        {
            case sf::Event::Closed:
            {
                this->window->close();
                return false;
                break;
            }
                
            case sf::Event::Resized:
            {
                this->view->reset(sf::FloatRect(0, 0, event.size.width, event.size.height));
                this->window->setView(*this->view);
                break;
            }
                
            default:
                break;
                
        }

    }
    return true;
}

void				GameManager::setCurrentScreen(const eScreen &s)
{
    if (s == eScreen::QUIT) {
        this->window->close();
    } else {
        this->currentScreen = s;
        this->view->reset(sf::FloatRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT));
        this->window->setView(*this->view);
    }
}
