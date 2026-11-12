# THE PABNA HAUNTING | Fully Unlocked, Corrected Edition (v3.1)

A complete four-page interactive horror website using **HTML, CSS, and vanilla JavaScript**.

**All four pages always open directly.** There are no page access locks, access-denied overlays, read-only previews, mandatory logins or server requirements. Passcode and ciphers remain optional interactive narrative puzzles. You can visit any page using the navigation bar or a direct URL.

## How to run in VS Code

1. Extract the ZIP file into a folder named `Pabna-Haunting-Final-Unlocked`.
2. In VS Code: **File > Open Folder** and select that folder.
3. Install the **Live Server** extension (Ritwick Dey) if needed.
4. Right-click `index.html` and choose **Open with Live Server**.
5. The site normally opens at `http://127.0.0.1:5500/index.html`. All other HTML pages are available in the navigation bar.

**Alternative:** run `python3 -m http.server 8000` inside the folder, then open `http://localhost:8000/`.

## Pages

- **Gateway (`index.html`)**: folklore setting, optional passcode challenge, link to CCTV, horror whisper audio button.
- **Surveillance (`surveillance.html`)**: six simulated CCTV feeds, selectable cameras, infrared, distortion slider, glitch, evidence scan, footstep audio.
- **Archive (`archive.html`)**: searchable invented patient records, two text/number ciphers and a final clue, radio static audio.
- **Escape (`escape.html`)**: persistent five-minute countdown, SVG three-wire connection puzzle, final answer, success/failure, optional horror sting, independent timer restart and an end-screen **Retry Escape** button that preserves archive progress.

## All four bonus features (+20 possible marks subject to evaluation)

1. **Web Audio API soundscapes**: deep ambient hum, filtered breath/whisper, synthesized voice whisper if browser speech engine is available, static, footsteps, glitch, success and failure stings. The user must enable sound with the Sound button or audio effect button. Modern browsers prohibit unprompted audio playback. Sound preference is remembered, but after page navigation, a user gesture may be required again to resume audio.
2. **LocalStorage persistence**: ciphers, camera clue, solved wire connections, game ending, language preference, sound preference and escape countdown deadline survive refresh/navigation within the same browser and origin. The timer starts when the Escape page is first visited, including direct navigation, and does **not** reset on refresh. Use Restart Timer or Reset Progress to restart.
3. **SVG interactive mini-game**: match three left-side colored terminals with the same right-side colors. Lines draw in SVG, pointer and keyboard supported. It is an interactive click-to-connect circuit, not a drag-to-connect control.
4. **English/Bengali toggle**: switches all narrative, UI buttons, hints, statuses, camera names and labels, searchable patient names/statuses, dynamic feedback, and ending messages. Fixed puzzle answer strings and case identifiers remain Latin because they are codes.

## Story walkthrough / solution codes

- Optional gateway passcode: `CELL-13`.
- CCTV: select Camera 03 (Records Hall), choose Infrared, select Scan to find `0427`.
- Archive: enter `0427`, then `HATA` (HA from Hardinge + TA from Tarash).
- Escape: connect red, teal and amber wires, then enter `DAWN`.
- All pages are always accessible, even before visiting the previous page. Correct puzzle inputs are still required to mark an individual puzzle as solved.

## File structure

```
Pabna-Haunting-Final-Unlocked/
├── index.html
├── surveillance.html
├── archive.html
├── escape.html
├── css/style.css
├── js/app.js
├── assets/*.svg
├── .gitignore
├── README.md
└── START_HERE_BANGLA.md
```

## Publish to GitHub

Create an empty GitHub repository, then in the folder terminal:

```bash
git init
git add .
git commit -m "Complete unlocked Pabna Haunting capstone"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/pabna-haunting.git
git push -u origin main
```

If the remote already exists, do **not** rerun `git remote add origin`. Use `git remote -v` to inspect it. Never commit secrets.

## Deploy to Vercel

1. Sign in to Vercel and select **Add New > Project**.
2. Import the GitHub repository.
3. Choose framework **Other**, root folder `./`, **no build command**, output directory `.` when requested.
4. Deploy and test every page at the generated `vercel.app` URL.

All assets are local. There is no React, database, server runtime or payment requirement.

## Notes and limitations

- The asylum story and patient records are fictional. Local landmarks are narrative clues, not assertions about real clinical institutions.
- This is a browser-side game, not a real access-control system.
- Sound is opt-in; speech voice availability differs across browsers. With no voice available, filtered whisper/noise still plays when audio is enabled.
- Countdowns depend on the device clock and LocalStorage and are suitable for a classroom game, not a tamper-proof competition timer.
- Screen reader announcements use `aria-live`, buttons support keyboard use, and reduced-motion preferences suppress the jumpscare overlay.

## Version 3.1 corrections

- Removed all access overlays and mandatory previous-stage checks; direct URLs work in a new browser session.
- Fixed mobile archive horizontal overflow: the records table scrolls inside its card.
- Added **Retry Escape** after either ending; it restarts just the final timer and circuit puzzle.
- Rechecked the files and basic browser interactions without external libraries or network resources.
