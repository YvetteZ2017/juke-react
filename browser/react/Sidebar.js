import React from 'react'

export default class Sidebar extends React.Component {
  render () {
  return ( 
    <sidebar>
      <img src="juke.svg" className="logo" />
      <section>
        <h4 className="menu-item active">
          <a href="#" onClick={this.props.deselect}>ALBUMS</a>
        </h4>
      </section>
    </sidebar>
  )
}
}

