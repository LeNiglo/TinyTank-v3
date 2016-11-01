#ifndef TIGER_HPP_
# define TIGER_HPP_

# include "Tank.hpp"

class Tiger : public Tank
{
public:
	Tiger(const int &_x, const int &_y) : Tank(_x, _y)
	{
		this->type = eTank::TIGER;
	}
};

#endif /* end of include guard: TIGER_HPP_ */
