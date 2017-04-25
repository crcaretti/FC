@echo off
:: Free Cities Basic Compiler - Windows

:: Will add all *.tw files to StoryIncludes.
del src\config\start.tw
copy src\config\start.tw.proto start.tw.tmp >nul
>>start.tw.tmp (for /r "src" %%F in (*.tw) do echo %%F)
move start.tw.tmp src\config\start.tw >nul

:: Run the appropriate compiler for the user's CPU architecture.
if %PROCESSOR_ARCHITECTURE% == AMD64 (
    CALL "%~dp0devTools\tweeGo\tweego_win64.exe" -o "%~dp0bin/FC_pregmod.html" "%~dp0src\config\start.tw"
) else (
    CALL "%~dp0devTools\tweeGo\tweego_win86.exe" -o "%~dp0bin/FC_pregmod.html" "%~dp0src\config\start.tw"
)

del src\config\start.tw
ECHO Done
PAUSE
