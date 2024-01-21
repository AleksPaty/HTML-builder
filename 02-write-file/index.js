const fs = require('fs/promises');
const { createWriteStream } = require('fs');
const readline = require('node:readline/promises');

const writeFile = async () => {
  try {
    const fileDir = `${__dirname}/text.txt`;

    await fs.appendFile(fileDir, '').catch((err) => {
      throw err;
    });
    const writeStream = await createWriteStream(fileDir);

    console.log('> Enter text!:');

    const rLine = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rLine.on('line', (line) => {
      if (line === 'exit') {
        rLine.write('> Buy!');
        rLine.close();
      }
      writeStream.write(line + ' ');
    });

    rLine.on('SIGINT', () => {
      rLine.write('> Buy!');
      rLine.close();
    });
  } catch (error) {
    console.error(error);
  }
};

writeFile();
