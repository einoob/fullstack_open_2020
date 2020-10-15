import React from 'react'

const Filterform = (props) => {
  return (
    <form>
    <div>
      filter shown with <input value={props.value}
      onChange={props.onChange} />
    </div>
  </form>
  )
}

export default Filterform