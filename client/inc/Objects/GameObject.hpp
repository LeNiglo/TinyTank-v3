#ifndef GAMEOBJECT_HPP_
# define GAMEOBJECT_HPP_

class GameObject
{
public:
	GameObject(const int &_x, const int &_y) : x(_x), y(_y) { this->rotation = 0; };
	void 			move(const int &_x, const int &_y)
	{
		this->x += _x;
		this->y += _y;
	}
	int				getX() const { return this->x; };
	int				getY() const { return this->y; };
	int				getRotation() const { return this->rotation; };
	void			setRotation(const int &_r) { this->rotation = _r; }

protected:
	int				x;
	int				y;
	int				rotation;
};

#endif /* end of include guard: GAMEOBJECT_HPP_ */
