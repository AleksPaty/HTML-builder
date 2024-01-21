const fs = require('fs/promises');
const { basename, extname } = require('path');

const readFolder = async () => {
  try {
    const checkedPath = `${__dirname}/secret-folder`;
    const allFile = await fs.readdir(checkedPath, { withFileTypes: true });

    allFile.forEach(async (file) => {
      if (file.isFile()) {
        const fileName = basename(file.name, extname(file.name));
        const fileExtension = extname(file.name);
        const fileSize = await fs.stat(`${checkedPath}/${file.name}`);

        console.log(
          `${fileName} - ${fileExtension.slice(1)} - ${fileSize.size / 1000}kb`,
        );
      }
    });
  } catch (error) {
    console.error(error);
  }
};

readFolder();
