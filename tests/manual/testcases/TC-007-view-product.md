# TC-007: Toote vaatamine

## TC-007: Toote vaatamine

**Test Case ID:** TC-007  
**Testjuhtumi nimi:** Toote detailide vaatamine  
**Koostaja:** TAK24 Grupp  
**Kuupäev:** 22. august 2025  
**Versioon:** 1.0  

### Eesmärk
Kontrollida, et kasutaja saab vaadata toote detaile korrektselt.

### Eeltingimused
- Vähemalt üks toode eksisteerib andmebaasis
- Toote ID on teada

### Testandmed
| Väli | Väärtus | Märkused |
|------|---------|-----------|
| Product ID | 1 | Olemasoleva toote ID |

### Testsammud ja oodatavad tulemused

| Samm | Tegevus | Oodatav tulemus |
|------|---------|-----------------|
| 1 | Ava /products/:id leht | Toote detailid kuvatakse |
| 2 | Kontrolli toote nime | Nimi kuvatakse korrektselt |
| 3 | Kontrolli kirjeldust | Kirjeldus kuvatakse |
| 4 | Kontrolli hinda | Hind on vormindatud |
| 5 | Kontrolli pilti | Pilt kuvatakse või placeholder |

### Kriitilisus
**Medium**

### Prioriteet
**Medium**
