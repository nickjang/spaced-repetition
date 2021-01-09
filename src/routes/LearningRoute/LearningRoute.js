import React, { Component } from 'react'
import Guess from '../../components/Learning/Guess/Guess';
import LanguageContext from '../../contexts/LanguageContext';

class LearningRoute extends Component {
  static contextType = LanguageContext

  componentDidMount() {
    Promise.all([
      this.context.getLanguageAndWords(),
      this.context.getNextWord()
    ])
  }

  render() {
    const { question } = this.context

    return (
      <section>
        <h2>Translate the word: {question.nextWord}</h2>
        <span className='error'>{this.context.error}</span>
        <Guess />
        <p>
          <span className='success'>You have answered this word correctly {question.wordCorrectCount} times.</span>
          <span className='fail'>You have answered this word incorrectly {question.wordIncorrectCount} times.</span>
          <span>Your total score is: {this.context.language.total_score}</span>
        </p>
      </section>
    );
  }
}

export default LearningRoute
