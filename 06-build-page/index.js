const fs = require('fs/promises');

const mergeStyle = async (bundlPuth, stylePath) => {
  await fs.appendFile(bundlPuth, '');

  const files = await fs.readdir(stylePath, { withFileTypes: true });
  files.forEach(async (file) => {
    if (file.isFile() && file.name.includes('.css')) {
      const data = await fs.readFile(`${stylePath}/${file.name}`, {
        encoding: 'utf8',
      });
      await fs.writeFile(bundlPuth, data, { flag: 'a' });
    }
  });
};
const copyDir = async (curPath, newPath) => {
  try {
    const files = await fs.readdir(curPath, { withFileTypes: true });

    fs.mkdir(newPath, { recursive: true })
      .then(async () => {
        files.forEach(async (file) => {
          if (file.isFile()) {
            console.log('file', file.name);
            await fs.copyFile(
              `${curPath}/${file.name}`,
              `${newPath}/${file.name}`,
            );
          } else {
            console.log('no-file', file.name);
            await copyDir(`${curPath}/${file.name}`, `${newPath}/${file.name}`);
          }
        });
      })
      .catch((err) => {
        throw err;
      });
  } catch (error) {
    console.error(error);
  }
};

const buildPage = async () => {
  try {
    const projectFold = `${__dirname}/project-dist`;
    await fs.mkdir(projectFold);

    const templData = await fs.readFile(`${__dirname}/template.html`, {
      encoding: 'utf8',
    });
    const components = await fs.readdir(`${__dirname}/components`);
    let changeData = templData;

    for (let i = 0; i < components.length; i++) {
      let start = changeData.indexOf('{') + 2;
      let end = changeData.indexOf('}');
      let compName = changeData.slice(start, end);

      let componentData = await fs.readFile(
        `${__dirname}/components/${compName}.html`,
        'utf8',
      );

      changeData = changeData.replace(`{{${compName}}}`, componentData);
      console.log(`{{${compName}}}`);
    }

    fs.writeFile(`${projectFold}/index.html`, changeData);
    mergeStyle(`${projectFold}/style.css`, `${__dirname}/styles`);
    copyDir(`${__dirname}/assets`, `${projectFold}/assets`);
  } catch (error) {
    console.error(error);
  }
};

buildPage();
