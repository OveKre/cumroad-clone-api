# TC-017: CORS ja turvalisuse headerid

## TC-017: CORS ja turvalisuse headerid
**Test Case ID:** TC-017  
**Kriitilisus:** High  
**Eeltingimused:** API server töötab.

| Samm | Tegevus | Oodatav tulemus |
|------|---------|-----------------|
| 1 | Kontrolli CORS headereid | Access-Control-* headerid olemas |
| 2 | Tee cross-origin päring | CORS lubab frontend ühenduse |
| 3 | Kontrolli Helmet headereid | Security headerid seadistatud |
| 4 | Kontrolli Content-Security-Policy | CSP header olemas |
| 5 | Kontrolli X-Frame-Options | Clickjacking kaitse |
