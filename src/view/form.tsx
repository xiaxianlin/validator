import React, { useEffect, useState, createContext } from 'react'
import uuid from 'uuid'
import { IVFormProps } from '../interfaces'
import { addRules, cleanRules, craeteFormValidator } from '../core/validator'

export const FormContext: React.Context<string> = createContext('')

export const VForm: React.FC<IVFormProps> = ({ rules = [], getValidator = () => {}, children }) => {
    let [id] = useState(uuid.v4())
    // 处理规则
    useEffect(() => {
        addRules(id, rules)
        getValidator(craeteFormValidator(id))
        return () => cleanRules(id)
    }, [])
    return <FormContext.Provider value={id}>{children}</FormContext.Provider>
}

export default VForm
