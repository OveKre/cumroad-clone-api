# Mitmekeelse API dokumentatsiooni seadistamise juhend

Siin on juhised, kuidas seadistada mitmekeelne Swagger UI dokumentatsioon, mis sarnaneb näidispiltidele.

## 1. Failid ja nende paigutus

Kopeeri need failid oma projekti kausta:

- `swagger-en.yaml` - Ingliskeelne OpenAPI spetsifikatsioon
- `swagger-et.yaml` - Eestikeelne OpenAPI spetsifikatsioon
- `src/server.js` - Uuendatud server.js fail, mis toetab mitmekeelset dokumentatsiooni

## 2. Serverifailide uuendamine

```bash
# Liigu projekti kausta
cd /p/cumroad-clone-api

# Kopeeri YAML failid projekti juurkausta
cp /tee/kus/failid/asuvad/swagger-en.yaml .
cp /tee/kus/failid/asuvad/swagger-et.yaml .

# Uuenda server.js faili (tee enne varukoopia)
cp src/server.js src/server.js.backup
cp /tee/kus/failid/asuvad/server.js src/
```

## 3. Nginx seadistamine

### 3.1. Loo dokumentatsiooni alamdomeeni konfiguratsioonifail

```bash
# Kopeeri Nginx konfiguratsioonifail
cp /tee/kus/failid/asuvad/docs.digikaup.online.conf /etc/nginx/sites-available/

# Loo sümboliline link sites-enabled kausta
ln -s /etc/nginx/sites-available/docs.digikaup.online.conf /etc/nginx/sites-enabled/
```

### 3.2. SSL sertifikaadi taotlemine

Kui sul pole veel SSL sertifikaati alamdomeeni jaoks:

```bash
certbot --nginx -d docs.digikaup.online
```

### 3.3. Kontrolli Nginx konfiguratsiooni ja taaskäivita

```bash
# Kontrolli konfiguratsiooni
nginx -t

# Taaskäivita Nginx
service nginx restart

## 4. Node.js rakenduse taaskäivitamine

```bash
# Liigu projekti kausta
cd /p/cumroad-clone-api

# Taaskäivita rakendus PM2-ga
pm2 restart cumroad-clone-api
```

## 5. DNS seadistamine

Veendu, et alamdomeen `docs.digikaup.online` on seadistatud DNS-is ja viitab samale IP-aadressile kui `digikaup.online`.

## 6. Kontrollimine

Pärast seadistamist peaksid saama juurdepääsu dokumentatsioonile järgmistel aadressidel:

- Ingliskeelne dokumentatsioon: https://docs.digikaup.online/en
- Eestikeelne dokumentatsioon: https://docs.digikaup.online/et

Lisaks sellele:
- https://docs.digikaup.online/ - suunab automaatselt valitud keelele (brauseri eelistuse järgi)
- https://digikaup.online/api-docs - olemasolev API dokumentatsiooni asukoht (jääb tööle)

## 7. Veaotsing

Kui satud probleemide otsa:

### 7.1. Kontrolli logikirjeid

```bash
# Nginx logid
tail -f /var/log/nginx/docs.error.log
tail -f /var/log/nginx/error.log

# Rakenduse logid
pm2 logs cumroad-clone-api
```

### 7.2. Kontrolli, kas server töötab õigel pordil

```bash
# Kontrolli, kas rakendus kuulab pordil 3002
netstat -tulpn | grep 3002
```

### 7.3. Kontrolli YAML failide formaati

Kui dokumentatsioon ei kuvata, võib olla probleem YAML failide formaadiga. Kontrolli, kas need on korrektselt vormistatud:

```bash
# Installi yaml-lint, kui seda pole
npm install -g yaml-lint

# Kontrolli faile
yamllint swagger-en.yaml
yamllint swagger-et.yaml
```

## 8. Hooldus ja uuendamine

Kui soovid dokumentatsiooni sisu muuta, muuda vastavaid YAML faile ja taaskäivita rakendus:

```bash
# Muuda YAML faile
nano swagger-en.yaml  # ingliskeelse dokumentatsiooni muutmiseks
nano swagger-et.yaml  # eestikeelse dokumentatsiooni muutmiseks

# Taaskäivita rakendus
pm2 restart cumroad-clone-api
```