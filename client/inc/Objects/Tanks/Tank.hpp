#ifndef TANK_HPP_
# define TANK_HPP_

# include "../GameObject.hpp"

enum eTank {
	TIGER = 0
};

enum eDirection {
	N = -90,
	NE = -45,
	E = 0,
	SE = 45,
	S = 90,
	SW = 135,
	W = 180,
	NW = 225
};

class Tank : public GameObject
{
public:
	Tank(const int &_x, const int &_y) : GameObject(_x, _y)
	{
		this->topRotation = 0;
		this->top = false;
		this->right = false;
		this->bottom = false;
		this->left = false;

	}

	void					setTop(const bool &_t) { this->top = _t; }
	void					setRight(const bool &_r) { this->right = _r; }
	void					setBottom(const bool &_b) { this->bottom = _b; }
	void					setLeft(const bool &_l) { this->left = _l; }

	bool					getTop() const { return this->top; }
	bool					getRight() const { return this->right; }
	bool					getBottom() const { return this->bottom; }
	bool					getLeft() const { return this->left; }

	int						getTopRotation() const { return this->topRotation; };
	void					setTopRotation(const int &_r) { this->topRotation = _r; }

	void					checkRotation()
	{
		if (this->top == true)
			if (this->left == true)
				this->setRotation(eDirection::NW);
			else if (this->right == true)
				this->setRotation(eDirection::NE);
			else
				this->setRotation(eDirection::N);
		else if (this->bottom == true)
			if (this->left == true)
				this->setRotation(eDirection::SW);
			else if (this->right == true)
				this->setRotation(eDirection::SE);
			else
				this->setRotation(eDirection::S);
		else if (this->left == true)
			this->setRotation(eDirection::W);
		else if (this->right == true)
			this->setRotation(eDirection::E);
	}

protected:
	bool					top;
	bool					right;
	bool					bottom;
	bool					left;
	eTank					type;
	int						topRotation;
};

#endif /* end of include guard: TANK_HPP_ */
