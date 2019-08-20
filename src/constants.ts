export enum RuleType {
    // 非空
    REQUIRED = 'required',
    // 数字
    NUMBER = 'number',
    // 邮箱
    EMAIL = 'email',
    // 日期
    DATE = 'date',
    // 长度
    LENGTH = 'length',
    // 范围
    RANGE = 'range',
    // 重复
    REPEAT = 'repeat',
    // 正则
    PATTERN = 'pattern',
    // 回调
    CALLBACK = 'callback'
}

export enum DateFormat {
    DAY = 'yyyy-MM-dd',
    HOUR = 'yyyy-MM-dd hh',
    MINUTE = 'yyyy-MM-dd hh:mm',
    SECOND = 'yyyy-MM-dd hh:mm:ss'
}

export enum Trigger {
    CHANGE = 'onChange',
    FOCUS = 'onFocus',
    BLUR = 'onBlur'
}

export enum ValidStatus {
    NONE = 0,
    PROCESS = 1,
    SUCCESS = 2,
    FAILURE = -1
}

export enum ActionType {}
