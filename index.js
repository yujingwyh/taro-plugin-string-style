const fs = require('fs')
const path = require('path')

const content = `
  if (config) {
    if (config.style === '') {
      config.style = {}
    }
    if(typeof config.style === 'string'){
      const rules = config.style.split(';')
      config.style = {};
    
      rules.forEach(item=>{
        const ruleArr = item.split(':').map(item=>item.trim());
        const ruleName = ruleArr[0].replace(/-\\w/g,word=>{
          word.substring(1,2).toLocaleUpperCase()
        })
    
        config.style[ruleName] = ruleArr[1]
      })
    }
  }
`

module.exports = (ctx) => {
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


        // 处理focus
        const componentContent = `
            try{
                node[name] = newProps[name];
            }
            catch (e) {

            }
        `
        const reactComponentPath = path.resolve(__dirname, '../@tarojs/components/lib/react/react-component-lib/utils/attachProps.js')
        const reactComponentContent = fs.readFileSync(reactComponentPath, 'utf8')

        if (reactComponentContent.indexOf(componentContent) === -1) {
            const keyword = 'node[name] = newProps[name];';
            fs.writeFileSync(reactComponentPath, reactComponentContent.replace(
                keyword, componentContent
            ), 'utf8')
        }

    })
}
