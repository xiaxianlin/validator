import { RuleType, DateFormat } from '../constants'
import { IRuleOptions } from '../interfaces'

const PATTERN_NUMBER = /^[\+\-]?\d*\.?\d+(?:[Ee][\+\-]?\d+)?$/
const PATTERN_EMAIL = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
const PATTERN_DATE_DAY = /^(\d{4})[-\\](\d{2})[-\\](\d{2})$/
const PATTERN_DATE_HOUR = /^(\d{4})[-\\](\d{2})[-\\](\d{2}) (\d{2}):(\d{2}):(\d{2})$/
const PATTERN_DATE_MINUTE = /^(\d{4})[-\\](\d{2})[-\\](\d{2}) (\d{2}):(\d{2}):(\d{2})$/
const PATTERN_DATE_SECOND = /^(\d{4})[-\\](\d{2})[-\\](\d{2}) (\d{2}):(\d{2}):(\d{2})$/

function isNullOrUndefined(target: any): boolean {
    return target === null || typeof target === 'undefined'
}

function isString(target: any): boolean {
    return typeof target === 'string'
}

function isNumber(target: any): boolean {
    return typeof target === 'number'
}

function isArray(target: any): boolean {
    return target instanceof Array
}

function isObject(target: any): boolean {
    return Object.prototype.toString.call(target) === '[object Object]'
}

function isValidDate(target: any): boolean {
    try {
        let date: string = new Date(target).toUTCString()
        return date === 'Invalid Date'
    } catch (e) {
        return true
    }
}

function hasLength(target: any): boolean {
    return isArray(target) || isString(target)
}

function calcRequired(value: any, options?: IRuleOptions): boolean {
    if (isNullOrUndefined(value)) {
        return false
    }
    if (isString(value)) {
        return !!value
    }
    if (isArray(value)) {
        return value.length > 0
    }
    if (isObject(value) && options && options.key) {
        return calcRequired(value[options.key])
    }
    return false
}

function calcRattern(value: any, options: IRuleOptions): boolean {
    if (isString(value) && options.pattern) {
        return options.pattern.test(value)
    }
    return false
}

function calcNumber(value: any): boolean {
    if (isNumber(value)) {
        return true
    }
    return calcRattern(value, { pattern: PATTERN_NUMBER })
}

function calcEmail(value: any): boolean {
    return calcRattern(value, { pattern: PATTERN_EMAIL })
}

function calcDate(value: any, options: IRuleOptions): boolean {
    if (value instanceof Date) {
        return true
    }
    if (options.format) {
        switch (options.format) {
            case DateFormat.DAY:
                return calcRattern(value, { pattern: PATTERN_DATE_DAY })
            case DateFormat.HOUR:
                return calcRattern(value, { pattern: PATTERN_DATE_HOUR })
            case DateFormat.MINUTE:
                return calcRattern(value, { pattern: PATTERN_DATE_MINUTE })
            case DateFormat.SECOND:
                return calcRattern(value, { pattern: PATTERN_DATE_SECOND })
        }
    } else {
        return isValidDate(value)
    }
    return false
}

function calcLength(value: any, options: IRuleOptions): boolean {
    if (hasLength(value) && options.length) {
        return value.length === options.length
    }
    return false
}

function calcRange(value: any, options: IRuleOptions): boolean {
    let target: number = 0,
        canValid: boolean = false
    if (isNumber(value)) {
        target = value
        canValid = true
    } else if (hasLength(value)) {
        target = value.length
        canValid = true
    }
    if (canValid) {
        let { min, max } = options,
            hasMin = isNumber(min),
            hasMax = isNumber(max)
        if (hasMin && hasMax && target >= <number>min && target <= <number>max) {
            return true
        } else if (hasMin && target >= <number>min) {
            return true
        } else if (hasMax && target <= <number>max) {
            return true
        }
    }
    return false
}

function calcRepeat(): boolean {
    return false
}

function calcCallback(value: any, options: IRuleOptions): boolean {
    if (options.callback) {
        return options.callback(value)
    }
    return false
}

export function getCalcuteFn(type: RuleType): Function {
    switch (type) {
        case RuleType.REQUIRED:
            return calcRequired
        case RuleType.NUMBER:
            return calcNumber
        case RuleType.EMAIL:
            return calcEmail
        case RuleType.DATE:
            return calcDate
        case RuleType.LENGTH:
            return calcLength
        case RuleType.RANGE:
            return calcRange
        case RuleType.REPEAT:
            return calcRepeat
        case RuleType.PATTERN:
            return calcRattern
        case RuleType.CALLBACK:
            return calcCallback
        default:
            return (): boolean => false
    }
}
