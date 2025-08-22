# TC-015: Vigade käsitlemine

## TC-015: Vigade käsitlemine
**Test Case ID:** TC-015  
**Kriitilisus:** Medium  
**Eeltingimused:** Frontend ja backend töötavad.

| Samm | Tegevus | Oodatav tulemus |
|------|---------|-----------------|
| 1 | Katkesta internetiühendus | "Network error" teade kuvatakse |
| 2 | Taasta ühendus | Automaatne taastühendumine |
| 3 | Sisesta vale toote ID URL-is | 404 error leht kuvatakse |
| 4 | Proovi kustutada olematut toodet | Asjakohane veateade |
| 5 | Kontrolli error boundary töötamist | Rakendus ei kuku kokku |
