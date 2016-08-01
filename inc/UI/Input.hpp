//
//  Input.hpp
//  TinyTank
//
//  Created by Guillaume Lefrant on 01/08/16.
//
//

#ifndef Input_h
# define Input_h


#include <SFML/Graphics.hpp>
#include <chrono>
#include <vector>

class Input
{
public:
    Input()
    {
        _x = _y = _xRel = _yRel = 0;
        _isButtonPressed = false;
        _isMouseWheeled = false;
        _delta = 0;
    }
    
    ~Input() { };
    
    bool getState(sf::Keyboard::Key key) const
    {
        try
        {
            return (_keyState.at(key));
        }
        catch (std::exception &e)
        {
            return (false);
        }
    }
    
    bool getState(const std::string &action) const
    {
        sf::Keyboard::Key key;
        try
        {
            key = _action.at(action);
        }
        catch (std::exception &e)
        {
            return (false);
        }
        try
        {
            return (_keyState.at(key));
        }
        catch (std::exception &e)
        {
            return (false);
        }
    }
    
    void setAction(const std::string &action, sf::Keyboard::Key key)
    {
        _action[action] = key;
    }
    
    void update(const sf::Event &event)
    {
        if (_isMouseWheeled && (std::chrono::steady_clock::now() - _chronoWheel).count() >= 0.3)
            _isMouseWheeled = false;
        _text = "";
        switch (event.type)
        {
            case sf::Event::KeyPressed:
                _keyState[event.key.code] = true;
                break;
            case sf::Event::KeyReleased:
                _keyState[event.key.code] = false;
                break;
            case sf::Event::TextEntered:
                _text += event.text.unicode;
                _chronoText = std::chrono::steady_clock::now();
                break;
            case sf::Event::MouseButtonPressed:
                _isButtonPressed = true;
                _xRel = _x - event.mouseButton.x;
                _yRel = _y - event.mouseButton.y;
                _x = event.mouseButton.x;
                _y = event.mouseButton.y;
                _button = event.mouseButton.button;
                break;
            case sf::Event::MouseButtonReleased:
                _isButtonPressed = false;
                break;
            case sf::Event::MouseMoved:
                _xRel = _x - event.mouseMove.x;
                _yRel = _y - event.mouseMove.y;
                _x = event.mouseMove.x;
                _y = event.mouseMove.y;
                break;
            case sf::Event::MouseWheelMoved:
                _isMouseWheeled = true;
                _delta = event.mouseWheel.delta;
                _chronoWheel = std::chrono::steady_clock::now();
            default:
                break;
        }
    }
    
    bool isButtonPressed() const { return _isButtonPressed; };
    bool isMouseWheeled() const { return _isMouseWheeled; };
    
    std::vector<int> getMousePos() const { return {_x, _y}; };
    std::vector<int> getMouseRelPos() const { return {_xRel, _yRel}; };
    sf::Mouse::Button getButtonPressed() const { return _button; };
    int getWheel() const { return _delta; };
    const std::string &getText() const { return _text; };
    
protected:
    std::map<sf::Keyboard::Key, bool>   _keyState;
    std::map<std::string, sf::Keyboard::Key> _action;
    
    int _x;
    int _y;
    int _xRel;
    int _yRel;
    
    bool _isButtonPressed;
    sf::Mouse::Button _button;
    
    bool _isMouseWheeled;
    int _delta;
    std::chrono::steady_clock::time_point _chronoWheel;
    
    std::string _text;
    std::chrono::steady_clock::time_point _chronoText;
};


#endif /* Input_h */
