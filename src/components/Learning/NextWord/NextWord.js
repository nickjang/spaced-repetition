import React, { Component } from 'react'
import Guess from '../Guess/Guess';
import PropTypes from 'prop-types';

class NextWord extends Component {
  static defaultProps = {
    nextWord: '',
    wordCorrectCount: 0,
    wordIncorrectCount: 0,
    totalScore: 0,
    updateQuestion: () => { }
  }

  render() {
    return (
      <>
        <h2 className='inline'>Translate the word:</h2>
        <span>{this.props.nextWord}</span>
        <div className='DisplayScore' role='document'>
          <p className='info'>Your total score is: {this.props.totalScore}</p>
        </div>
        <Guess updateQuestion={this.props.updateQuestion} />
        <p className='info'>
          <span className='success break'>
            You have answered this word correctly {this.props.wordCorrectCount} times.
          </span>
          <span className='fail'>
            You have answered this word incorrectly {this.props.wordIncorrectCount} times.
          </span>
        </p>
      </>
    );
  }
}

NextWord.propTypes = {
  nextWord: PropTypes.string.isRequired,
  wordCorrectCount: PropTypes.number.isRequired,
  wordIncorrectCount: PropTypes.number.isRequired,
  totalScore: PropTypes.number.isRequired,
  updateQuestion: PropTypes.func.isRequired
}

export default NextWord