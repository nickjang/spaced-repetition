import React, { Component } from 'react'
import NextWord from '../../components/Learning/NextWord/NextWord';
import Feedback from '../../components/Learning/Feedback/Feedback';
import LanguageContext from '../../contexts/LanguageContext';

class LearningRoute extends Component {
  static contextType = LanguageContext

  componentDidMount() {
    this.context.getFirstWord()
  }

  render() {
    const { finished, question, clearFinished, updateQuestion, error } = this.context;
    let page;
    console.log('learning', finished);
    if (finished && finished.isCorrect != null) {
      page = (
        <Feedback
          isCorrect={finished.isCorrect}
          original={finished.original}
          guess={finished.guess}
          answer={finished.answer}
          wordCorrectCount={finished.wordCorrectCount}
          wordIncorrectCount={finished.wordIncorrectCount}
          totalScore={question.totalScore}
          clearFinished={clearFinished}
        />
      )
    } else {
      page = (
        <NextWord
          nextWord={question.nextWord}
          wordCorrectCount={question.wordCorrectCount}
          wordIncorrectCount={question.wordIncorrectCount}
          totalScore={question.totalScore}
          updateQuestion={updateQuestion}
          error={error}
        />
      )
    }

    return (
      <>
        <span className='error'>{this.context.error}</span>
        <section className='flex-column al-center'>
          {page}
        </section>
      </>
    )
  }
}

export default LearningRoute
