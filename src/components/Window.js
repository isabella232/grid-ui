import React, { Component } from 'react'
import { Window, TitleBar } from 'react-desktop/windows'
import { Grid } from '../API'

class ConditionalWindow extends Component {
  state = {
    isMaximized: false
  }

  renderWithWindow = children => {
    const { isMaximized } = this.state
    return (
      <Window theme="dark" chrome={false} background>
        <TitleBar
          title="Ethereum Grid"
          controls
          background="rgba(88, 88, 88, 0.33)"
          isMaximized={isMaximized}
          onCloseClick={() => {
            Grid.window.close()
          }}
          onMaximizeClick={() => {
            Grid.window.maximize()
            this.setState({ isMaximized: true })
          }}
          onMinimizeClick={() => {
            Grid.window.minimize()
          }}
          onRestoreDownClick={() => {
            Grid.window.unmaximize()
            this.setState({ isMaximized: false })
          }}
        />
        {children}
      </Window>
    )
  }

  render() {
    const platform = Grid.platform.name
    // eslint-disable-next-line react/prop-types
    const { children } = this.props
    const isWindows = platform === 'win32'
    return isWindows ? this.renderWithWindow(children) : children
  }
}

export default ConditionalWindow
