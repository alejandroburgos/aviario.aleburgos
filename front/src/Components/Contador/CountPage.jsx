import React from 'react'
import { FormCount } from './FormCount'
import { ResumeChart } from './ResumeChart'

export const CountPage = (props) => {
    console.log(props)
  return (
    <div>
        <FormCount user={props.state.user}/>
        <ResumeChart user={props.state.user}/>
    </div>
  )
}
