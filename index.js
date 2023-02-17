const fs = require('fs')
const path = require('path')

const content = `
  if (config) {
    if (config.style === '') {
      config.style = {}
    }
    if(typeof config.style === 'string'){
      config.style = require('style-to-object').default(config.style)
    }
  }
`

module.exports =  (ctx) => {
    ctx.onBuildStart(() => {
        const reactDevelopmentPath = path.resolve(__dirname, '../react/cjs/react.development.js')
        const reactDevelopmentContent = fs.readFileSync(reactDevelopmentPath, 'utf8')
        const reactProductionPath = path.resolve(__dirname, '../react/cjs/react.production.min.js');
        const reactProductionContent = fs.readFileSync(reactProductionPath, 'utf8')

        if (reactDevelopmentContent.indexOf(content) === -1) {
            const keyword = 'createElement(type, config, children) {';
            fs.writeFileSync(reactDevelopmentPath, reactDevelopmentContent.replace(
                keyword, keyword + content
            ), 'utf8')
        }
        if (reactProductionContent.indexOf(content) === -1) {
            const keyword = 'M(a,b,e){';
            fs.writeFileSync(reactProductionPath, reactProductionContent.replace(
                keyword, keyword + 'var config = b;' + content
            ), 'utf8')
        }

    })
}
