const fs = require('fs')
var glob = require("glob")
var JavaScriptObfuscator = require('javascript-obfuscator');

glob("./dist/assets/index.*.js", function (er, files) {
    for (let file of files) {
        console.log(file)
        let content = fs.readFileSync(file).toString()
        let result = JavaScriptObfuscator.obfuscate(content, {
            rotateStringArray: true,
            controlFlowFlattening: true,
            numbersToExpressions: true,
            splitStrings: true,
            selfDefending: true,
            deadCodeInjection: true,
            deadCodeInjectionThreshold: 0.5,
            stringArray: true,
            stringArrayEncoding: true,
            stringArrayThreshold: 0.75,
            simplify: true,
            target: 'browser',
            transformObjectKeys: true,
            unicodeEscapeSequence: false,
            stringArrayEncoding: ["base64"]
        })
        fs.writeFileSync(file, result.getObfuscatedCode())
    }
    console.log('finished')
})