const {Translate} = require('@google-cloud/translate');
const translate = new Translate();
console.log('hi disini translate g');

module.exports = {

  translate  : async function (req, res, next) {
    console.log(req);
    
    let [translations] = await translate.translate([req.body.content, req.body.title], req.body.language);
    translations = Array.isArray(translations) ? translations : [translations];

    console.log(translations);
    
    console.log('Translations:');
    translations.forEach((translation, i) => {
      console.log(translation);
      
      // console.log(`${text[i]} => (${target}) ${translation}`);
    });
    res.status(200).json(translations)
  }
}

