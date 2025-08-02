@echo off
echo.
echo ==================================================
echo      PUSHING ONLY BACK AND FRONT TO 'main'      
echo ==================================================
echo.
for /f "tokens=*" %%a in ('git branch --show-current') do set CURRENT_BRANCH=%%a
echo Current branch: %CURRENT_BRANCH%
echo.
echo Pulling latest changes...
git pull origin main
echo.
echo Staging only back and front files...
git add back
git add front
echo.
echo Committing changes...
git commit -m "Update back and front on 2025-08-02 14:40:02"
echo.
echo Pushing changes...
git push origin main
if %errorlevel% neq 0 (
  echo Push failed!
  pause
exit /b 1
)
echo.
echo Push completed successfully!
pause