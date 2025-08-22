import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Map of lucide-react icons to react-icons/fi equivalents
const iconMap = {
  'ArrowLeft': 'FiArrowLeft',
  'Calendar': 'FiCalendar', 
  'Check': 'FiCheck',
  'CheckCircle': 'FiCheckCircle',
  'Clock': 'FiClock',
  'DollarSign': 'FiDollarSign',
  'Edit': 'FiEdit',
  'Eye': 'FiEye',
  'FileText': 'FiFileText',
  'Filter': 'FiFilter',
  'Github': 'FiGithub',
  'Grid': 'FiGrid',
  'Heart': 'FiHeart',
  'Home': 'FiHome',
  'Image': 'FiImage',
  'List': 'FiList',
  'Loader': 'FiLoader',
  'LogOut': 'FiLogOut',
  'Mail': 'FiMail',
  'MapPin': 'FiMapPin',
  'Package': 'FiPackage',
  'Plus': 'FiPlus',
  'Save': 'FiSave',
  'Search': 'FiSearch',
  'ShoppingCart': 'FiShoppingCart',
  'Star': 'FiStar',
  'Trash2': 'FiTrash2',
  'User': 'FiUser',
  'Users': 'FiUsers',
  'X': 'FiX',
  'XCircle': 'FiXCircle'
};

// Files to update
const filesToUpdate = [
  'src/components/Footer.tsx',
  'src/components/LoadingSpinner.tsx', 
  'src/components/Messages.tsx',
  'src/pages/CreateProductPage.tsx',
  'src/pages/EditProductPage.tsx',
  'src/pages/HomePage.tsx',
  'src/pages/LoginPage.tsx',
  'src/pages/MyProductsPage.tsx',
  'src/pages/ProductDetailPage.tsx',
  'src/pages/ProductsPage.tsx',
  'src/pages/RegisterPage.tsx'
];

filesToUpdate.forEach(file => {
  const filePath = path.join(__dirname, file);
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace import statement
    content = content.replace(
      /import\s*{\s*([^}]+)\s*}\s*from\s*['"]lucide-react['"];?/g,
      (match, icons) => {
        const iconList = icons.split(',').map(icon => {
          const cleanIcon = icon.trim();
          return iconMap[cleanIcon] || cleanIcon;
        });
        return `import { ${iconList.join(', ')} } from 'react-icons/fi';`;
      }
    );
    
    // Replace individual icon usages
    Object.keys(iconMap).forEach(oldIcon => {
      const newIcon = iconMap[oldIcon];
      const regex = new RegExp(`<${oldIcon}([^>]*)>`, 'g');
      content = content.replace(regex, `<${newIcon}$1>`);
      
      const selfClosingRegex = new RegExp(`<${oldIcon}([^>]*)\/>`, 'g');
      content = content.replace(selfClosingRegex, `<${newIcon}$1/>`);
    });
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Updated ${file}`);
  } else {
    console.log(`❌ File not found: ${file}`);
  }
});

console.log('🎉 Icon migration complete!');
