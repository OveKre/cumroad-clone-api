# TC-002: Ebaõnnestunud sisselogimine

## TC-002: Ebaõnnestunud sisselogimine

**Test Case ID:** TC-002  
**Testjuhtumi nimi:** Ebaõnnestunud sisselogimine vale parooliga  
**Koostaja:** TAK24 Grupp  
**Kuupäev:** 22. august 2025  
**Versioon:** 1.0  

### Eesmärk
Kontrollida, et süsteem keeldub sisselogimist vale parooliga ja näitab asjakohast veateadet.

### Eeltingimused
- Kasutaja on registreeritud süsteemis
- Kasutaja on välja logitud
- Frontend rakendus on kättesaadav
- Backend API töötab

### Testandmed
| Väli | Väärtus | Märkused |
|------|---------|-----------|
| Email | user@example.com | Kehtiv registreeritud kasutaja |
| Password | wrongpassword | Vale parool |

### Testsammud ja oodatavad tulemused

| Samm | Tegevus | Oodatav tulemus |
|------|---------|-----------------|
| 1 | Ava /login leht | Login vorm on kuvatud |
| 2 | Sisesta kehtiv email "user@example.com" | Email väli täidetud |
| 3 | Sisesta vale parool "wrongpassword" | Password väli täidetud |
| 4 | Kliki "Login" nuppu | Loading ikoon kuvatakse |
| 5 | Oota response'i | Veateade kuvatakse |
| 6 | Kontrolli veateadet | "Invalid credentials" või sarnane teade |
| 7 | Kontrolli URL-i | Jääb /login lehele |
| 8 | Kontrolli localStorage | Token'it ei salvestata |
| 9 | Kontrolli vorm | Parool väli tühjendatakse |

### Järeltingimused
- Kasutaja ei ole sisse logitud
- Login lehel viibib endiselt
- Veateade on nähtav
- LocalStorage'is ei ole JWT token'it

### Kriitilisus
**High**

### Prioriteet
**High**

### Testikeskkond
- Browser: Chrome Latest
- OS: Windows 11
- Resolution: 1920x1080

### Automaatse testiga seotud
- [x] Sobib automatiseerimiseks
- [x] Automatiseeritud
- Automatiseerimise viide: tests/automation/e2e/auth/login-fail.test.js

### Märkused
- Kontrollida HTTP status koodi (401)
- Veateade ei tohi paljastada, kas email eksisteerib

---

### Test Execution Log

| Kuupäev | Versioon | Executor | Tulemus | Märkused | Defekti ID |
|---------|----------|----------|---------|-----------|------------|
| 22.08.2025 | 1.0 | TAK24 | Pass | Töötab ootuspäraselt | - |

### Viited
- API endpoint: POST /sessions
- Related Tests: TC-001, TC-003
- Security requirement: Autentimise turvalisus
