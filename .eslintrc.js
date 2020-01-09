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
    extends: ["plugin:vue/essential", "@vue/prettier", "@vue/typescript"],
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
        // 语句强制分号结尾
        semi: 0,
        // 空行最多不能超过2行
        'no-multiple-empty-lines': [1, {max: 2}],
        // 关闭禁止混用tab和空格
        'no-mixed-spaces-and-tabs': [0]
    },
    parserOptions: {
        parser: "@typescript-eslint/parser"
    },
    overrides: [
        {
            files: [
                "**/__tests__/*.{j,t}s?(x)",
                "**/tests/unit/**/*.spec.{j,t}s?(x)"
            ],
            env: {
                jest: true
            }
        }
    ]
};
