import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.import { connect } from 'react-redux'
import React, { Component } from 'react'

type Props = {}

type State = {}

export class main extends Component<Props, State> {
  state = {}

  render() {
    return (
      <div>main</div>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(main)'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
