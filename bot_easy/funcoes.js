// projectFiles.test.js
const fs = require('fs-extra');
const path = require('path');

test('verifica se os arquivos e diretórios necessários existem', () => {
  // Verifica se o arquivo index.js existe
  expect(fs.existsSync(path.resolve(__dirname, '..', 'index.js'))).toBe(true);

  // Verifica se o arquivo package.json existe
  expect(fs.existsSync(path.resolve(__dirname, '..', 'package.json'))).toBe(true);

  // Verifica se o diretório public existe
  expect(fs.existsSync(path.resolve(__dirname, '..', 'public'))).toBe(true);
});
