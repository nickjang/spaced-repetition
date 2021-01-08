import React, { Component } from 'react';
import LanguageApiService from '../services/language-api-service';

const LanguageContext = React.createContext({
  language: {}
})

export default LanguageContext

export class LanguageProvider extends Component {
  state = {
    language: {},
    words: [],
    error: null
  };

  getLanguageAndWords = () => {
    LanguageApiService.getLanguageAndWords()
      .then(({ language, words }) => {
        this.setState({ language, words, error: null });
      })
      .catch(({ error }) => this.setState({ error }))
  }

  getTotalScore = () => {
    return this.state.words.reduce((total, word) => total + word.correct_count, 0);
  }

  

  render() {
    const value = {
      getLanguageAndWords: this.getLanguageAndWords,
      language: this.state.language,
      words: this.state.words,
      getTotalScore: this.getTotalScore,
      error: this.state.error
    }

    return (
      <LanguageContext.Provider value={value}>
        {this.props.children}
      </LanguageContext.Provider>
    )
  }
}