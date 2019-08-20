import 'bootstrap/dist/css/bootstrap.min.css'
import './index.scss'
import React, { useState } from 'react'
import { render } from 'react-dom'

import { VForm, VItem, VButton, RuleType } from '../../src/'

const rules = [{ id: 'name', test: [{ type: RuleType.REPEAT, message: 'aaa' }] }]
const Demo: React.FC = () => {
    let [user, setUser] = useState({ name: '', email: '' })
    return (
        <div className="App">
            <header>
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <a className="navbar-brand">表单验证器</a>
                </nav>
            </header>
            <div className="container" style={{ padding: '20px 0' }}>
                <VForm rules={rules} getValidator={validator => {}}>
                    <form>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Name</label>
                                <VItem
                                    rule="name"
                                    value={user.name}
                                    onChange={e => setUser(Object.assign({}, user, { name: e.target.value }))}
                                >
                                    <input className="form-control" placeholder="Name" />
                                </VItem>
                            </div>
                            <div className="form-group col-md-6">
                                <label>Email</label>
                                <VItem
                                    rule="name"
                                    value={user.email}
                                    onChange={e => setUser(Object.assign({}, user, { email: e.target.value }))}
                                >
                                    <input className="form-control" placeholder="Email" />
                                </VItem>
                            </div>
                        </div>
                        <VButton>
                            <button type="button" className="btn btn-primary">
                                提交
                            </button>
                        </VButton>
                    </form>
                </VForm>
            </div>
        </div>
    )
}

render(<Demo />, document.querySelector('#demo'))
