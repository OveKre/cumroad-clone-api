# TC-004: Väljalogimine

## TC-004: Väljalogimine

**Test Case ID:** TC-004  
**Testjuhtumi nimi:** Kasutaja väljalogimine  
**Koostaja:** TAK24 Grupp  
**Kuupäev:** 22. august 2025  
**Versioon:** 1.0  

### Eesmärk
Kontrollida, et kasutaja saab edukalt välja logida ja token tühistatakse.

### Eeltingimused
- Kasutaja on sisse logitud
- Dashboard või muu kaitstud leht on avatud
- JWT token on localStorage'is

### Testandmed
| Väli | Väärtus | Märkused |
|------|---------|-----------|
| Authenticated user | user@example.com | Sisse logitud kasutaja |

### Testsammud ja oodatavad tulemused

| Samm | Tegevus | Oodatav tulemus |
|------|---------|-----------------|
| 1 | Oled sisse logitud dashboard'il | "Logout" nupp on nähtav navigatsioonis |
| 2 | Kliki "Logout" nuppu | Loading näidik kuvatakse |
| 3 | Oota response'i | Päring serverisse saadetakse |
| 4 | Kontrolli ümbersuunamist | Suunatakse avalikule lehele (/ või /login) |
| 5 | Kontrolli localStorage | JWT token on eemaldatud |
| 6 | Kontrolli navigatsiooni | "Login" nupp on nähtav |
| 7 | Proovi kaitstud lehte avada | Suunatakse login lehele |
| 8 | Kontrolli serverit | Token on blacklist'itud |

### Järeltingimused
- Kasutaja on välja logitud
- JWT token on localStorage'ist eemaldatud
- Token on serveris blacklist'itud
- Kaitstud lehtedele puudub juurdepääs

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
- Automatiseerimise viide: tests/automation/e2e/auth/logout.test.js

### Märkused
- Token'i blacklist'imine on oluline turvameetme
- Kõikides tab'ides peaks väljalogimine toimuma

---

### Test Execution Log

| Kuupäev | Versioon | Executor | Tulemus | Märkused | Defekti ID |
|---------|----------|----------|---------|-----------|------------|
| 22.08.2025 | 1.0 | TAK24 | Pass | Töötab ootuspäraselt | - |

### Viited
- API endpoint: DELETE /sessions
- Related Tests: TC-001, TC-005
- Security: Session management
