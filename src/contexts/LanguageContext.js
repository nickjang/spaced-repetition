import React, { Component } from 'react';
import LanguageApiService from '../services/language-api-service';

const LanguageContext = React.createContext({
  getLanguageAndWords: () => { },
  language: {},
  words: [],
  getFirstWord: () => { },
  finished: {}, // the question that was just answered and evaluated
  updateQuestion: () => { },
  question: {},
  clearFinished: () => { },
  error: null
})

export default LanguageContext

export class LanguageProvider extends Component {
  state = {
    language: {},
    words: [],
    finished: {},
    question: {},
    error: null
  };

  getLanguageAndWords = () => {
    // clear error
    this.setState({ error: null })

    LanguageApiService.getLanguageAndWords()
      .then(({ language, words }) => {
        this.setState({ language, words, error: null })
      })
      .catch(({ error }) => this.setState({ error }))
  }

  getFirstWord = () => {
    // clear error and last finished question
    this.setState({ error: null, finished: {} })

    LanguageApiService.getFirstWord()
      .then((question) => {
        this.setState({
          question,
          error: null
        });
      })
      .catch(({ error }) => this.setState({ error }))
  }

  updateQuestion = (finished, question) => {
    let keys = ['nextWord', 'wordCorrectCount', 'wordIncorrectCount', 'totalScore']
    for (const key of keys)
      if (question[key] == null)
        throw new Error('Server error. Got back invalid values.')
    keys = ['answer', 'isCorrect']
    for (const key of keys)
      if (finished[key] == null)
        throw new Error('Server error. Got back invalid values.')

    // correct and incorrect counts for finished question
    let wordCorrectCount = this.state.question.wordCorrectCount;
    let wordIncorrectCount = this.state.question.wordIncorrectCount;
    wordCorrectCount = finished.isCorrect ? wordCorrectCount + 1 : wordCorrectCount;
    wordIncorrectCount = !finished.isCorrect ? wordIncorrectCount + 1 : wordIncorrectCount;

    finished = {
      ...finished,
      original: this.state.question.nextWord,
      wordCorrectCount,
      wordIncorrectCount,
    }

    this.setState({
      finished,
      question,
      error: null
    })
  }

  clearFinished = () => {
    this.setState({ finished: {} })
  }

  render() {
    const value = {
      getLanguageAndWords: this.getLanguageAndWords,
      language: this.state.language,
      words: this.state.words,
      getFirstWord: this.getFirstWord,
      finished: this.state.finished,
      updateQuestion: this.updateQuestion,
      question: this.state.question,
      clearFinished: this.clearFinished,
      error: this.state.error
    }

    return (
      <LanguageContext.Provider value={value}>
        {this.props.children}
      </LanguageContext.Provider>
    )
  }
}