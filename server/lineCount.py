"""Count lines of code in all project files. (Excludes code not written by me)."""

import os
from pathlib import Path
from statistics import mean

rootDir = os.path.dirname(os.getcwd())

excludeFolders = set(["node_modules", ".git", "public", "assets", "README_images"])
excludeFiles = set(
    [
        "package.json",
        "package-lock.json",
        ".gitignore",
        ".eslintrc.cjs",
        "index.html",
        "vite.config.js",
    ]
)

codeCount = 563
avgArray = []
for root, folders, files in os.walk(rootDir):
    folders[:] = [f for f in folders if f not in excludeFolders]
    files[:] = [x for x in files if x not in excludeFiles]

    for file in files:
        filename = Path(root + f"/{file}")
        ext = filename.suffix
    
        if ext not in [".png", ".jpg", ".jpeg", '.txt']:
            with open(filename) as f:
                lines_of_codes = len(f.readlines())
                avgArray.append(lines_of_codes)
                codeCount += lines_of_codes
  

codeAvg = round(mean(avgArray))
print(f"<h1>This project contains: </h1><hr/>")

# Print lines of code in project
print(f"<h3><mark><b>{codeCount}</b></mark> lines of code!</h3><r/>")

# get average of lines/module
print(f"<h3>Average of <mark><b>{codeAvg}</b></mark> lines per module.</h3>")

#
