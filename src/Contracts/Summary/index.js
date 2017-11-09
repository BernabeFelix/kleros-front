import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
// import FontAwesome from 'react-fontawesome'
import { contractRaiseDispute, contractFetchData } from '../../business/contract/action-creators'
import Banner from '../../Banner'
import './Summary.css'

class SummaryContract extends Component {
  componentDidMount () {
    this.props.getContract(this.props.contract.address)
  }

  raiseDispute = e => this.props.raiseDisputeContract(this.props.contract)

  render () {
    const {contract} = this.props

    if (contract.hasErrored) {
      return <p>Sorry! There was an error loading the contract</p>
    }

    if (contract.isFetching) {
      return <p>Loading…</p>
    }

    // TODO get address by the kleros store => Address: {contract.address}<br />
    return (
      <div className={`SummaryContract-container`}>
        <Banner title='Contract summary' linkTo='/contracts' />
        <div className='divider' />
        <div className='content'>
          <div className='summary'>
            Address: {contract.address}<br />
            Arbitrator: {contract.data.arbitrator}<br />
            Timeout: {contract.data.timeout}<br />
            PartyA: {contract.data.partyA}<br />
            PartyB: {contract.data.partyB}
          </div>
          <button onClick={this.raiseDispute} type='submit' className='submit'>
            Create dispute
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    contract: state.contract,
    hasErrored: state.contract.failureContract,
    isFetching: state.contract.requestContract
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getContract: contractAddress =>
      dispatch(contractFetchData(contractAddress)),
    raiseDisputeContract: (contract, arbitrationCost) =>
      dispatch(contractRaiseDispute(contract, arbitrationCost))
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SummaryContract)
)
