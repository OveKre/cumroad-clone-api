# TC-025: Andmebaasi integratsiooni test

## TC-025: Andmebaasi integratsiooni test
**Test Case ID:** TC-025  
**Kriitilisus:** High  
**Eeltingimused:** SQLite andmebaas on seadistatud.

| Samm | Tegevus | Oodatav tulemus |
|------|---------|-----------------|
| 1 | Loo uus kasutaja | Andmed salvestatakse SQLite'i |
| 2 | Kontrolli password hash'imist | Parool on bcrypt'itud |
| 3 | Loo uus toode | Product tabel uuendatakse |
| 4 | Kontrolli foreign key seoseid | User-Product seos toimib |
| 5 | Testa Sequelize migration'e | Database schema on õige |
