@echo off
:: Free Cities Basic Compiler - Windows

:: Set working directory
pushd %~dp0

:: Compile the game
call "%~dp0compile.bat"

popd
PAUSE
