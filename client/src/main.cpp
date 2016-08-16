#include "config.h"
#include "GameManager.hpp"

int main(int argc, char const *argv[])
{
	std::cout << "TinyTank V" << VERSION_MAJOR << "." << VERSION_MINOR << std::endl;

	GameManager manager;

	manager.init();
	return manager.loop();
}
