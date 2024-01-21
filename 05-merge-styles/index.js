const fs = require('fs/promises');
const { createReadStream } = require('fs');
const { extname } = require('path');

const mergeStyle = async () => {
  const bundlePath = `${__dirname}/project-dist/bundle.css`;
  const stylePath = `${__dirname}/styles`;
  await fs.appendFile(bundlePath, '');

  const files = await fs.readdir(`${__dirname}/styles`, {
    withFileTypes: true,
  });
  files.forEach(async (file) => {
    if (file.isFile() && extname(file.name) === '.css') {
      const readFile = createReadStream(`${stylePath}/${file.name}`);
      fs.writeFile(bundlePath, readFile, { flag: 'a' });
    }
  });
};

mergeStyle();
