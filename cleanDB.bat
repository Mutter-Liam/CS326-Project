@echo off
for %%f in ("./ids" "./users" "./boards" "./events") do (
    if exist %%f (
        rmdir %%f /s /q
    )
)
echo Database wiped.