import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Button from '../../Button/Button';

class Feedback extends Component {
  static defaultProps = {
    isCorrect: false,
    original: '',
    guess: '',
    answer: '',
    wordCorrectCount: 0,
    wordIncorrectCount: 0,
    totalScore: 0,
    clearFinished: () => { }
  }

  handleNext = (e) => {
    e.preventDefault();
    this.props.clearFinished();
  }

  render() {
    return (
      <>
        <h2>{this.props.isCorrect ? 'You were correct! :D' : 'Good try, but not quite right :('}</h2>
        <div className='DisplayScore' role='document'>
          <p>Your total score is: {this.props.totalScore}</p>
        </div>
        <div className='DisplayFeedback' role='document'>
          <p>
            The correct translation for {this.props.original} was {this.props.answer} and you chose {this.props.guess}!
          </p>
        </div>
        <p>
          <span className='success'>
            You have answered this word correctly {this.props.wordCorrectCount} times.
          </span>
          <span className='fail'>
            You have answered this word incorrectly {this.props.wordIncorrectCount} times.
          </span>
        </p>
        <Button type='submit' onClick={this.handleNext}>
          Try another word!
        </Button>
      </>
    );
  }
}

Feedback.propTypes = {
  isCorrect: PropTypes.bool.isRequired,
  original: PropTypes.string.isRequired,
  guess: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  wordCorrectCount: PropTypes.number.isRequired,
  wordIncorrectCount: PropTypes.number.isRequired,
  totalScore: PropTypes.number.isRequired,
  clearFinished: PropTypes.func.isRequired
}

export default Feedback