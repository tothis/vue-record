/**
 * 规则等级分三类
 * off或0 关闭规则
 * warn或1 打开规则 显示警告
 * error或2 打开规则 显示错误 exit code为1
 */
module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
    parserOptions: {
        parser: 'babel-eslint'
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
    }
}
