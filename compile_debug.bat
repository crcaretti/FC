@echo off
:: Free Cities Basic Compiler - Windows x86_64
:: Will wait for keypress before terminating.

:: Uses embedded Python 3.5.3 x86_64
:: Will add all *.tw files to StoryIncludes.
"%~dp0devTools\python-3.5.3\python.exe" "%~dp0devTools\scripts\includes.py" "src\config\start.tw.proto" "src\config\start.tw" "src" "%*"

CALL "%~dp0devTools\tweeGo\tweego.exe" -o "%~dp0bin/FC.html" "%~dp0src\config\start.tw"
ECHO Done
PAUSE
