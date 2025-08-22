# TC-003: Kasutaja registreerimine

## TC-003: Kasutaja registreerimine

**Test Case ID:** TC-003  
**Testjuhtumi nimi:** Uue kasutaja edukas registreerimine  
**Koostaja:** TAK24 Grupp  
**Kuupäev:** 22. august 2025  
**Versioon:** 1.0  

### Eesmärk
Kontrollida, et uus kasutaja saab edukalt registreeruda süsteemis ja pääseb automaatselt sisse.

### Eeltingimused
- Frontend ja backend töötavad
- Test email ei ole veel registreeritud
- Andmebaas on kättesaadav

### Testandmed
| Väli | Väärtus | Märkused |
|------|---------|-----------|
| Name | Test User | Nimi (valikuline) |
| Email | testuser@example.com | Unikaalne email |
| Password | SecurePass123! | Turvalisuse nõuetele vastav |
| Confirm Password | SecurePass123! | Sama mis password |

### Testsammud ja oodatavad tulemused

| Samm | Tegevus | Oodatav tulemus |
|------|---------|-----------------|
| 1 | Ava /register leht | Registreerumise vorm kuvatud |
| 2 | Sisesta nimi "Test User" | Name väli täidetud |
| 3 | Sisesta email "testuser@example.com" | Email väli täidetud |
| 4 | Sisesta parool "SecurePass123!" | Password väli täidetud |
| 5 | Sisesta parooli kinnitus | Confirm password täidetud |
| 6 | Kliki "Register" nuppu | Loading näidik kuvatakse |
| 7 | Oota response'i | Registreerimine õnnestub |
| 8 | Kontrolli ümbersuunamist | Suunatakse /dashboard lehele |
| 9 | Kontrolli autentimist | Kasutaja on automaatselt sisse logitud |
| 10 | Kontrolli andmebaasi | Uus kasutaja on salvestatud |

### Järeltingimused
- Uus kasutaja on loodud andmebaasis
- Kasutaja on automaatselt sisse logitud
- JWT token on localStorage'is
- Kasutaja on dashboard lehel

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
- Automatiseerimise viide: tests/automation/e2e/auth/register.test.js

### Märkused
- Parool peab vastama turvalisuse nõuetele
- Email peab olema unikaalne
- Automaatne sisselogimine pärast registreerumist

---

### Test Execution Log

| Kuupäev | Versioon | Executor | Tulemus | Märkused | Defekti ID |
|---------|----------|----------|---------|-----------|------------|
| 22.08.2025 | 1.0 | TAK24 | Pass | Töötab ootuspäraselt | - |

### Viited
- API endpoint: POST /users
- Related Tests: TC-001, TC-017
- User story: Kasutaja registreerimine
