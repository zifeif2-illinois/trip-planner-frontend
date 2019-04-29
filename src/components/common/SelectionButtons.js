import React, { Component } from 'react'
import {Button} from 'semantic-ui-react'

export default function SelectionButtons(props) {
  return (
    <Button.Group>
      <Button color={props.selectOption1?'teal':''} onClick={props.onToggle}>{props.option1}</Button>
      <Button.Or />
      <Button color={!props.selectOption1?'teal':''} onClick={props.onToggle}>{props.option2}</Button>
    </Button.Group>
  )
}
