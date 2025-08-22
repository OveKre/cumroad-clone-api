# CumRoad Clone - Testplaan

**Versioon:** 1.0  
**Kuupäev:** 22. august 2025  
**Autorid:** TAK24 Grupp  
**Projekt:** CumRoad Clone API & Frontend

---

## 1. Pealkiri, versioon, autorid

**Dokumendi nimi:** CumRoad Clone Testplaan  
**Versioon:** 1.0  
**Koostamise kuupäev:** 22. august 2025  
**Autorid:** TAK24 Grupp  
**Projekti nimi:** CumRoad Clone - Digitaalne turuplattvorm  
**Repositoorium:** https://github.com/OveKre/cumroad-clone-api

## 2. Dokumendi ajalugu ja heakskiidud

| Versioon | Kuupäev | Autor | Muudatused | Heakskiit |
|----------|---------|--------|------------|-----------|
| 1.0 | 22.08.2025 | TAK24 Grupp | Esialgne testplaan | Ootel |

**Heakskiidu tabel:**
- Projektijuht: _Ootel_
- Peaarendaja: _Ootel_
- QA juht: _Ootel_

## 3. Eesmärk ja ulatus

### Eesmärk
Tagada CumRoad Clone rakenduse kvaliteet, funktsionaalsus ja turvalisus enne tootmiskeskkonda juurutamist. Testida kõiki kriitiline ärifunktsioone ja tagada kasutajakogemuse vastavus nõuetele.

### Ulatus
**Testitavad komponendid:**
- Backend API (Node.js/Express)
- Frontend veebirakendus (React/TypeScript)
- Andmebaasi integratsioon (SQLite)
- Autentimine ja autoriseerimine (JWT)
- REST API endpoint-id

**Testitavad funktsioonid:**
- Kasutajate registreerimine ja sisselogimine
- Toodete CRUD operatsioonid
- Tellimuste haldus
- Kasutajarollide kontroll
- API dokumentatsioon

## 4. Viited ja alusdokumendid

- API dokumentatsioon: `/api-docs` (Swagger)
- Frontend README: `frontend/README.md`
- Backend README: `README.md`
- Tehniline spetsifikatsioon: Koodirepositorium
- Kasutajaliidese prototüübid: React komponendid
- Andmebaasi skeem: `src/models/`

## 5. Testitavad üksused

### Backend komponendid:
- **app.js** - Rakenduse peamine konfiguratsioon
- **src/controllers/** - Äriloogika kontrollerid
- **src/models/** - Andmebaasi mudelid
- **src/routes/** - API marsruudid
- **src/middleware/** - Autentimine ja vigade käsitlemine

### Frontend komponendid:
- **src/pages/** - Rakenduse leheküljed
- **src/components/** - Taaskasutatavad komponendid
- **src/lib/api.ts** - API integratsioon
- **src/contexts/** - Rakenduse kontekstid

### Build versioonid:
- Development build: `npm run dev`
- Production build: `npm run build`
- Git commit SHA: Igale test-run'ile

## 6. Testitavad ja mittetestitavad omadused

### Testitavad funktsionaalsed omadused:
- ✅ Kasutajate registreerimine ja autentimine
- ✅ Sessioonide haldus ja väljalogimine
- ✅ Toodete loomine, vaatamine, muutmine, kustutamine
- ✅ Tellimuste loomine ja haldus
- ✅ Kasutajarollide kontroll (user/admin)
- ✅ API endpoint-ide töötamine
- ✅ Andmete valideerimine
- ✅ Vigade käsitlemine

### Testitavad mitteFunktsionaalsed omadused:
- ✅ Jõudlus (vastamise ajad)
- ✅ Turvalisus (JWT, CORS, Helmet)
- ✅ Kasutatavus (UI/UX)
- ✅ Ühilduvus (brauserite tugi)

### Mittetestitavad omadused:
- ❌ Pilve infrastruktuur (väljaspool projekti ulatust)
- ❌ Kolmandate osapoolte teenused
- ❌ Mobiilirakenduse versioon (pole arendatud)
- ❌ Maksesüsteemi integratsioon (pole implementeeritud)

## 7. Testimise lähenemine

### Testimise strateegiad:
1. **Unit Testing** - Üksikute funktsioonide testimine
2. **Integration Testing** - Komponentide vahelise suhtluse test
3. **E2E Testing** - Kasutajastsenaariumide testimine
4. **API Testing** - REST endpoint-ide funktsionaalsuse test
5. **Manual Testing** - Käsitsi läbiviidavad testjuhtumid

### Tööriistad:
- **Backend testing:** Jest, Supertest
- **Frontend testing:** Vitest, React Testing Library
- **E2E testing:** Playwright või Cypress
- **API testing:** Postman/Newman
- **Koodi kvaliteet:** ESLint, TypeScript
- **CI/CD:** GitHub Actions

### Testimise nivood:
- **Unit Level:** 80% koodikatvus
- **Integration Level:** Kriitiline äriloogika
- **System Level:** Täieliku süsteemi töötamine
- **Acceptance Level:** Kasutajanõuete täitmine

## 8. Sisenemis-, väljumis- ja peatamiskriteeriumid

### Sisenemiskriteeriumid (Entry Criteria):
- ✅ Kõik arenduskomplektid on installitud
- ✅ Testimiskeskkond on seadistatud
- ✅ Andmebaas on migreeritud ja seadistatud
- ✅ API dokumentatsioon on kättesaadav
- ✅ Build protsess töötab vigadeta

### Väljumiskriteeriumid (Exit Criteria):
- ✅ 95% kriitilistest testjuhtumitest on läbitud (Pass)
- ✅ 0 kriitilisi vigu (Severity: Critical)
- ✅ ≤ 2 kõrge prioriteediga vigu (Severity: High)
- ✅ Koodi katvus ≥ 80%
- ✅ Jõudlustestid vastavad nõuetele
- ✅ Turvalisuse audit on läbitud

### Peatamiskriteeriumid (Stop Criteria):
- ❌ >5 kriitilisi vigu
- ❌ Testimiskeskkond ei ole kättesaadav >4 tundi
- ❌ Andmekadumus või korruptsiooni juhtumid
- ❌ Turvalisuse kriitilised lüngad

## 9. Ressursid ja rollid

### Meeskond ja rollid:

| Roll | Vastutaja | Vastutus |
|------|-----------|----------|
| Testijuht | TAK24 Lead | Testplaani koordineerimine, aruandlus |
| Backend Tester | TAK24 Backend Dev | API ja andmebaasi testimine |
| Frontend Tester | TAK24 Frontend Dev | UI/UX ja komponendi testimine |
| Automaattestide arendaja | TAK24 QA | E2E testide kirjutamine |
| DevOps insener | TAK24 DevOps | CI/CD ja keskkonna haldus |

### Nõutavad ressursid:

**Riistvara:**
- Arendusmasinad: Windows/macOS/Linux
- Server testimiseks: 2 CPU, 4GB RAM
- Võrguühendus testide käivitamiseks

**Tarkvara:**
- Node.js 18.x või uuem
- VS Code või sarnane IDE
- Git version control
- Postman API testimiseks
- Brauserid: Chrome, Firefox, Safari, Edge

## 10. Ajakava ja verstapostid

### Testimise faasid ja ajakava:

| Faas | Algus | Lõpp | Kestus | Vastutaja |
|------|-------|------|--------|-----------|
| **Planeerimine** | 22.08.2025 | 23.08.2025 | 2 päeva | Testijuht |
| **Unit Testing** | 24.08.2025 | 26.08.2025 | 3 päeva | Arendajad |
| **Integration Testing** | 27.08.2025 | 29.08.2025 | 3 päeva | QA tiim |
| **System Testing** | 30.08.2025 | 02.09.2025 | 4 päeva | QA tiim |
| **User Acceptance** | 03.09.2025 | 05.09.2025 | 3 päeva | Product Owner |
| **Regression Testing** | 06.09.2025 | 08.09.2025 | 3 päeva | Automaation |

### Verstapostid:
- **M1:** Testplaan valmis (23.08.2025)
- **M2:** Automaattestid seadistatud (26.08.2025)
- **M3:** Esimene test-run teostatud (29.08.2025)
- **M4:** Kõik kriitiline funktsioonid testitud (02.09.2025)
- **M5:** Lõplik test-run ja raport (08.09.2025)

## 11. Keskkond ja infrastruktuur

### Testimiskeskkonnad:

**Development Environment:**
- URL: http://localhost:3002 (Backend)
- URL: http://localhost:5173 (Frontend)
- Andmebaas: SQLite (local)
- Node.js versioon: 18.x, 20.x

**Staging Environment:**
- URL: TBD (GitHub Pages või Vercel)
- Andmebaas: SQLite või PostgreSQL
- CI/CD: GitHub Actions

**Test Data Management:**
- Testandmed: Eraldi SQLite fail testideks
- Seeded data: Testimiseks vajalikud kasutajad ja tooted
- Backup: Automaatne backup enne teste

### Vajalik infrastruktuur:
- Git repositoorium: GitHub
- CI/CD platform: GitHub Actions
- Artifact storage: GitHub Actions artifacts
- Monitoring: GitHub Actions logs

## 12. Testide disaini viited

### Käsitsi testjuhtumid:
- Asukoht: `tests/manual/testcases/`
- Šabloon: `testcase-template.md`
- Kogus: ≥20 testjuhtumit
- Formaat: Markdown tabelid

### Automaattestid:

**Unit testid:**
- Asukoht: `tests/automation/unit/`
- Framework: Jest (Backend), Vitest (Frontend)
- Katvus: ≥80%

**E2E testid:**
- Asukoht: `tests/automation/e2e/`
- Framework: Playwright
- Brauserid: Chromium, Firefox, WebKit

**API testid:**
- Asukoht: `tests/automation/api/`
- Framework: Supertest + Jest
- Collection: Postman collection

## 13. Riskid ja leevendused

| Risk | Tõenäosus | Mõju | Prioriteet | Leevendus |
|------|-----------|------|------------|-----------|
| Testimiskeskkonna kättesaamatus | Keskmine | Kõrge | Kõrge | Backup server, lokaal dev |
| Automaattestide ebastabiilsus | Kõrge | Keskmine | Kõrge | Retry logic, wait strategiid |
| Andmebaasi korruptsioon | Madal | Kõrge | Keskmine | Regulaarne backup |
| CI/CD pipeline'i vead | Keskmine | Keskmine | Keskmine | Lokaal testing, manual fallback |
| Ajaline hilinemine | Keskmine | Kõrge | Kõrge | Paralleelsed testid, scope vähendus |
| Ressursside puudus | Madal | Kõrge | Keskmine | Cross-training, flexible rollid |

### Riskide juhtimise protseduurid:
1. Igapäevane riskide ülevaatus
2. Escalation protseduur kriitiliste riskide puhul
3. Contingency plaanid peamiste riskide jaoks

## 14. Luba- ja auditeerimisnõuded

### GDPR vastavus:
- Kasutajate andmete kustutamine (DELETE /users/:id)
- Andmete portatavus (JSON export)
- Consent management (registreerimise vorm)

### Turvalisuse nõuded:
- Paroolide krüpteerimine (bcrypt)
- JWT tokenite turvalisus
- SQL injection kaitse (Sequelize ORM)
- XSS kaitse (Helmet middleware)
- CORS poliitika

### Auditeerimise logi:
- Kasutajate tegevused logitakse
- API päringute logi (Morgan)
- Vigade jälgimine ja raporteerimine

**Märkus:** Projekti olles õppeeesmärgil, ei kohaldata täielikke tööstuse auditeerimise nõudeid, kuid põhiprintsiibid on järgitud.

## 15. Testi töövoo protseduurid

### Defekti elutsükkel:

1. **Avastamine** → Tester leiab vea
2. **Registreerimine** → Viga kantakse GitHub Issues'sse
3. **Triaaz** → Priority ja severity määramine
4. **Määramine** → Arendajale määramine
5. **Parandamine** → Arendaja parandab vea
6. **Testimine** → Tester kontrollib parandust
7. **Sulgemine** → Viga märgitakse lahendatuks

### GitHub Issues workflow:
- Labels: `bug`, `enhancement`, `testing`, `critical`, `high`, `medium`, `low`
- Milestones: Verstapostidega seotud
- Assignees: Vastutava isiku määramine
- Templates: Vea raporti šabloon

### Change Control:
- Kõik muudatused läbi pull request
- Code review kohustuslik
- Automated testing enne merge'i
- Release notes igale versioonile

## 16. Mõõdikud ja raportid

### Kvaliteedi mõõdikud (KPI-d):

**Testide mõõdikud:**
- Test case pass rate: ≥95%
- Defect density: ≤5 defekti/modul
- Code coverage: ≥80%
- API response time: ≤200ms

**Arenduse mõõdikud:**
- Build success rate: ≥95%
- Time to fix critical bugs: ≤24h
- Mean time between failures: ≥7 päeva

### Raporteerimise sagedus:
- **Igapäevane:** CI/CD build staatused
- **Iganädalane:** Test execution summary
- **Sprint lõpus:** Comprehensive test report
- **Release'i eelne:** Final acceptance report

### Automaatsed raportid:
- GitHub Actions artifacts
- Test coverage reports (jest/vitest)
- Performance metrics (Lighthouse)

## 17. Lõpuleviimise kriteerium ja hooldus

### Testplaani sulgemise kriteeriumid:
- ✅ Kõik planneeritud testid on teostatud
- ✅ Väljumiskriteeriumid on täidetud
- ✅ Test-run'i raportid on genereeritud
- ✅ Defektid on dokumenteeritud ja priomatiseeritud
- ✅ Sign-off product owner'ilt

### Hoolduse faas:
**Regression testing:**
- Automaatsed testid käivitatakse igal commit'il
- Täielik regression test iga release eelne
- Smoke testid toodangus deployment'i järel

**Test maintenance:**
- Testjuhtumite uuendamine muudatuste korral
- Testautomatiseerimise täiustamine
- Performance baseline'ide uuendamine

**Dokumentatsiooni hooldus:**
- Testplaani uuendamine suurte muudatuste korral
- Test case'ide versioonihaldus
- Lessons learned dokumenteerimine

## 18. Testjuhtumite loetelu

### Testjuhtumite kategooriad ja lingid:

**Autentimise testid:**
- [TC-001: Edukas sisselogimine](testcases/TC-001-signin.md)
- [TC-002: Ebaõnnestunud sisselogimine](testcases/TC-002-failed-signin.md)
- [TC-003: Kasutaja registreerimine](testcases/TC-003-registration.md)
- [TC-004: Väljalogimine](testcases/TC-004-logout.md)
- [TC-005: Token aegumise kontroll](testcases/TC-005-token-expiry.md)

**Toodete halduse testid:**
- [TC-006: Toote loomine](testcases/TC-006-create-product.md)
- [TC-007: Toote vaatamine](testcases/TC-007-view-product.md)
- [TC-008: Toote muutmine](testcases/TC-008-edit-product.md)
- [TC-009: Toote kustutamine](testcases/TC-009-delete-product.md)
- [TC-010: Toodete loetelu](testcases/TC-010-list-products.md)

**Tellimuste testid:**
- [TC-011: Tellimuse loomine](testcases/TC-011-create-order.md)
- [TC-012: Tellimuse vaatamine](testcases/TC-012-view-order.md)
- [TC-013: Tellimuse muutmine](testcases/TC-013-update-order.md)
- [TC-014: Tellimuse kustutamine](testcases/TC-014-delete-order.md)
- [TC-015: Tellimuste ajalugu](testcases/TC-015-order-history.md)

**API ja turvalisuse testid:**
- [TC-016: API endpoint-ide turvalisus](testcases/TC-016-api-security.md)
- [TC-017: Andmete valideerimine](testcases/TC-017-data-validation.md)
- [TC-018: Vigade käsitlemine](testcases/TC-018-error-handling.md)
- [TC-019: Jõudluse test](testcases/TC-019-performance.md)
- [TC-020: CORS ja CSRF kaitse](testcases/TC-020-security-headers.md)

**Kasutajaliidese testid:**
- [TC-021: Navigatsiooni test](testcases/TC-021-navigation.md)
- [TC-022: Vormide valideerimine](testcases/TC-022-form-validation.md)
- [TC-023: Responsive design](testcases/TC-023-responsive-design.md)
- [TC-024: Brauserite ühilduvus](testcases/TC-024-browser-compatibility.md)
- [TC-025: Juurdepääsetavus](testcases/TC-025-accessibility.md)

**Kokku:** 25 testjuhtumit katavad 100% kriitilistest funktsionaaldustest.

## 19. Test-run'i raportid

### Test-run'i raportite asukoht:
- Kataloog: `reports/`
- Failinimed: `testrun_YYYY-MM-DD.md`
- Artifact'id: GitHub Actions uploads

### Raportite sisu:
- **Ülevaade:** Pass/Fail statistika
- **Detailid:** Iga testjuhtumi tulemus
- **Defektid:** Avastatud vigade loend
- **Jõudlus:** Vastamise ajad ja metriikad
- **Coverage:** Koodi katvuse raport
- **Screenshots:** Ebaõnnestunud testide pildid

### Näited:
- [Test Run 2025-08-22](../reports/testrun_2025-08-22.md) - Esimene täielik test-run
- [Test Run 2025-08-25](../reports/testrun_2025-08-25.md) - Regression test
- [Test Run 2025-08-29](../reports/testrun_2025-08-29.md) - Pre-release test

### Automaatne genereerimine:
Test-run'i raportid genereeritakse automaatselt CI/CD pipeline'i poolt ning uploaderakse GitHub Actions artifact'idena säilitamiseks.

---

**Dokumendi lõpp**

**Versioon:** 1.0  
**Viimati uuendatud:** 22. august 2025  
**Järgmine ülevaatus:** 29. august 2025
