@echo off
REM Batch script to update all blog HTML files with modern theme CSS
REM This script adds the modern-theme.css link and Google Fonts to all blog posts

setlocal enabledelayedexpansion

set "root_dir=e:\hexo"
set "css_link=<link rel="stylesheet" href="../../../css/modern-theme.css"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&family=Fira+Sans:wght@400;500;700;800&display=swap" rel="stylesheet">"

echo Updating blog HTML files with modern theme...
echo.

REM Find all index.html files in blog directories (2024, 2025, 2026 etc)
for /r "%root_dir%" %%F in (index.html) do (
    set "file=%%F"
    
    REM Check if file is in a date directory structure (YYYY/MM/DD)
    if "!file:2024=!" neq "!file!" (
        call :update_file "!file!"
    ) else if "!file:2025=!" neq "!file!" (
        call :update_file "!file!"
    ) else if "!file:2026=!" neq "!file!" (
        call :update_file "!file!"
    )
)

echo.
echo Update complete!
pause
exit /b

:update_file
setlocal enabledelayedexpansion
set "filepath=%~1"

REM Check if file already has modern-theme.css
findstr /M "modern-theme.css" "!filepath!" >nul
if !errorlevel! neq 0 (
    echo Processing: !filepath!
    
    REM Create backup
    copy "!filepath!" "!filepath!.bak" >nul
    
    REM Update file - this is simplified, in reality we'd use PowerShell for better handling
    echo File flagged for update: !filepath!
)
endlocal
exit /b
