@echo off
:: Free Cities Basic Compiler - Windows x86_64

:: Uses embedded Python 3.5.3 x86_64
:: Will add all *.tw files to StoryIncludes.
"%~dp0devTools\python-3.5.3\python.exe" "%~dp0devTools\scripts\includes_windows.py %*"

CALL "%~dp0devTools\tweeGo\tweego.exe" -o "%~dp0bin/FC.html" "%~dp0src\config\start.tw"
ECHO Done
