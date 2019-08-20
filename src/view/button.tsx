import React, { useContext } from 'react'
import { IVButtonProps } from '../interfaces'
import { FormContext } from './form'
import { validAll } from '../core/validator'

export const VButton: React.FunctionComponent<IVButtonProps> = ({ children, onSubmit }) => {
    let formId = useContext(FormContext)
    let child = React.Children.only(children) as React.ReactElement<any>
    return React.cloneElement(child, {
        onClick: (e: any) => {
            child.props.onClick && child.props.onClick(e)
            let [error, result] = validAll(formId)
            onSubmit && onSubmit(error, result)
        }
    })
}

export default VButton
