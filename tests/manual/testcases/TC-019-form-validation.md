# TC-019: Vormide valideerimine

## TC-019: Vormide valideerimine
**Test Case ID:** TC-019  
**Kriitilisus:** Medium  
**Eeltingimused:** Frontend töötab.

| Samm | Tegevus | Oodatav tulemus |
|------|---------|-----------------|
| 1 | Jäta login vorm tühjaks | Required field errors kuvatakse |
| 2 | Sisesta vale email formaat | Email validation error |
| 3 | Sisesta liiga lühike parool | Password strength error |
| 4 | Proovi submitida invalid vorm | Submit nupp on disabled |
| 5 | Kontrolli real-time valideerimist | Vead kuvatakse typing ajal |
