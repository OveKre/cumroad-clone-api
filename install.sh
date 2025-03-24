#!/bin/bash

# Mitmekeelse API dokumentatsiooni seadistamine
# See skript seadistab mitmekeelse API dokumentatsiooni

# Värviliste teadete jaoks
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Alustame mitmekeelse API dokumentatsiooni seadistamist...${NC}"

# Kontrolli, kas kasutaja on root
if [ "$(id -u)" != "0" ]; then
   echo -e "${RED}See skript vajab juurkasutaja õigusi. Palun käivita see 'sudo' kasutades.${NC}"
   exit 1
fi

# Projekti kaust
PROJECT_DIR="/p/cumroad-clone-api"

# Kontrolli, kas projekti kaust eksisteerib
if [ ! -d "$PROJECT_DIR" ]; then
    echo -e "${RED}Projekti kaust $PROJECT_DIR ei eksisteeri.${NC}"
    exit 1
fi

# Loo varukoopiad
echo -e "${YELLOW}Luuakse varukoopiad...${NC}"
mkdir -p "$PROJECT_DIR/backups/$(date +%Y-%m-%d)"
cp "$PROJECT_DIR/src/server.js" "$PROJECT_DIR/backups/$(date +%Y-%m-%d)/server.js.bak" 2>/dev/null || echo "server.js faili kopeerimine ebaõnnestus"
cp "/etc/nginx/sites-available/digikaup.online.conf" "$PROJECT_DIR/backups/$(date +%Y-%m-%d)/digikaup.online.conf.bak" 2>/dev/null || echo "Nginx konfiguratsiooni kopeerimine ebaõnnestus"

# Kopeeri YAML failid projekti juurkausta
echo -e "${YELLOW}Kopeerin YAML failid...${NC}"
cp swagger-en.yaml "$PROJECT_DIR/" || { echo -e "${RED}swagger-en.yaml kopeerimine ebaõnnestus${NC}"; exit 1; }
cp swagger-et.yaml "$PROJECT_DIR/" || { echo -e "${RED}swagger-et.yaml kopeerimine ebaõnnestus${NC}"; exit 1; }

# Kopeeri server.js fail
echo -e "${YELLOW}Kopeerin server.js faili...${NC}"
cp src/server.js "$PROJECT_DIR/src/" || { echo -e "${RED}server.js kopeerimine ebaõnnestus${NC}"; exit 1; }

# Kopeeri Nginx konfiguratsioon
echo -e "${YELLOW}Kopeerin Nginx konfiguratsiooni...${NC}"
cp docs.digikaup.online.conf /etc/nginx/sites-available/ || { echo -e "${RED}Nginx konfiguratsiooni kopeerimine ebaõnnestus${NC}"; exit 1; }

# Aktiveeri Nginx konfiguratsioon
echo -e "${YELLOW}Aktiveerin Nginx konfiguratsiooni...${NC}"
if [ ! -L "/etc/nginx/sites-enabled/docs.digikaup.online.conf" ]; then
    ln -s /etc/nginx/sites-available/docs.digikaup.online.conf /etc/nginx/sites-enabled/ || { echo -e "${RED}Nginx konfiguratsiooni aktiveerimine ebaõnnestus${NC}"; exit 1; }
fi

# Kontrolli Nginx konfiguratsiooni
echo -e "${YELLOW}Kontrollin Nginx konfiguratsiooni...${NC}"
nginx -t
if [ $? -ne 0 ]; then
    echo -e "${RED}Nginx konfiguratsiooni kontroll ebaõnnestus. Palun kontrollige faile ja proovige uuesti.${NC}"
    exit 1
fi

# Taaskäivita Nginx
echo -e "${YELLOW}Taaskäivitan Nginx...${NC}"
service nginx restart || { echo -e "${RED}Nginx taaskäivitamine ebaõnnestus${NC}"; exit 1; }

# Taaskäivita Node.js rakendus
echo -e "${YELLOW}Taaskäivitan Node.js rakenduse...${NC}"
cd "$PROJECT_DIR" || { echo -e "${RED}Projekti kausta liikumine ebaõnnestus${NC}"; exit 1; }
pm2 restart cumroad-clone-api || { echo -e "${RED}Rakenduse taaskäivitamine ebaõnnestus${NC}"; exit 1; }

echo -e "${GREEN}Mitmekeelse API dokumentatsiooni seadistamine on lõppenud!${NC}"
echo -e "${GREEN}Dokumentatsioon on nüüd saadaval:${NC}"
echo -e "${GREEN}- Inglise keeles: https://docs.digikaup.online/en${NC}"
echo -e "${GREEN}- Eesti keeles: https://docs.digikaup.online/et${NC}"
echo -e "${YELLOW}Märkus: Veenduge, et DNS-is on seadistatud alamdomeen docs.digikaup.online.${NC}"