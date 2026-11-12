# পাবনা হন্টিং: একদম সহজে চালু করুন

1. ZIP Extract করুন।
2. VS Code > File > Open Folder দিয়ে `Pabna-Haunting-Final-Unlocked` folder খুলুন।
3. `index.html`-এ Right Click > **Open with Live Server**।
4. ওপরের চারটি menu থেকে সরাসরি যেকোনো page খুলুন। **কোনো LOCK / PREVIEW / ACCESS DENIED নেই।**
5. `বাংলা` বোতামে ক্লিক করলে সব interface বাংলা হবে। `EN` ক্লিক করলে ইংরেজি হবে।
6. `SOUND OFF` ক্লিক করলে Web Audio effects চালু হবে। শব্দ browser permission-এর কারণে একটি click ছাড়া শুরু হয় না।
7. Escape page-এ টাইমার ৫ মিনিট। Refresh করলেও সময় নতুন করে শুরু হবে না। **RESTART TIMER** দিয়ে শুধু টাইমার আবার শুরু করুন। শেষ হয়ে গেলে **RETRY ESCAPE** দিয়ে শুধু শেষ ধাপ পুনরায় খেলতে পারবেন।

## গেমের কোড
- Gateway (ঐচ্ছিক): `CELL-13`
- CCTV: Camera 03 + Infrared + Scan → `0427`
- Archive: `0427`, `HATA`
- Escape: তিন রঙের তার মিলিয়ে `DAWN`

## GitHub ও Vercel
README.md-তে push এবং Vercel deploy করার বিস্তারিত নির্দেশনা দেওয়া আছে।

## গুরুত্বপূর্ণ: পুরোনো folder না চালানো
পুরোনো ZIP extract করা folder বন্ধ করে এই নতুন **Pabna-Haunting-Final-Unlocked** folder আলাদা করে খুলবেন। ব্রাউজারে পুরোনো content দেখালে Chrome-এ **Command + Shift + R** চাপবেন।

## কী কী পরীক্ষা করা হয়েছে
চারটি পেজ সরাসরি খোলা, CCTV Scan, Archive Search ও দুটি Cipher, SVG wire game, Escape Success, বাংলা-ইংরেজি switch, mobile screen size এবং JavaScript syntax।
