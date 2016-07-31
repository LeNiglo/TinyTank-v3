#ifndef ADRAWABLE_HPP_
#define ADRAWABLE_HPP_

# include <SFML/Graphics.hpp>
// # include "Input.hpp"

class ADrawable
{
public:
  ADrawable(bool hide, const sf::Vector2f &pos, const sf::Vector2f &size) : _hide(hide), _pos(pos), _size(size) { };
  virtual ~ADrawable() { };

  virtual void update(/*const Input &, */float) = 0;
  virtual void draw(sf::RenderWindow &win) = 0;

  void  setHide(bool hide)
  {
	  this->_hide = hide;
  };
  bool  isHidden() const
  {
	  return this->_hide;
  }

  void  setSize(const sf::Vector2f &size)
  {
	  this->_size = size;
  }

  const sf::Vector2f &getSize() const
  {
	  return this->_size;
  }

  void  setPosition(const sf::Vector2f &pos)
  {
	  this->_pos = pos;
  }

  const sf::Vector2f &getPosition() const
  {
	  return this->_pos;
  }

protected:
  bool          _hide;
  sf::Vector2f  _pos;
  sf::Vector2f  _size;
};

#endif /* end of include guard: ADRAWABLE_HPP_ */
