const { createReadStream } = require('fs');

const readFile = async () => {
  try {
    const pathFile = `${__dirname}/text.txt`;
    const readableStream = await createReadStream(pathFile);

    readableStream.pipe(process.stdout);
  } catch (error) {
    console.error(error);
  }
};

readFile();
