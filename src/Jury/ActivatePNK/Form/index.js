import React from 'react'
import { SubmissionError, Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
// import FontAwesome from 'react-fontawesome'
import { activatePinakion } from '../../../business/ethereum/action-creators'
import Input from '../../../Input'
import './Form.css'

const Form = props => {
  const {
    handleSubmit,
    submitting,
    error,
    hasErrored
  } = props

  return (
    <form onSubmit={handleSubmit} className='Form-container'>
      <div className='amount-container'>
        <Field
          name='amount'
          component={Input}
          type='number'
          required
          innerClassName='input-number'
          placeholder='0 PNK' />
      </div>
      { error && <div><strong>{ error }</strong></div> }
      <div className='button-container'>
        <button type='submit' disabled={submitting || error} className='submit'>
          {
            submitting && true
            // <FontAwesome
            //   name='circle-o-notch'
            //   spin
            //   style={{marginRight: '10px'}}
            // />
          }
          Activate
        </button>
      </div>
      { hasErrored && <div>Error contract</div> }
    </form>
  )
}

const FORM_NAME = 'activatePinakion'

const mapStateToProps = state => {
  return {
  }
}

const validate = values => {
  return {}
}

export default withRouter(connect(mapStateToProps, null)(
  reduxForm({
    form: FORM_NAME,
    validate,
    onSubmit (values, dispatch) {
      return dispatch(activatePinakion(values))
        .catch(error => {
          if (error) {
            console.log(error)
            throw new SubmissionError({_error: 'unable to activate pinakion'})
          }
        })
    }
  })(Form)))
