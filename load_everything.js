const fs = require('fs');
const sketchFolder = 'p5_sketches';

module.exports = () => {
    data = {
        data: []
    };

    fs.readdir(sketchFolder, (err, files) => {
      files.forEach(file => {
          if(file != 'p5_data' && file != 'template') data.data.push(file);
      });
    });

    return data;
};

