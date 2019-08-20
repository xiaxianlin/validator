import { RuleType, DateFormat, Trigger, ValidStatus, ActionType } from './constants'
/**
 * 规则
 */
export interface IRule {
    // 规则关键字
    id: string
    // 规则测试
    test: Array<IRuleTest>
    // 触发点
    trigger?: Array<Trigger>
}

export interface IRuleTest {
    // 规则类型
    type: RuleType
    // 验证信息
    message: string
    // 规则选项
    options?: IRuleOptions
}
/**
 * 规则选项
 */
export interface IRuleOptions {
    key?: string
    min?: number
    max?: number
    length?: number
    format?: DateFormat
    pattern?: RegExp
    callback?: (value: any) => boolean
}
/**
 * 表单参数
 */
export interface IVFormProps {
    id?: string
    rules?: Array<IRule>
    getValidator?: (validator: (itemId?: string) => void) => void
}
/**
 * 验证元素参数
 */
export interface IVItemProps {
    id?: string
    rule: string
    value: any
    status?: ValidStatus
    message?: string
    onChange: (...args: any[]) => void
    onBlur?: (...args: any) => void
    onFocus?: (...args: any) => void
}
/**
 * 验证按钮参数
 */
export interface IVButtonProps {
    onSubmit?: (error: boolean, result: Array<any>) => void
}
/**
 * 验证状态
 */
export interface IValidState {
    status: ValidStatus
    message: string
}
/**
 * 派发动作
 */
export interface IAction {
    type: ActionType | string
    data?: any
}

export interface IItem {
    id: string
    rule: string
    value: any
    status: ValidStatus
    message: string
    dispatch: React.Dispatch<IAction>
}
