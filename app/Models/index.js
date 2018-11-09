import fs from 'fs';
import path from 'path';

const basename = path.basename(__filename);
const Models = {};

fs.readdirSync(__dirname)
  .filter(file => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file)).default;
    Models[model.name] = model;
  });

Object.keys(Models).forEach(modelName => {
  if (Models[modelName].associate) {
    Models[modelName].associate(Models);
  }
});
export default Models;
