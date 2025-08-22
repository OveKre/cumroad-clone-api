# TC-016: Jõudluse test

## TC-016: Jõudluse test
**Test Case ID:** TC-016  
**Kriitilisus:** Medium  
**Eeltingimused:** API server töötab, testidandmed olemas.

| Samm | Tegevus | Oodatav tulemus |
|------|---------|-----------------|
| 1 | Mõõda API vastamise aegu | Kõik endpoint'id < 200ms |
| 2 | Lae 100 toodet korraga | Lehekülg laeb < 2 sekundiga |
| 3 | Tee 10 paralleelset päringut | Server käsitleb ilma vigadeta |
| 4 | Kontrolli memory usage | Mälu leke ei esine |
| 5 | Monitoori CPU kasutust | CPU < 80% load |
