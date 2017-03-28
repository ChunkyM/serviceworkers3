@echo off
cd serviceworkers3
git add --all
git status
set /p message="Enter commit message: "
git commit -m "%message%"
git push origin master
pause