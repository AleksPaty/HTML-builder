const fs = require('fs/promises');

const copyDir = async () => {
  try {
    const curPath = `${__dirname}/files`;
    const files = await fs.readdir(curPath);

    fs.mkdir(`${__dirname}/files-copy`, { recursive: true })
      .then(async () => {
        files.forEach(async (file) => {
          await fs.copyFile(
            `${curPath}/${file}`,
            `${__dirname}/files-copy/${file}`,
          );
        });
      })
      .catch((err) => {
        throw err;
      });
  } catch (error) {
    console.error(error);
  }
};

copyDir();
