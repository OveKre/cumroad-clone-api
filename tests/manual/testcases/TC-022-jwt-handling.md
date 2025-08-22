# TC-022: JWT Token käsitlemine

## TC-022: JWT Token käsitlemine
**Test Case ID:** TC-022  
**Kriitilisus:** Critical  
**Eeltingimused:** API server töötab.

| Samm | Tegevus | Oodatav tulemus |
|------|---------|-----------------|
| 1 | Logi sisse ja kontrolli token'it | JWT token on localStorage'is |
| 2 | Dekodeeri token LocalStorage'ist | Token sisaldab user info |
| 3 | Oota token'i aegumist | Automaatne logout token expiry korral |
| 4 | Proovi kasutada aegunud token'it | 401 error ja redirect login'ile |
| 5 | Kontrolli token refresh | Token uuendatakse vajadusel |
