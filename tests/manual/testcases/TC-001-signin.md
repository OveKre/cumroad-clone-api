# TC-001: Edukas sisselogimine

## TC-001: Edukas sisselogimine

**Test Case ID:** TC-001  
**Testjuhtumi nimi:** Edukas sisselogimine kehtivate kasutajaandmetega  
**Koostaja:** TAK24 Grupp  
**Kuupäev:** 22. august 2025  
**Versioon:** 1.0  

### Eesmärk
Kontrollida, et kasutaja saab edukalt sisse logida kehtivate kasutajaandmetega ja pääseb juurde kaitstud lehtedele.

### Eeltingimused
- Kasutaja on registreeritud süsteemis
- Kasutaja on välja logitud
- Frontend rakendus on kättesaadav aadressil http://localhost:5173
- Backend API töötab aadressil http://localhost:3002

### Testandmed
| Väli | Väärtus | Märkused |
|------|---------|-----------|
| Email | user@example.com | Kehtiv registreeritud kasutaja |
| Password | Pass123! | Kehtiv parool |

### Testsammud ja oodatavad tulemused

| Samm | Tegevus | Oodatav tulemus |
|------|---------|-----------------|
| 1 | Ava veebileht http://localhost:5173 | Pealeht kuvatakse korrektselt |
| 2 | Kliki "Login" navigatsiooni linkil | Suunatakse /login lehele |
| 3 | Sisesta email väljale "user@example.com" | Email väli sisaldab sisestatud väärtust |
| 4 | Sisesta password väljale "Pass123!" | Password väli näitab tärne/punkti |
| 5 | Kliki "Login" nuppu | Loading ikoon kuvatakse hetkeks |
| 6 | Oota response'i | Suunatakse /dashboard lehele |
| 7 | Kontrolli URL-i | URL on http://localhost:5173/dashboard |
| 8 | Kontrolli navigatsiooni | "Logout" nupp on nähtav |
| 9 | Kontrolli lehte sisu | "Welcome to your dashboard!" on nähtav |
| 10 | Kontrolli lokalStoraget | JWT token on salvestatud |

### Järeltingimused
- Kasutaja on sisse logitud
- Dashboard leht on kuvatud
- Navigatsioonis on "Logout" nupp
- LocalStorage'is on JWT token

### Kriitilisus
**Critical**

### Prioriteet
**High**

### Testikeskkond
- Browser: Chrome Latest
- OS: Windows 11
- Resolution: 1920x1080

### Automaatse testiga seotud
- [x] Sobib automatiseerimiseks
- [x] Automatiseeritud
- Automatiseerimise viide: tests/automation/e2e/auth/login.test.js

### Märkused
- Test on osa autentimise regressioonitestidest
- Kontrollida tuleb ka network tab'i response koode
- JWT token'i sisu valideerimist teha API testides

---

### Test Execution Log

| Kuupäev | Versioon | Executor | Tulemus | Märkused | Defekti ID |
|---------|----------|----------|---------|-----------|------------|
| 22.08.2025 | 1.0 | TAK24 | Pass | Töötab ootuspäraselt | - |

### Viited
- API endpoint: POST /sessions
- Related Tests: TC-002, TC-004
- User story: Kasutaja sisselogimine
