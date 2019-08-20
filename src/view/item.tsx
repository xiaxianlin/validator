import React, { useReducer, useEffect, useContext, useState } from 'react'
import uuid from 'uuid'
import { IVItemProps, IValidState, IAction } from '../interfaces'
import { ValidStatus, Trigger } from '../constants'
import { FormContext } from './form'
import { insertItem, removeItem, modifyItem, valid } from '../core/validator'

function reducer(state: IValidState, action: IAction): IValidState {
    switch (action.type) {
        case 'status':
            return action.data
        default:
            return state
    }
}

const getWrapperClassName = (status: ValidStatus): string => {
    let classNames: Array<string> = ['v-item-wrapper']
    switch (status) {
        case ValidStatus.FAILURE:
            classNames.push('v-error')
            break
        case ValidStatus.SUCCESS:
            classNames.push('v-success')
            break
        case ValidStatus.PROCESS:
            classNames.push('v-process')
            break
    }
    return classNames.join(' ')
}

const createFnChains = (
    trigger: Trigger,
    props: IVItemProps,
    setTrigger: React.Dispatch<React.SetStateAction<Trigger>>
) => {
    return (...args: any[]) => {
        setTrigger(trigger)
        let callback = props[trigger]
        if (callback) {
            callback.call(null, ...args)
        }
    }
}

export const VItem: React.FC<IVItemProps> = props => {
    let [id] = useState(uuid.v4())
    let [trigger, setTrigger] = useState(Trigger.CHANGE)
    let [state, dispatch] = useReducer(reducer, { status: ValidStatus.NONE, message: '' })
    let formId = useContext(FormContext)

    let child = React.Children.only(props.children)
    let status = props.status || state.status
    let message = props.message || state.message

    id = props.id || id
    // 当id和rule变化的时候需要更新数据
    useEffect(() => {
        if (!props.rule) {
            return
        }
        insertItem(id, formId, props.rule, props.value, dispatch)
        return () => removeItem(id, formId)
    }, [id, props.rule])
    // 值变化时修改验证元素的数据
    useEffect(() => {
        if (props.rule) {
            modifyItem(id, formId, props.value)
        }
    }, [props.value])
    // 值变化或者被触发就执行验证
    useEffect(() => {
        valid(id, formId, trigger)
    }, [trigger, props.value])

    return (
        <div className={getWrapperClassName(status)}>
            <div className="v-item">
                {React.cloneElement(child as React.ReactElement<any>, {
                    value: props.value,
                    onBlur: createFnChains(Trigger.BLUR, props, setTrigger),
                    onFocus: createFnChains(Trigger.FOCUS, props, setTrigger),
                    onChange: createFnChains(Trigger.CHANGE, props, setTrigger)
                })}
            </div>
            {status === ValidStatus.FAILURE ? <p className="v-message">{message}</p> : null}
        </div>
    )
}

export default VItem
