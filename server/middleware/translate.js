const {Translate} = require('@google-cloud/translate');
const translate = new Translate();
console.log('hi disini translate g');

module.exports = {

  translate  : async function (req, res, next) {
    let [translations] = await translate.translate("my name is martin  and i live in jakarta with azhar", "de");
    translations = Array.isArray(translations) ? translations : [translations];
    console.log('Translations:');
    translations.forEach((translation, i) => {
      console.log(translation);
      
      // console.log(`${text[i]} => (${target}) ${translation}`);
    });
  }
}

