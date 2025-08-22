# TC-013: API endpoint-ide turvalisus

## TC-013: API endpoint-ide turvalisus
**Test Case ID:** TC-013  
**Kriitilisus:** Critical  
**Eeltingimused:** API server töötab.

| Samm | Tegevus | Oodatav tulemus |
|------|---------|-----------------|
| 1 | Tee GET /products päring ilma token'ita | 200 OK (avalik endpoint) |
| 2 | Tee POST /products päring ilma token'ita | 401 Unauthorized |
| 3 | Tee GET /orders päring ilma token'ita | 401 Unauthorized |
| 4 | Tee päring vale token'iga | 401 Unauthorized |
| 5 | Kontrolli CORS headereid | CORS seadistused korrektsed |
