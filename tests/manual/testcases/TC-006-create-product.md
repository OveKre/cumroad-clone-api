# TC-006: Toote loomine

## TC-006: Toote loomine

**Test Case ID:** TC-006  
**Testjuhtumi nimi:** Uue toote loomine autenditud kasutaja poolt  
**Koostaja:** TAK24 Grupp  
**Kuupäev:** 22. august 2025  
**Versioon:** 1.0  

### Eesmärk
Kontrollida, et autenditud kasutaja saab edukalt luua uue toote kõigi vajalike andmetega.

### Eeltingimused
- Kasutaja on sisse logitud
- Kasutajal on õigused toote loomiseks
- /products/new leht on kättesaadav

### Testandmed
| Väli | Väärtus | Märkused |
|------|---------|-----------|
| Name | Test Digital Product | Toote nimi |
| Description | This is a test product for testing purposes | Toote kirjeldus |
| Price | 29.99 | Hind eurodes |
| Image URL | https://example.com/image.jpg | Valikuline pildi URL |

### Testsammud ja oodatavad tulemused

| Samm | Tegevus | Oodatav tulemus |
|------|---------|-----------------|
| 1 | Ava /products/new leht | Toote loomise vorm kuvatakse |
| 2 | Sisesta toote nimi "Test Digital Product" | Name väli täidetud |
| 3 | Sisesta kirjeldus | Description väli täidetud |
| 4 | Sisesta hind "29.99" | Price väli täidetud |
| 5 | Sisesta pildi URL | Image URL väli täidetud |
| 6 | Kliki "Create Product" nuppu | Loading näidik kuvatakse |
| 7 | Oota response'i | Toode luuakse edukalt |
| 8 | Kontrolli ümbersuunamist | Suunatakse toote detailli lehele |
| 9 | Kontrolli toote andmeid | Kõik sisestatud andmed kuvatakse |
| 10 | Kontrolli andmebaasi | Toode on salvestatud userID-ga |

### Järeltingimused
- Uus toode on loodud andmebaasis
- Toode on seotud sisselogitud kasutajaga
- Toode on nähtav toote detailli lehel
- Toode kuvatakse toodete nimekirjas

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
- Automatiseerimise viide: tests/automation/e2e/products/create-product.test.js

### Märkused
- Ainult autenditud kasutajad saavad tooteid luua
- UserId määratakse automaatselt JWT token'ist
- Hind peab olema positiivne number

---

### Test Execution Log

| Kuupäev | Versioon | Executor | Tulemus | Märkused | Defekti ID |
|---------|----------|----------|---------|-----------|------------|
| 22.08.2025 | 1.0 | TAK24 | Pass | Töötab ootuspäraselt | - |

### Viited
- API endpoint: POST /products
- Related Tests: TC-007, TC-008, TC-009
- User story: Toote loomine
