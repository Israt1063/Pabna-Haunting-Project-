/* THE PABNA HAUNTING | Fictional browser-only mystery.
   All game state stays in this browser's localStorage; it is not authentication.
   Free to modify for classroom use. */
(() => {
  "use strict";

  const STATE_KEY = "pabna-haunting-final-v3";
  const LANG_KEY = "pabna-haunting-language";
  const SOUND_KEY = "pabna-haunting-sound-v3";
  const GAME_SECONDS = 300;
  const defaultState = () => ({ entered: false, cctvSolved: false, cipherOne: false, cipherTwo: false, archiveSolved: false, wires: [], deadline: null, outcome: null });
  const readState = () => {
    try {
      const raw = JSON.parse(localStorage.getItem(STATE_KEY) || "null");
      if (!raw || typeof raw !== "object" || Array.isArray(raw)) return defaultState();
      return { ...defaultState(), ...raw, wires: Array.isArray(raw.wires) ? raw.wires.filter(x => ["red", "teal", "amber"].includes(x)) : [] };
    } catch { return defaultState(); }
  };
  let state = readState();
  const safeGet = key => { try { return localStorage.getItem(key); } catch { return null; } };
  let language = safeGet(LANG_KEY) === "bn" ? "bn" : "en";
  const save = () => {
    try { localStorage.setItem(STATE_KEY, JSON.stringify(state)); }
    catch { console.warn("Storage is unavailable. Progress will not persist after navigation."); }
  };
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => Array.from(document.querySelectorAll(selector));
  const page = document.body.dataset.page;

  const strings = {
    en: {
      navGate:"01 / GATEWAY",navCctv:"02 / CCTV",navArchive:"03 / ARCHIVE",navEscape:"04 / ESCAPE",soundOff:"SOUND OFF",soundOn:"SOUND ON",
      gateEyebrow:"TRANSMISSION INTERCEPTED · 02:17 AM",gateTitle:"Some doors<br>should <em>stay shut.</em>",gateDescription:"A distress signal is broadcasting from the abandoned Pabna Mental Asylum near the Ichamati River. The signal is not asking for help. It is asking for you.",
      caseFileLabel:"CASE FILE",threatLabel:"THREAT LEVEL",signalLabel:"SIGNAL",terminalTitle:"SECURE TERMINAL / PRC-07",terminalWelcome:"INCOMING OPERATOR DETECTED.",terminalInstruction:"Enter the optional passcode to follow the story, or visit any page directly.",passcodeLabel:"CLEARANCE PASSCODE",accessButton:"GRANT ACCESS",needHint:"Need a clearance hint?",passcodeHint:"Your clearance is printed in the CASE FILE panel: enter CELL-13.",briefingTitle:"MISSION BRIEF / CONFIDENTIAL",briefingQuote:"“The ward has been closed for decades. Yet every night, at 02:17, the monitors turn themselves on.”",briefingMeta:"FIELD REPORT · PARANORMAL RESEARCH CELL",stepEnter:"ENTER",stepObserve:"OBSERVE",stepDecode:"DECODE",stepEscape:"ESCAPE",fictionNote:"FICTIONAL INTERACTIVE EXPERIENCE",resetGame:"RESET PROGRESS",
      cctvEyebrow:"NODE 02 / VISUAL INTERCEPT",cctvTitle:"Eyes in the <em>dark.</em>",cctvDescription:"Six dead cameras. One surviving clue. Select a feed, switch to infrared, and scan the correct camera to recover the hidden evidence number.",cctvStatus:"CCTV NETWORK / UNSTABLE",cameraGridLabel:"SECURITY CAMERA MATRIX",simulatedFootage:"ALL FEEDS ARE SIMULATED",signalControls:"SIGNAL CONTROLS",selectedFeed:"SELECTED FEED",spectrum:"SPECTRUM MODE",distortion:"SIGNAL DISTORTION",triggerGlitch:"TRIGGER GLITCH",scanFeed:"SCAN SELECTED FEED",scanInstruction:"The lost evidence is embedded in one camera's infrared feed.",recoveredSignal:"RECOVERED / EVIDENCE ID",clueArchive:"Preserve this number for the archive cipher vault.",goArchive:"ENTER THE ARCHIVE",
      archiveEyebrow:"NODE 03 / CLASSIFIED RECORDS",archiveTitle:"The ones they <em>erased.</em>",archiveDescription:"The CCTV serial reveals an evidence clue. Search the fictional patient archive and solve two ciphers to recover the final escape phrase.",archiveStatus:"ARCHIVE ACCESS / AVAILABLE",recordsHeading:"PATIENT LOG / SEALED INDEX",searchPlaceholder:"Search patient, ward, or status...",recordsFound:"RECORDS FOUND",idHeader:"PATIENT ID",nameHeader:"NAME",wardHeader:"WARD",statusHeader:"STATUS",archiveDisclaimer:"All patient names, records and events shown here are fictional. Pabna landmark names are used as narrative clues.",cipherHeading:"CIPHER VAULT / TWO-FACTOR DECRYPTION",cipherOneLabel:"EVIDENCE SEAL",cipherOneTitle:"The watcher remembers",cipherOneDescription:"Enter the four-digit evidence serial recovered by scanning the correct CCTV feed in infrared mode.",verify:"VERIFY",cipherTwoLabel:"LANDMARK CIPHER",cipherTwoTitle:"Two places, one signal",cipherTwoDescription:"Take the first TWO letters of HARDINGE Bridge, then the first TWO letters of TARASH Shahi Mosque. Join them without spaces.",decrypt:"DECRYPT",vaultUnsealed:"VAULT UNSEALED / EXIT KEY",rewardMessage:"The last transmission contains a word. Remember it when you reach the escape portal.",goEscape:"PROCEED TO ESCAPE PORTAL",
      escapeEyebrow:"NODE 04 / EMERGENCY LOCKDOWN",escapeTitle:"This is your <em>last signal.</em>",escapeDescription:"Rejoin the three severed transmission wires and submit the final exit key before the emergency signal collapses.",lockdownStatus:"LOCKDOWN PROTOCOL ACTIVE",remainingTime:"TIME UNTIL SIGNAL COLLAPSE",timerNote:"The clock survives refreshes. Every second counts.",lockdownProtocol:"PRC EMERGENCY EXTRACTION<br>PROTOCOL 013",wireHeader:"MANUAL BYPASS / SIGNAL WIRES",wireTitle:"Reconnect the line",wireDescription:"Select one source terminal on the left, then its matching signal terminal on the right. All three connections must be restored.",wireInstruction:"Match three colored signals to complete the circuit.",finalHeader:"FINAL TRANSMISSION",keyLabel:"EXTRACTION PHRASE",finalTitle:"Speak the word they buried.",finalDescription:"The archive cipher vault revealed the exit key. Enter it after restoring the transmission circuit.",exitPlaceholder:"ENTER EXIT KEY",rescueButton:"BROADCAST RESCUE SIGNAL",playAgain:"RESTART INVESTIGATION",
      invalidPasscode:"Incorrect passcode. The game pages are still open from the navigation menu.",accessGranted:"ACCESS GRANTED. Redirecting to camera network...",foundCode:"Evidence 0427 recovered. Use this number in the archive cipher.",infraNeeded:"Try infrared mode. Something is hidden in the visible spectrum.",wrongCamera:"No evidence on this feed. Scan the records hall (CAM 03).",scanning:"Decrypting the camera signal...",alreadySolved:"Cipher already verified.",wrongSerial:"Incorrect serial. Return to CAM 03 and inspect the infrared feed.",correctSerial:"Evidence seal validated.",wrongLandmark:"Incorrect code. Take 2 letters from HARDINGE and then 2 from TARASH.",correctLandmark:"Landmark cipher decrypted.",noRecords:"No matching fictional patient records.",wirePick:"Source selected. Choose the corresponding receiver.",wireWrong:"Signal mismatch. Match the same colored terminals.",wireConnected:"Signal connected!",allConnected:"All three wires restored. The final transmission is ready.",needWires:"Reconnect all three wires before broadcasting.",wrongPhrase:"Invalid exit key. The word is revealed in the archive after both ciphers.",successEyebrow:"EXTRACTION COMPLETE / SIGNAL DELIVERED",successTitle:"YOU MADE IT OUT.",successDescription:"The rescue broadcast reached the river station. The asylum's signal has finally gone silent. For now.",failureEyebrow:"TRANSMISSION LOST / CASE CLOSED",failureTitle:"THEY FOUND YOU.",failureDescription:"The signal collapsed before the rescue reached the building. Restart the investigation to try again.",resetConfirm:"Reset the entire investigation and return to the gateway?",missingStorage:"Your browser appears to block localStorage; use a local web server or VS Code Live Server for best results."
    },
    bn: {
      navGate:"০১ / প্রবেশপথ",navCctv:"০২ / সিসিটিভি",navArchive:"০৩ / আর্কাইভ",navEscape:"০৪ / উদ্ধার",soundOff:"শব্দ বন্ধ",soundOn:"শব্দ চালু",
      gateEyebrow:"রাত ০২:১৭ · রহস্যময় সংকেত",gateTitle:"কিছু দরজা<br><em>বন্ধই থাকা ভালো।</em>",gateDescription:"ইছামতী নদীর কাছের পরিত্যক্ত পাবনা মানসিক হাসপাতাল থেকে একটি সংকেত আসছে। সেটি সাহায্য চাইছে না। সেটি আপনাকেই ডাকছে।",caseFileLabel:"কেস ফাইল",threatLabel:"বিপদ স্তর",signalLabel:"সংকেত",terminalTitle:"সুরক্ষিত টার্মিনাল / PRC-07",terminalWelcome:"নতুন অপারেটর শনাক্ত হয়েছে।",terminalInstruction:"গল্পের ঐচ্ছিক পাসকোড লিখুন, অথবা সরাসরি যেকোনো পেজে যান।",passcodeLabel:"প্রবেশ পাসকোড",accessButton:"প্রবেশ করুন",needHint:"পাসকোডের ইঙ্গিত চান?",passcodeHint:"CASE FILE অংশে কোডটি আছে: CELL-13 লিখুন।",briefingTitle:"মিশনের নির্দেশনা / গোপনীয়",briefingQuote:"“হাসপাতালটি বহু বছর বন্ধ। তবু প্রতি রাতে ০২:১৭-তে মনিটরগুলো নিজে থেকেই চালু হয়।”",briefingMeta:"মাঠপর্যায়ের প্রতিবেদন · গবেষণা সেল",stepEnter:"প্রবেশ",stepObserve:"পর্যবেক্ষণ",stepDecode:"উদ্ধার",stepEscape:"পালানো",fictionNote:"কাল্পনিক ইন্টারঅ্যাকটিভ গল্প",resetGame:"আবার শুরু",
      cctvEyebrow:"পর্যায় ০২ / দৃশ্য সংকেত",cctvTitle:"অন্ধকারে <em>নজর।</em>",cctvDescription:"ছয়টি ক্যামেরা, একটি সূত্র। একটি ক্যামেরা বেছে নিয়ে INFRARED মোডে সঠিক ক্যামেরা SCAN করুন।",cctvStatus:"সিসিটিভি নেটওয়ার্ক / অস্থির",cameraGridLabel:"ক্যামেরা গ্রিড",simulatedFootage:"সব ভিডিও সিমুলেটেড",signalControls:"সংকেত নিয়ন্ত্রণ",selectedFeed:"নির্বাচিত ক্যামেরা",spectrum:"আলোর মোড",distortion:"সংকেতের বিকৃতি",triggerGlitch:"গ্লিচ দেখুন",scanFeed:"ক্যামেরা স্ক্যান",scanInstruction:"একটি ক্যামেরার ইনফ্রারেড মোডে গোপন সংখ্যা আছে।",recoveredSignal:"উদ্ধারকৃত প্রমাণ নম্বর",clueArchive:"আর্কাইভের জন্য সংখ্যাটি মনে রাখুন।",goArchive:"আর্কাইভে যান",
      archiveEyebrow:"পর্যায় ০৩ / গোপন নথি",archiveTitle:"মুছে ফেলা <em>নামগুলো।</em>",archiveDescription:"সিসিটিভি থেকে পাওয়া নম্বর ও পাবনার স্থানের নামের সূত্র দিয়ে দুটি ধাঁধা সমাধান করুন।",archiveStatus:"আর্কাইভ / সবার জন্য উন্মুক্ত",recordsHeading:"রোগীর নথি / তালিকা",searchPlaceholder:"নাম, ওয়ার্ড অথবা অবস্থা খুঁজুন...",recordsFound:"টি নথি পাওয়া গেছে",idHeader:"নথি আইডি",nameHeader:"নাম",wardHeader:"ওয়ার্ড",statusHeader:"অবস্থা",archiveDisclaimer:"এখানে সব রোগীর নাম, নথি ও ঘটনা কাল্পনিক। বাস্তব স্থানের নাম শুধু গল্পের সূত্র হিসেবে ব্যবহৃত।",cipherHeading:"সাইফার ভল্ট / দুটি ধাঁধা",cipherOneLabel:"প্রমাণ যাচাই",cipherOneTitle:"ক্যামেরার সূত্র",cipherOneDescription:"সঠিক সিসিটিভি ক্যামেরার INFRARED মোডে পাওয়া চার সংখ্যার কোড লিখুন।",verify:"যাচাই",cipherTwoLabel:"স্থানের নামের সংকেত",cipherTwoTitle:"দুই স্থান, একটি সংকেত",cipherTwoDescription:"HARDINGE Bridge থেকে প্রথম ২ অক্ষর, তারপর TARASH Shahi Mosque থেকে প্রথম ২ অক্ষর নিয়ে পাশাপাশি লিখুন।",decrypt:"ডিক্রিপ্ট",vaultUnsealed:"ভল্ট খোলা / শেষ চাবি",rewardMessage:"শেষ ধাপে এই শব্দটি লাগবে। মনে রাখুন।",goEscape:"উদ্ধার পর্বে যান",
      escapeEyebrow:"পর্যায় ০৪ / জরুরি লকডাউন",escapeTitle:"এটাই <em>শেষ সংকেত।</em>",escapeDescription:"তিনটি কাটা তার জোড়া দিন এবং সময় শেষ হওয়ার আগে শেষ চাবিটি লিখুন।",lockdownStatus:"লকডাউন চালু",remainingTime:"সংকেত বন্ধ হতে বাকি সময়",timerNote:"রিফ্রেশ করলেও সময় নতুন করে শুরু হবে না।",lockdownProtocol:"জরুরি উদ্ধার<br>প্রোটোকল ০১৩",wireHeader:"কাটা সংকেতের তার",wireTitle:"সংযোগ পুনরুদ্ধার করুন",wireDescription:"বাম দিকের একটি রঙ বেছে নিয়ে ডান দিকে একই রঙের টার্মিনাল চাপুন। তিনটিই মিলাতে হবে।",wireInstruction:"তিনটি একই রঙের সংকেত মিলিয়ে দিন।",finalHeader:"শেষ বার্তা",keyLabel:"উদ্ধারের শব্দ",finalTitle:"গোপন শব্দটি বলুন।",finalDescription:"আর্কাইভের দুটি ধাঁধা সমাধান করলে শেষ চাবিটি পাওয়া যায়। সংযোগ ঠিক করে সেটি লিখুন।",exitPlaceholder:"শেষ চাবি লিখুন",rescueButton:"উদ্ধার সংকেত পাঠান",playAgain:"নতুন করে তদন্ত",
      invalidPasscode:"ভুল পাসকোড। মেনু থেকে তবু সব পেজ খোলা যাবে।",accessGranted:"প্রবেশ সফল। ক্যামেরা নেটওয়ার্ক চালু হচ্ছে...",foundCode:"প্রমাণ 0427 পাওয়া গেছে। আর্কাইভের ধাঁধায় এই নম্বরটি লাগবে।",infraNeeded:"ইনফ্রারেড মোড চেষ্টা করুন।",wrongCamera:"এখানে সূত্র নেই। CAM 03-এর রেকর্ডস হল দেখুন।",scanning:"ক্যামেরার সংকেত বিশ্লেষণ হচ্ছে...",alreadySolved:"ধাঁধাটি আগেই সমাধান হয়েছে।",wrongSerial:"ভুল নম্বর। CAM 03 ইনফ্রারেডে দেখুন।",correctSerial:"প্রমাণ যাচাই সফল।",wrongLandmark:"ভুল কোড। HARDINGE-এর ২ অক্ষর ও TARASH-এর ২ অক্ষর নিন।",correctLandmark:"দ্বিতীয় ধাঁধা সমাধান হয়েছে।",noRecords:"কোনো কাল্পনিক নথি পাওয়া যায়নি।",wirePick:"উৎস বেছে নিয়েছেন। এবার একই রঙের গন্তব্য চাপুন।",wireWrong:"রং মেলেনি। একই রঙ মিলান।",wireConnected:"সংযোগ স্থাপিত হয়েছে!",allConnected:"তিনটি তারই জোড়া লেগেছে। শেষ সংকেত প্রস্তুত।",needWires:"প্রথমে তিনটি তার জোড়া দিন।",wrongPhrase:"ভুল শব্দ। দুটি ধাঁধা সমাধানের পর আর্কাইভে শব্দটি পাওয়া যায়।",successEyebrow:"উদ্ধারের বার্তা পৌঁছেছে",successTitle:"আপনি পালাতে পেরেছেন।",successDescription:"নদীর উদ্ধারকেন্দ্রে বার্তাটি পৌঁছেছে। হাসপাতালের সংকেত থেমে গেছে। আপাতত।",failureEyebrow:"সংকেত হারিয়ে গেছে",failureTitle:"ওরা আপনাকে খুঁজে পেয়েছে।",failureDescription:"উদ্ধার পৌঁছানোর আগেই সময় শেষ হয়েছে। আবার চেষ্টা করুন।",resetConfirm:"সব অগ্রগতি মুছে প্রবেশপথে ফিরবেন?",missingStorage:"ব্রাউজারে localStorage বন্ধ থাকলে VS Code Live Server দিয়ে চালান।"
    }
  };
  // Additional translations cover every static control and status label.
  Object.assign(strings.en, {
  "brandSub": "PARANORMAL RESEARCH CELL / DIVISION 07",
  "heroCoord": "24°00′N / INCIDENT 013",
  "heroRegion": "PABNA, BANGLADESH",
  "critical": "CRITICAL",
  "signalActive": "ACTIVE / 01",
  "terminalStatus": "OPEN DEMO",
  "routeIntro": "All four investigation pages are available from the menu. The passcode is an optional story challenge.",
  "openCctv": "OPEN CCTV DIRECTLY",
  "missionStatus": "06 CAMERAS",
  "camRecording": "● REC / 720p / SIMULATED",
  "internalSystem": "PRC INTERNAL SYSTEM · V3.1",
  "liveLabel": "LIVE",
  "cameraNormal": "NORMAL",
  "cameraInfrared": "INFRARED",
  "stable": "STABLE",
  "unstable": "UNSTABLE",
  "distortionLabel": "Distortion strength",
  "allRecords": "09 RECORDS",
  "databaseLabel": "DATABASE",
  "openVault": "OPEN / PLAYABLE",
  "openTransmission": "OPEN / PLAYABLE",
  "searchLabel": "Search fictional records",
  "serialLabel": "Four-digit evidence serial",
  "landmarkLabel": "Four-letter landmark code",
  "codeRed": "CODE RED",
  "source": "SOURCE",
  "receiver": "RECEIVER",
  "extractionLabel": "Extraction phrase",
  "footOnline": "ICHAMATI TRANSMISSION SYSTEM · ONLINE",
  "ambientPreview": "PLAY WHISPER",
  "footstepsButton": "PLAY FOOTSTEPS",
  "staticButton": "PLAY RADIO STATIC",
  "jumpButton": "PLAY HORROR STING",
  "sfxHint": "Sound effects play only when sound is enabled. The site never uses your microphone.",
  "pageAccess": "DIRECT ACCESS · NO LOCKED PAGES",
  "noGate": "The passcode is optional. Use the menu to open any page without completing previous puzzles.",
  "timeoutReset": "RESTART TIMER",
  "resetTimerConfirm": "Restart the escape countdown and clear the ending? Your CCTV and archive progress will be kept.",
  "timerRestarted": "Escape countdown restarted.",
  "retryEscape": "RETRY ESCAPE",
  "audioUnsupported": "Audio is not supported by this browser.",
  "camera1": "EAST WARD",
  "camera2": "ISOLATION",
  "camera3": "RECORDS HALL",
  "camera4": "STAIRWELL",
  "camera5": "GENERATOR",
  "camera6": "EXIT TUNNEL",
  "camAria1": "View camera 1, East Ward",
  "camAria2": "View camera 2, Isolation",
  "camAria3": "View camera 3, Records Hall",
  "camAria4": "View camera 4, Stairwell",
  "camAria5": "View camera 5, Generator",
  "camAria6": "View camera 6, Exit Tunnel",
  "wireAriaLeftred": "Select red source terminal",
  "wireAriaLeftteal": "Select teal source terminal",
  "wireAriaLeftamber": "Select amber source terminal",
  "wireAriaRightred": "Connect red receiver terminal",
  "wireAriaRightteal": "Connect teal receiver terminal",
  "wireAriaRightamber": "Connect amber receiver terminal",
  "langAria": "Switch language",
  "soundAria": "Toggle horror soundscape",
  "menuAria": "Main navigation",
  "voiceHint": "Whispering can be generated with the browser’s speech synthesis when available.",
  "recEast": "EAST",
  "recNorth": "NORTH",
  "recIsolation": "ISOLATION",
  "recRecords": "RECORDS",
  "recMissing": "MISSING",
  "recSealed": "SEALED",
  "recTransferred": "TRANSFERRED",
  "recReleased": "RELEASED",
  "recUnknown": "UNKNOWN",
  "recordNames": "FICTIONAL DATA",
  "wireReset": "CLEAR WIRES",
  "wireResetDone": "Wire connections cleared.",
  "directNote": "OPEN ACCESS: All pages work independently; puzzles remain interactive.",
  "gatewayTip": "Optional passcode: CELL-13. All pages remain accessible without it."
});
  Object.assign(strings.bn, {
  "brandSub": "অতিপ্রাকৃত গবেষণা সেল / বিভাগ ০৭",
  "heroCoord": "২৪°০০′ উত্তর / ঘটনা ০১৩",
  "heroRegion": "পাবনা, বাংলাদেশ",
  "critical": "সংকটপূর্ণ",
  "signalActive": "সক্রিয় / ০১",
  "terminalStatus": "ডেমো উন্মুক্ত",
  "routeIntro": "মেনু থেকে চারটি তদন্তের পেজই সরাসরি খোলা যাবে। পাসকোড শুধু গল্পের একটি ঐচ্ছিক ধাপ।",
  "openCctv": "সরাসরি সিসিটিভি খুলুন",
  "missionStatus": "০৬টি ক্যামেরা",
  "camRecording": "● রেকর্ড / ৭২০পি / সিমুলেটেড",
  "internalSystem": "পিআরসি অভ্যন্তরীণ সিস্টেম · সংস্করণ ৩.১",
  "liveLabel": "সক্রিয়",
  "cameraNormal": "সাধারণ",
  "cameraInfrared": "ইনফ্রারেড",
  "stable": "স্থিতিশীল",
  "unstable": "অস্থিতিশীল",
  "distortionLabel": "বিকৃতির মাত্রা",
  "allRecords": "০৯টি নথি",
  "databaseLabel": "ডেটাবেস",
  "openVault": "উন্মুক্ত / ব্যবহারযোগ্য",
  "openTransmission": "উন্মুক্ত / ব্যবহারযোগ্য",
  "searchLabel": "কাল্পনিক নথি অনুসন্ধান",
  "serialLabel": "চার অঙ্কের প্রমাণ নম্বর",
  "landmarkLabel": "চার অক্ষরের স্থানের সংকেত",
  "codeRed": "সর্বোচ্চ সতর্কতা",
  "source": "উৎস",
  "receiver": "গ্রাহক",
  "extractionLabel": "উদ্ধারের গোপন শব্দ",
  "footOnline": "ইছামতী যোগাযোগ ব্যবস্থা · চালু",
  "ambientPreview": "ফিসফিস শব্দ শুনুন",
  "footstepsButton": "পায়ের শব্দ শুনুন",
  "staticButton": "রেডিওর শব্দ শুনুন",
  "jumpButton": "ভয়ের শব্দ শুনুন",
  "sfxHint": "শব্দ চালু থাকলেই সাউন্ড ইফেক্ট শোনা যাবে। ওয়েবসাইট আপনার মাইক্রোফোন ব্যবহার করে না।",
  "pageAccess": "সরাসরি প্রবেশ · কোনো পেজ বন্ধ নেই",
  "noGate": "পাসকোড ঐচ্ছিক। আগের ধাঁধা শেষ না করেও মেনু থেকে যেকোনো পেজ খোলা যাবে।",
  "timeoutReset": "টাইমার আবার শুরু",
  "resetTimerConfirm": "উদ্ধারের টাইমার ও শেষ ফলাফল রিসেট করবেন? সিসিটিভি ও আর্কাইভের অগ্রগতি থাকবে।",
  "timerRestarted": "উদ্ধারের টাইমার আবার শুরু হয়েছে।",
  "retryEscape": "আবার উদ্ধার চেষ্টা করুন",
  "audioUnsupported": "এই ব্রাউজারে অডিও সমর্থিত নয়।",
  "camera1": "পূর্ব ওয়ার্ড",
  "camera2": "আইসোলেশন",
  "camera3": "রেকর্ড কক্ষ",
  "camera4": "সিঁড়িঘর",
  "camera5": "জেনারেটর",
  "camera6": "বের হওয়ার সুড়ঙ্গ",
  "camAria1": "ক্যামেরা ১, পূর্ব ওয়ার্ড দেখুন",
  "camAria2": "ক্যামেরা ২, আইসোলেশন দেখুন",
  "camAria3": "ক্যামেরা ৩, রেকর্ড কক্ষ দেখুন",
  "camAria4": "ক্যামেরা ৪, সিঁড়িঘর দেখুন",
  "camAria5": "ক্যামেরা ৫, জেনারেটর দেখুন",
  "camAria6": "ক্যামেরা ৬, সুড়ঙ্গ দেখুন",
  "wireAriaLeftred": "লাল উৎস টার্মিনাল নির্বাচন",
  "wireAriaLeftteal": "সবুজাভ উৎস টার্মিনাল নির্বাচন",
  "wireAriaLeftamber": "হলুদ উৎস টার্মিনাল নির্বাচন",
  "wireAriaRightred": "লাল গ্রাহক টার্মিনাল নির্বাচন",
  "wireAriaRightteal": "সবুজাভ গ্রাহক টার্মিনাল নির্বাচন",
  "wireAriaRightamber": "হলুদ গ্রাহক টার্মিনাল নির্বাচন",
  "langAria": "ভাষা পরিবর্তন",
  "soundAria": "ভয়ের শব্দ চালু বা বন্ধ করুন",
  "menuAria": "মূল নেভিগেশন",
  "voiceHint": "ব্রাউজারে সুবিধা থাকলে ভয়েস সিন্থেসিস দিয়ে ফিসফিস শব্দও তৈরি হয়।",
  "recEast": "পূর্ব",
  "recNorth": "উত্তর",
  "recIsolation": "আইসোলেশন",
  "recRecords": "রেকর্ড",
  "recMissing": "নিখোঁজ",
  "recSealed": "গোপন",
  "recTransferred": "স্থানান্তরিত",
  "recReleased": "মুক্ত",
  "recUnknown": "অজানা",
  "recordNames": "কাল্পনিক তথ্য",
  "wireReset": "তারগুলো বিচ্ছিন্ন করুন",
  "wireResetDone": "তারগুলোর সংযোগ বিচ্ছিন্ন হয়েছে।",
  "directNote": "উন্মুক্ত: সব পেজ আলাদাভাবে কাজ করে; ধাঁধাগুলোও কার্যকর।",
  "gatewayTip": "ঐচ্ছিক পাসকোড: CELL-13। পাসকোড ছাড়াও সব পেজে যেতে পারবেন।"
});
  const t = key => (strings[language] && strings[language][key]) || strings.en[key] || key;
  const feedback = (el, message, kind = "") => {
    if (!el) return;
    el.dataset.feedbackKey = message;
    el.textContent = t(message);
    el.className = `form-feedback${kind ? " " + kind : ""}`;
  };
  const normalize = value => String(value || "").trim().toUpperCase().replace(/\s+/g, "");
  const setLanguage = lang => {
    language = lang;
    try { localStorage.setItem(LANG_KEY, lang); } catch {}
    document.documentElement.lang = lang === "bn" ? "bn" : "en";
    $$('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (t(key).includes("<br>") || ["gateTitle","cctvTitle","archiveTitle","escapeTitle"].includes(key)) {
        // Only hard-coded translations from our trusted dictionary are inserted as HTML.
        el.innerHTML = t(key);
      } else el.textContent = t(key);
    });
    $$('[data-i18n-placeholder]').forEach(el => { el.placeholder = t(el.dataset.i18nPlaceholder); });
    $$('[data-i18n-aria]').forEach(el => { el.setAttribute('aria-label', t(el.dataset.i18nAria)); });
    $$('[data-feedback-key]').forEach(el => { el.textContent = t(el.dataset.feedbackKey); });
    const langToggle = $("#lang-toggle");
    if (langToggle) langToggle.textContent = lang === "en" ? "বাংলা" : "EN";
    const soundLabel = $("#sound-label");
    if (soundLabel) soundLabel.textContent = t(soundWanted ? "soundOn" : "soundOff");
    renderSoundToggle();
    window.dispatchEvent(new Event("pabna-language-changed"));
  };

  // Consent-based soundscape: generated sounds, no audio files or microphones.
  // Preference survives page navigation. Audio is resumed only from user gestures.
  let audioCtx = null;
  let soundNodes = [];
  let whisperCycle = null;
  let soundWanted = safeGet(SOUND_KEY) === "1";
  let masterVolume = null;
  const AudioEngine = window.AudioContext || window.webkitAudioContext;
  const renderSoundToggle = () => {
    const toggle = $("#sound-toggle");
    const soundLabel = $("#sound-label");
    if (toggle) toggle.setAttribute("aria-pressed", String(soundWanted));
    if (soundLabel) soundLabel.textContent = t(soundWanted ? "soundOn" : "soundOff");
  };
  const soundGain = (value, at, duration) => {
    const g = audioCtx.createGain();
    g.gain.setValueAtTime(0.00001, at);
    g.gain.linearRampToValueAtTime(Math.max(.00001,value), at+Math.min(.06,duration/4));
    g.gain.exponentialRampToValueAtTime(.00001, at+duration);
    g.connect(masterVolume);
    return g;
  };
  const oscillator = (hz, type, volume, duration, slide = 0, when = 0) => {
    if (!audioCtx || !masterVolume) return;
    const now = audioCtx.currentTime+when;
    const o = audioCtx.createOscillator(), g = soundGain(volume,now,duration);
    o.type = type; o.frequency.setValueAtTime(Math.max(20,hz),now);
    if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(20,hz+slide),now+duration);
    o.connect(g); o.start(now); o.stop(now+duration+.02);
  };
  const makeNoiseBuffer = (duration = 2) => {
    const length = Math.ceil(audioCtx.sampleRate*duration);
    const buffer = audioCtx.createBuffer(1,length,audioCtx.sampleRate);
    const samples=buffer.getChannelData(0);
    for(let i=0;i<length;i++) samples[i]=(Math.random()*2-1)*(.6+.4*Math.sin(i*.00018));
    return buffer;
  };
  const noiseBurst = (volume=.05,duration=.5,filterFreq=800,when=0,quality=1) => {
    if (!audioCtx || !masterVolume) return;
    const now=audioCtx.currentTime+when;
    const noise=audioCtx.createBufferSource(); noise.buffer=makeNoiseBuffer(duration+.08);
    const filter=audioCtx.createBiquadFilter(); filter.type="bandpass";
    filter.frequency.value=filterFreq; filter.Q.value=quality;
    const gain=soundGain(volume,now,duration);
    noise.connect(filter); filter.connect(gain); noise.start(now); noise.stop(now+duration+.04);
  };
  const playSfx = type => {
    if (!soundWanted || !audioCtx || audioCtx.state !== "running") return;
    if (type === "click") { oscillator(540,"triangle",.027,.085,-120); return; }
    if (type === "success") { oscillator(350,"sine",.075,.45,210); oscillator(620,"sine",.045,.55,160,.15); return; }
    if (type === "error") { oscillator(180,"sawtooth",.055,.3,-95); return; }
    if (type === "glitch") {
      noiseBurst(.16,.7,1700); oscillator(132,"sawtooth",.042,.2,460,.09);
      oscillator(710,"square",.025,.15,-330,.32); return;
    }
    if (type === "static") { noiseBurst(.15,1.8,1300); oscillator(87,"triangle",.028,1.3,-40); return; }
    if (type === "footsteps") {
      for(let k=0;k<5;k++) { oscillator(90,"sine",.12,.22,-65,k*.46); noiseBurst(.075,.15,175,k*.46); }
      return;
    }
    if (type === "sting") {
      noiseBurst(.27,1.1,900); oscillator(88,"sawtooth",.16,1.25,-60);
      oscillator(700,"sawtooth",.08,.75,-420); return;
    }
    if (type === "whisper") {
      // Formant-like filtered breath. Optional synthesized speech gives word-like whispers.
      for (let k=0;k<4;k++) noiseBurst(.046,.42,330+k*180,k*.31,3.2);
      if ("speechSynthesis" in window && typeof SpeechSynthesisUtterance !== "undefined") {
        try {
          window.speechSynthesis.cancel();
          const speech = new SpeechSynthesisUtterance(language==="bn" ? "পেছনে তাকিও না" : "Do not look behind you");
          speech.lang=language==="bn" ? "bn-BD" : "en-US";
          speech.pitch=.5; speech.rate=.64; speech.volume=.3;
          window.speechSynthesis.speak(speech);
        } catch {} // Missing language voices simply fall back to filtered breath.
      }
    }
  };
  const stopSound = async () => {
    if (whisperCycle) window.clearInterval(whisperCycle);
    whisperCycle=null;
    if ("speechSynthesis" in window) try { window.speechSynthesis.cancel(); } catch {}
    if (audioCtx) {
      soundNodes.forEach(node => { try { node.stop(); } catch {} });
      soundNodes=[];
      const old=audioCtx; audioCtx=null; masterVolume=null;
      try { await old.close(); } catch {}
    }
  };
  const startSound = async () => {
    if (!soundWanted || !AudioEngine) return;
    if (audioCtx) { try { await audioCtx.resume(); } catch {} return; }
    try {
      audioCtx=new AudioEngine();
      masterVolume=audioCtx.createGain(); masterVolume.gain.value=.55;
      masterVolume.connect(audioCtx.destination);
      const hum=audioCtx.createGain(); hum.gain.value=.021; hum.connect(masterVolume);
      for(const [frequency,volume,wave] of [[48,.34,"sine"],[59,.14,"triangle"],[88,.11,"sine"],[120,.06,"sine"]]) {
        const osc=audioCtx.createOscillator(),vol=audioCtx.createGain();
        osc.type=wave; osc.frequency.value=frequency;vol.gain.value=volume;
        osc.connect(vol);vol.connect(hum);osc.start();soundNodes.push(osc);
      }
      const noise=audioCtx.createBufferSource();noise.buffer=makeNoiseBuffer(3);noise.loop=true;
      const lowpass=audioCtx.createBiquadFilter();lowpass.type="lowpass";lowpass.frequency.value=140;
      const hush=audioCtx.createGain();hush.gain.value=.011;
      noise.connect(lowpass);lowpass.connect(hush);hush.connect(masterVolume);noise.start();soundNodes.push(noise);
      await audioCtx.resume();
      // An intermittent whisper is a real, user-enabled dynamic sound trigger.
      whisperCycle=window.setInterval(()=>{if (document.visibilityState==="visible") playSfx("whisper");},14500);
    } catch(error) { console.warn("Could not initialize Web Audio",error); soundWanted=false; renderSoundToggle(); }
  };
  const toggleSound = async () => {
    soundWanted=!soundWanted;
    try { localStorage.setItem(SOUND_KEY,soundWanted?"1":"0"); } catch {}
    if (soundWanted) { await startSound();playSfx("success"); }
    else await stopSound();
    renderSoundToggle();
  };
  // Browser autoplay policy: a prior preference requires a fresh user gesture after navigation.
  if(soundWanted) {
    const resumeOnGesture=()=>{if(soundWanted)startSound();};
    document.addEventListener("pointerdown",resumeOnGesture,{once:true});
    document.addEventListener("keydown",resumeOnGesture,{once:true});
  }

  const resetGame = () => {
    if (!window.confirm(t("resetConfirm"))) return;
    try { localStorage.removeItem(STATE_KEY); } catch {}
    state = defaultState();
    window.location.href = "index.html";
  };
  const initShared = () => {
    $("#lang-toggle")?.addEventListener("click", () => setLanguage(language === "en" ? "bn" : "en"));
    $("#sound-toggle")?.addEventListener("click", toggleSound);
    $("#reset-progress")?.addEventListener("click", resetGame);
    $$('[data-sfx]').forEach(btn => btn.addEventListener('click', async () => {
      if (!soundWanted) {
        await toggleSound();
      } else {
        await startSound();
      }
      playSfx(btn.dataset.sfx);
    }));
    setLanguage(language);
  };

  // Direct navigation: every page opens normally on its own URL.
  // Puzzle answers still require correct inputs, but no prior page visit is required.

  const initGateway = () => {
    const hint = $("#passcode-hint");
    const hintToggle = $(".hint-toggle");
    hintToggle?.addEventListener("click", () => {
      hint.hidden = !hint.hidden;
      hintToggle.setAttribute("aria-expanded", String(!hint.hidden));
    });
    $("#login-form")?.addEventListener("submit", event => {
      event.preventDefault();
      if (normalize($("#passcode").value).replace(/\s/g, "") !== "CELL-13") {
        feedback($("#login-feedback"), "invalidPasscode", "error");playSfx("error");
        $("#passcode").focus();
        return;
      }
      state.entered = true; save();
      feedback($("#login-feedback"), "accessGranted", "success");playSfx("success");
      const btn = $('#login-form button[type="submit"]');
      btn.disabled = true;
      window.setTimeout(() => { window.location.href = "surveillance.html"; }, 500);
    });
  };

  const cameraNames = { 1:"EAST WARD",2:"ISOLATION",3:"RECORDS HALL",4:"STAIRWELL",5:"GENERATOR",6:"EXIT TUNNEL" };
  const initSurveillance = () => {
    let selected = 1;
    let mode = "normal";
    let distortion = 28;
    const cameras = $$(".camera-card");
    const clue = $("#cctv-clue");
    if (state.cctvSolved) clue.hidden = false;
    const render = () => {
      cameras.forEach(card => {
        const active = Number(card.dataset.camera) === selected;
        card.classList.toggle("selected", active);
        card.classList.toggle("infrared", mode === "infrared");
        card.setAttribute("aria-pressed", String(active));
        card.querySelector(".camera-scene").style.opacity = String(Math.max(.25, .95 - distortion / 190));
      });
      $("#current-camera").textContent = String(selected).padStart(2,"0");
      $("#current-location").textContent = t("camera"+selected);
      $$(".mode-button").forEach(btn => { const active = btn.dataset.mode === mode; btn.classList.toggle("active", active); btn.setAttribute("aria-pressed", String(active)); });
      $("#distortion-value").textContent = distortion + "%";
    };
    cameras.forEach(card => card.addEventListener("click", () => { selected = Number(card.dataset.camera); render(); }));
    $$(".mode-button").forEach(btn => btn.addEventListener("click", () => { mode = btn.dataset.mode; render(); }));
    $("#distortion")?.addEventListener("input", e => { distortion = Number(e.target.value); render(); });
    $("#glitch-button")?.addEventListener("click", () => {
      playSfx("glitch");
      cameras.forEach(card => card.classList.add("glitching"));
      window.setTimeout(() => cameras.forEach(card => card.classList.remove("glitching")), 800);
    });
    $("#scan-button")?.addEventListener("click", () => {
      const scannedCamera = selected;
      const scannedMode = mode;
      const card = cameras.find(c => Number(c.dataset.camera) === scannedCamera);
      playSfx("static");
      card?.classList.add("scanning");
      feedback($("#scan-feedback"), "scanning");
      window.setTimeout(() => {
        card?.classList.remove("scanning");
        if (scannedMode !== "infrared") { feedback($("#scan-feedback"), "infraNeeded", "error"); return; }
        if (scannedCamera !== 3) { feedback($("#scan-feedback"), "wrongCamera", "error"); return; }
        state.cctvSolved = true; save();
        card?.classList.add("is-searched");
        clue.hidden = false;
        playSfx("success");
        feedback($("#scan-feedback"), "foundCode", "success");
      }, 850);
    });
    window.addEventListener("pabna-language-changed", render);
    render();
  };

  const fictionalRecords = [
    { id:"P-001", name:"Rafiq Hossain", ward:"EAST", status:"MISSING" },
    { id:"P-002", name:"Maya Rahman", ward:"ISOLATION", status:"SEALED" },
    { id:"P-003", name:"Nabil Faruk", ward:"RECORDS", status:"TRANSFERRED" },
    { id:"P-004", name:"Samira Akter", ward:"EAST", status:"MISSING" },
    { id:"P-005", name:"Imran Kabir", ward:"NORTH", status:"SEALED" },
    { id:"P-006", name:"Tania Sultana", ward:"RECORDS", status:"RELEASED" },
    { id:"P-007", name:"Faisal Hasan", ward:"ISOLATION", status:"UNKNOWN" },
    { id:"P-008", name:"Nusrat Jahan", ward:"NORTH", status:"MISSING" },
    { id:"P-009", name:"Samiul Karim", ward:"EAST", status:"SEALED" }
  ];
  const fictionalNamesBn = ["রফিক হোসেন","মায়া রহমান","নাবিল ফারুক","সামিরা আক্তার","ইমরান কবির","তানিয়া সুলতানা","ফয়সাল হাসান","নুসরাত জাহান","সামিউল করিম"];
  const recordLabel = (value) => {
    const key={EAST:"recEast",NORTH:"recNorth",ISOLATION:"recIsolation",RECORDS:"recRecords",
      MISSING:"recMissing",SEALED:"recSealed",TRANSFERRED:"recTransferred",RELEASED:"recReleased",UNKNOWN:"recUnknown"}[value];
    return key ? t(key) : value;
  };
  const initArchive = () => {
    const tbody = $("#records-body");
    const renderRecords = () => {
      const query = $("#record-search").value.trim().toLowerCase();
      const matches = fictionalRecords.filter((rec,idx) => [...Object.values(rec),fictionalNamesBn[idx],recordLabel(rec.ward),recordLabel(rec.status)]
        .some(v => v.toLowerCase().includes(query)));
      tbody.replaceChildren();
      if (!matches.length) {
        const tr = document.createElement("tr"), td = document.createElement("td");
        td.colSpan = 4; td.className = "no-records"; td.textContent = t("noRecords");
        tr.append(td); tbody.append(tr);
      }
      matches.forEach(rec => {
        const index=fictionalRecords.indexOf(rec);
        const tr = document.createElement("tr");
        for (const key of ["id", "name", "ward", "status"]) {
          const td = document.createElement("td");
          if (key === "status") {
            const span = document.createElement("span");
            span.className = `status-tag${["TRANSFERRED","RELEASED"].includes(rec.status) ? " neutral" : ""}`;
            span.textContent = recordLabel(rec.status); td.append(span);
          } else td.textContent = key === "name" && language === "bn" ? fictionalNamesBn[index] : key === "ward" ? recordLabel(rec.ward) : rec[key];
          tr.append(td);
        }
        tbody.append(tr);
      });
      $("#record-count").textContent = String(matches.length);
    };
    $("#record-search")?.addEventListener("input", renderRecords);
    window.addEventListener("pabna-language-changed", renderRecords);
    renderRecords();
    const showUnlock = () => {
      if (state.cipherOne && state.cipherTwo) {
        state.archiveSolved = true; save();
        $("#vault-reward").hidden = false;
      }
    };
    if (state.cipherOne) feedback($("#cipher-one-feedback"), "correctSerial", "success");
    if (state.cipherTwo) feedback($("#cipher-two-feedback"), "correctLandmark", "success");
    showUnlock();
    $("#cipher-one-form")?.addEventListener("submit", event => {
      event.preventDefault();
      if (state.cipherOne) { feedback($("#cipher-one-feedback"), "alreadySolved", "success"); return; }
      if (normalize($("#cipher-one").value) !== "0427") { feedback($("#cipher-one-feedback"), "wrongSerial", "error"); playSfx("error"); return; }
      state.cipherOne = true; save();playSfx("success");
      feedback($("#cipher-one-feedback"), "correctSerial", "success");
      showUnlock();
    });
    $("#cipher-two-form")?.addEventListener("submit", event => {
      event.preventDefault();
      if (state.cipherTwo) { feedback($("#cipher-two-feedback"), "alreadySolved", "success"); return; }
      if (normalize($("#cipher-two").value) !== "HATA") { feedback($("#cipher-two-feedback"), "wrongLandmark", "error");playSfx("error"); return; }
      state.cipherTwo = true; save();playSfx("success");
      feedback($("#cipher-two-feedback"), "correctLandmark", "success");
      showUnlock();
    });
  };

  const wireColors = {red:"#e35d57",teal:"#72c5bc",amber:"#e8b865"};
  const initEscape = () => {
    if (!Number.isFinite(state.deadline) || state.deadline <= 0) { state.deadline = Date.now() + GAME_SECONDS * 1000; save(); }
    let chosen = null;
    let interval = null;
    const wireNodes = $$(".wire-node");
    const renderWires = () => {
      wireNodes.forEach(btn => {
        const done = state.wires.includes(btn.dataset.wire);
        btn.classList.toggle("connected", done);
        btn.classList.toggle("active", chosen === btn.dataset.wire && btn.dataset.side === "left");
        btn.setAttribute("aria-pressed", String(done || (chosen === btn.dataset.wire && btn.dataset.side === "left")));
      });
      $("#wire-count").textContent = `${state.wires.length} / 3`;
      const svg = $("#wire-lines");
      svg.replaceChildren();
      const bounds = $("#wire-game").getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      const pos = (btn, right) => {
        const dot = btn.querySelector(".wire-node-dot").getBoundingClientRect();
        return {
          x: (((right ? dot.left : dot.right) - bounds.left) / bounds.width) * 600,
          y: (((dot.top + dot.height / 2) - bounds.top) / bounds.height) * 250
        };
      };
      state.wires.forEach(type => {
        const left = wireNodes.find(btn => btn.dataset.wire === type && btn.dataset.side === "left");
        const right = wireNodes.find(btn => btn.dataset.wire === type && btn.dataset.side === "right");
        if (!left || !right) return;
        const a = pos(left, false), b = pos(right, true);
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", `M ${a.x} ${a.y} C ${(a.x+b.x)/2} ${a.y}, ${(a.x+b.x)/2} ${b.y}, ${b.x} ${b.y}`);
        path.setAttribute("fill", "none"); path.setAttribute("stroke", wireColors[type]); path.setAttribute("stroke-width", "3.5");
        path.setAttribute("stroke-linecap", "round"); path.setAttribute("opacity", ".94");
        svg.append(path);
      });
    };
    wireNodes.forEach(btn => btn.addEventListener("click", () => {
      if (state.outcome) return;
      const type = btn.dataset.wire, side = btn.dataset.side;
      if (state.wires.includes(type)) return;
      if (side === "left") {
        chosen = type;
        feedback($("#wire-feedback"), "wirePick");
      } else if (!chosen) {
        feedback($("#wire-feedback"), "wireInstruction");
      } else if (chosen !== type) {
        feedback($("#wire-feedback"), "wireWrong", "error");playSfx("error");
      } else {
        state.wires.push(type); chosen = null; save();playSfx("success");
        feedback($("#wire-feedback"), state.wires.length === 3 ? "allConnected" : "wireConnected", "success");
      }
      renderWires();
    }));
    const endGame = outcome => {
      const firstEnd = !state.outcome;
      state.outcome = outcome; save();
      if (firstEnd) playSfx(outcome === "success" ? "success" : "sting");
      document.body.classList.toggle("jumpscare",outcome==="failure" && firstEnd);
      if (firstEnd && outcome==="failure") window.setTimeout(()=>document.body.classList.remove("jumpscare"),1100);
      if (interval) window.clearInterval(interval);
      $("#escape-game").hidden = true;
      const screen = $("#end-screen");
      screen.hidden = false;
      screen.classList.toggle("failure", outcome === "failure");
      $("#end-symbol").textContent = outcome === "success" ? "✦" : "☠";
      $("#end-eyebrow").textContent = t(outcome === "success" ? "successEyebrow" : "failureEyebrow");
      $("#end-title").textContent = t(outcome === "success" ? "successTitle" : "failureTitle");
      $("#end-description").textContent = t(outcome === "success" ? "successDescription" : "failureDescription");
    };
    const tick = () => {
      if (state.outcome) return;
      const remaining = Math.max(0, Math.ceil((state.deadline - Date.now())/1000));
      const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
      const ss = String(remaining % 60).padStart(2, "0");
      $("#countdown").textContent = `${mm}:${ss}`;
      $("#countdown").classList.toggle("urgent", remaining <= 30);
      $("#timer-bar").style.width = `${remaining / GAME_SECONDS * 100}%`;
      if (remaining === 0) endGame("failure");
    };
    $("#escape-form")?.addEventListener("submit", event => {
      event.preventDefault();
      if (state.outcome) return;
      if (Date.now() >= state.deadline) { endGame("failure"); return; }
      if (state.wires.length !== 3) { feedback($("#escape-feedback"), "needWires", "error");playSfx("error"); return; }
      if (normalize($("#exit-key").value) !== "DAWN") { feedback($("#escape-feedback"), "wrongPhrase", "error");playSfx("error"); return; }
      endGame("success");
    });
    $("#reset-timer")?.addEventListener("click", () => {
      if (!window.confirm(t("resetTimerConfirm"))) return;
      state.deadline=Date.now()+GAME_SECONDS*1000;
      state.outcome=null;
      state.wires=[];
      save();window.location.reload();
    });
    $("#retry-escape")?.addEventListener("click", () => {
      state.deadline=Date.now()+GAME_SECONDS*1000;
      state.outcome=null;
      state.wires=[];
      save();
      window.location.reload();
    });
    $("#play-again")?.addEventListener("click", () => {
      if (!window.confirm(t("resetConfirm"))) return;
      try { localStorage.removeItem(STATE_KEY); } catch {}
      window.location.href = "index.html";
    });
    window.addEventListener("resize", renderWires);
    renderWires();
    if (state.outcome) endGame(state.outcome);
    else { tick(); interval = window.setInterval(tick, 250); }
    // Update the resolved ending as well when switching languages.
    window.addEventListener("pabna-language-changed", () => { if (state.outcome) endGame(state.outcome); });
  };

  initShared();
  if (page === "gateway") initGateway();
  if (page === "surveillance") initSurveillance();
  if (page === "archive") initArchive();
  if (page === "escape") initEscape();
})();
