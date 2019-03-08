import React from 'react'
import PropTypes from 'prop-types'
import { List} from 'semantic-ui-react'
import '../../style/TagListLabel.scss'

export default function TagList(props) {
  return (
    <div className='taglist-container'>
      <span className='taglist-label'><b>{props.label}</b></span>
      <List horizontal floated='right'>
        {props.content.length? props.content.map(content => <List.Item key={content} content={content}/>):<div/>}
      </List>
    </div>
  )
}

TagList.propTypes = {
  label: PropTypes.string,
  content: PropTypes.arrayOf(PropTypes.string)
}
