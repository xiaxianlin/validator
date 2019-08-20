import { IRule, IItem, IAction } from '../interfaces'
import { Trigger, ValidStatus, RuleType } from '../constants'

// 规则数据集
let rules: Map<String, Array<IRule>> = new Map()
// 验证元素数据集
let items: Map<String, Array<IItem>> = new Map()

// 查询规则
function queryRule(id: string, formId: string): IRule | undefined {
    let data: Array<IRule> = rules.get(formId) || []
    let rule: IRule | undefined = data.find(r => r.id === id)
    return rule
}

// 添加规则
export function addRules(id: string, data: Array<IRule> = []): void {
    data = data.map(item => {
        item.trigger = item.trigger || [Trigger.CHANGE, Trigger.BLUR]
        return item
    })
    rules.set(id, data)
}

// 清除规则
export function cleanRules(id: string): void {
    console.log('clean rules', id)
    rules.delete(id)
    items.delete(id)
}

// 创建表单验证器，供外部使用
export function craeteFormValidator(formId: string): (itemId?: string) => void {
    return (itemId?: string): void => {}
}

// 插入验证元素
export function insertItem(id: string, formId: string, value: any, rule: RuleType, dispatch: React.Dispatch<IAction>) {
    if (!formId) {
        console.error('验证元素需要放在<VForm>里面')
        return
    }
    let data: Array<IItem> = items.get(formId) || []
    data.push({ id, rule, value, dispatch, message: '', status: ValidStatus.NONE })
    items.set(formId, data)
}

// 移出验证元素
export function removeItem(id: string, formId: string) {
    if (!formId) {
        return
    }
    let data: Array<IItem> = items.get(formId) || []
    data = data.filter(i => i.id !== id)
    items.set(formId, data)
}

// 修改验证元素
export function modifyItem(id: string, formId: string, value: any) {
    if (!formId) {
        return
    }
    let item = queryItem(id, formId)
    if (item) {
        item.value = value
    }
}

// 查询验证元素
export function queryItem(id: string, formId: string): IItem | undefined {
    let data: Array<IItem> = items.get(formId) || []
    let item: IItem | undefined = data.find(i => i.id === id)
    return item
}

// 单个验证
export function valid(id: string, formId: string, trigger: Trigger): void {
    let item: IItem | undefined = queryItem(id, formId)
    // 找不到验证元素
    if (!item) {
        return
    }
    let rule: IRule | undefined = queryRule(item.rule, formId)
    // 找不到验证规则
    if (!rule) {
        return
    }
    // 没在设置的触发动作内
    if (!rule.trigger!.includes(trigger)) {
        return
    }
}

// 验证所有
export function validAll(formId: string): Array<any> {
    return [false, []]
}
