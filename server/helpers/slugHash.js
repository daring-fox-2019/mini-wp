const bcryptjs = require('bcryptjs')
module.exports = function(title) {
    let slug = title.toString().trim().toLowerCase()
                    .replace(/\s+/g, "-")
                    .replace(/[^\w\-]+/g, "")
                    .replace(/\-\-+/g, "-")
                    .replace(/^-+/, "")
                    .replace(/-+$/, "");

    //to produce this-is-the-article-title-xxxxx -> hash from the title
    let hash = bcryptjs.hashSync(slug, 7).substring(0,10)
    return `${slug}-${hash}`
}