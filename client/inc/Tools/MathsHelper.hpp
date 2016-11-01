#ifndef MATHSHELPER_HPP_
# define MATHSHELPER_HPP_

# include "../Objects/GameObject.hpp"

class MathsHelper
{
public:
	static int getAngleWithObject(const int &x, const int &y, const GameObject &object) {
		return std::atan2(y - object.getY(), x - object.getX()) * 180 / M_PI;
	}
};

#endif /* MATHSHELPER_HPP_ */
