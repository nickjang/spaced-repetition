import React, { Component } from 'react';
import LanguageApiService from '../services/language-api-service';

const LanguageContext = React.createContext({
  getLanguageAndWords: () => { },
  language: {},
  words: [],
  getNextWord: () => { },
  question: {},
  error: null
})

export default LanguageContext

export class LanguageProvider extends Component {
  state = {
    language: {},
    words: [],
    question: {},
    error: null
  };

  getLanguageAndWords = () => {
    // clear error
    this.setState({ error: null })
    // return if already fetched language and words
    if (this.state.language.id != null) return

    LanguageApiService.getLanguageAndWords()
      .then(({ language, words }) => {
        this.setState({ language, words, error: null })
      })
      .catch(({ error }) => this.setState({ error }))
  }

  getNextWord = () => {
    // clear error
    this.setState({ error: null })

    LanguageApiService.getNextWord()
      .then(({ totalScore, ...question }) => {
        this.setState({
          question,
          language: {
            ...this.state.language,
            total_score: totalScore
          },
          error: null
        });
      })
      .catch(({ error }) => this.setState({ error }))
  }

  render() {
    const value = {
      getLanguageAndWords: this.getLanguageAndWords,
      language: this.state.language,
      words: this.state.words,
      getNextWord: this.getNextWord,
      question: this.state.question,
      error: this.state.error
    }

    return (
      <LanguageContext.Provider value={value}>
        {this.props.children}
      </LanguageContext.Provider>
    )
  }
}