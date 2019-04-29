import React from 'react'
import {Input} from 'semantic-ui-react'


export default function SearchInput(props){
  return <Input
  onChange={props.onChange}
  placeholder={props.placeholder||'search...'}
  value={props.value}
  action={{ color: 'teal', icon: 'search' }}
  />
}
