all: ./src/config/start.tw FC.html

./src/config/start.tw: $(shell find src -type d)
	python ./devTools/scripts/includes_linux.py

FC.html: $(shell find src -type f)
	./devTools/tweeGo/tweego -o ./bin/FC.html ./src/config/start.tw
