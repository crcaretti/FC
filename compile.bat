@echo off
:: Free Cities Basic Compiler - Windows

:: See if we can find a git installation
setlocal enabledelayedexpansion

for %%k in (HKCU HKLM) do (
    for %%w in (\ \Wow6432Node\) do (
        for /f "skip=2 delims=: tokens=1*" %%a in ('reg query "%%k\SOFTWARE%%wMicrosoft\Windows\CurrentVersion\Uninstall\Git_is1" /v InstallLocation 2^> nul') do (
            for /f "tokens=3" %%z in ("%%a") do (
                set GIT=%%z:%%b
				set GITFOUND=yes
                goto FOUND
            )
        )
    )
)
:FOUND
if %GITFOUND% == yes (
	set "PATH=%GIT%bin;%PATH%"
	bash --login -c ./sanityCheck
)

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

if %GITFOUND% == yes (
	:: Make the output prettier, replacing \t with a tab and \n with a newline
	bash -c "sed -i -e '/^.*<div id=\"store-area\".*$/s/\\\t/\t/g' -e '/^.*<div id=\"store-area\".*$/s/\\\n/\n/g' bin/FC_pregmod.html"

	:: Revert ./src/init/storyInit.tw for next compilation
	git checkout -- ./src/init/storyInit.tw
)

del src\config\start.tw
ECHO Done
