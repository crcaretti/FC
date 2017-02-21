@echo off
:: Free Cities Basic Compiler - Windows x86_64

:: Will add all *.tw files to StoryIncludes.
del src\config\start.tw
copy src\config\start.tw.proto start.tw.tmp >nul
>>start.tw.tmp (for /r "src" %%F in (*.tw) do echo %%F)
move start.tw.tmp src\config\start.tw >nul

CALL "%~dp0devTools\tweeGo\tweego.exe" -o "%~dp0bin/FC.html" "%~dp0src\config\start.tw"
ECHO Done
