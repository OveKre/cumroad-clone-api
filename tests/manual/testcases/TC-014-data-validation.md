# TC-014: Andmete valideerimine

## TC-014: Andmete valideerimine
**Test Case ID:** TC-014  
**Kriitilisus:** High  
**Eeltingimused:** API server töötab.

| Samm | Tegevus | Oodatav tulemus |
|------|---------|-----------------|
| 1 | Saada tühi email login vormis | Valideerimise viga kuvatakse |
| 2 | Saada vale email formaat | "Invalid email format" viga |
| 3 | Saada negatiivne hind tootele | "Price must be positive" viga |
| 4 | Saada liiga lühike parool | "Password too short" viga |
| 5 | Kontrolli frontend valideerimist | Clientside validation töötab |
