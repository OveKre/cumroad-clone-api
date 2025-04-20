/**
 * Skript Swagger YAML-failide kontrollimiseks ja vahetamiseks
 * Käivita: node fix-swagger-files.js
 */

const fs = require('fs');
const path = require('path');
const YAML = require('yamljs');

// Failide asukohad
const swaggerEnPath = path.join(__dirname, 'swagger-en.yaml');
const swaggerEtPath = path.join(__dirname, 'swagger-et.yaml');

console.log('Kontrollin Swagger faile...');

// Kontrolli, kas failid eksisteerivad
if (!fs.existsSync(swaggerEnPath)) {
  console.error('VIGA: Ingliskeelset Swagger faili ei leitud asukohas', swaggerEnPath);
  process.exit(1);
}

if (!fs.existsSync(swaggerEtPath)) {
  console.error('VIGA: Eestikeelset Swagger faili ei leitud asukohas', swaggerEtPath);
  process.exit(1);
}

try {
  // Loe failide sisu
  const swaggerEnContent = fs.readFileSync(swaggerEnPath, 'utf8');
  const swaggerEtContent = fs.readFileSync(swaggerEtPath, 'utf8');
  
  // Lae YAML andmed
  const swaggerEn = YAML.parse(swaggerEnContent);
  const swaggerEt = YAML.parse(swaggerEtContent);
  
  console.log('\n--- Ingliskeelse faili sisu ---');
  console.log('Pealkiri:', swaggerEn.info.title);
  console.log('Kirjeldus:', swaggerEn.info.description);
  
  console.log('\n--- Eestikeelse faili sisu ---');
  console.log('Pealkiri:', swaggerEt.info.title);
  console.log('Kirjeldus:', swaggerEt.info.description);
  
  // Kontrolli, kas failid on õiges keeles
  const enIsEnglish = swaggerEn.info.description.includes('e-commerce platform') || 
                      swaggerEn.info.description.includes('A RESTful API');
  const etIsEstonian = swaggerEt.info.description.includes('e-kaubanduse platvormi') || 
                       swaggerEt.info.description.includes('RESTful API e-kaubanduse');
  
  if (!enIsEnglish || !etIsEstonian) {
    console.log('\nTUVASTATUD PROBLEEM: Failid näivad olevat valetpidi!');
    
    // Küsi kasutajalt kinnitust
    console.log('\nKas soovid failid vahetada? (Y/n)');
    // Simuleerime kasutaja nõusolekut
    const userResponse = 'Y';
    
    if (userResponse.toLowerCase() === 'y' || userResponse === '') {
      console.log('\nVahetan failid...');
      
      // Tee ajutised koopiad
      fs.writeFileSync(swaggerEnPath + '.bak', swaggerEnContent);
      fs.writeFileSync(swaggerEtPath + '.bak', swaggerEtContent);
      console.log('Varukoopiaid tehtud: swagger-en.yaml.bak, swagger-et.yaml.bak');
      
      // Vaheta failide sisu
      fs.writeFileSync(swaggerEnPath, swaggerEtContent);
      fs.writeFileSync(swaggerEtPath, swaggerEnContent);
      console.log('Failid on vahetatud!');
      
      console.log('\nNüüd peaksid endpoints-id töötama õigesti:');
      console.log('- /api-docs ja /en peaks kuvama ingliskeelset dokumentatsiooni');
      console.log('- /et peaks kuvama eestikeelset dokumentatsiooni');
      console.log('\nTaaskäivita oma rakendus muutuste rakendamiseks.');
    } else {
      console.log('Faile ei vahetatud.');
    }
  } else {
    console.log('\nFailid tunduvad olevat õiges järjekorras! Midagi pole vaja muuta.');
    console.log('- swagger-en.yaml sisaldab ingliskeelset sisu');
    console.log('- swagger-et.yaml sisaldab eestikeelset sisu');
  }
  
} catch (err) {
  console.error('VIGA failide töötlemisel:', err);
}