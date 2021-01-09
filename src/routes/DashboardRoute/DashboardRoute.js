import React, { Component } from 'react'
import LanguageContext from '../../contexts/LanguageContext';

class DashboardRoute extends Component {
  state = {
    // words: [
    //   {
    //     'id': 1,
    //     'language_id': 1,
    //     'original': 'entraine toi',
    //     'translation': 'practice',
    //     'next': 2,
    //     'memory_value': 0.5,
    //     'correct_count': 1,
    //     'incorrect_count': 1
    //   }
    // ]
  }

  static contextType = LanguageContext

  handleStart = (e) => {
    e.preventDefault();
    this.props.history.push('/learn')
  }

  componentDidMount() {
    this.context.getLanguageAndWords()
  }

  render() {
    const { words } = this.context

    return (
      <section>
        <h2>Studying {this.context.language.name}</h2>
        <span className='error'>{this.context.error}</span>
        <button onClick={this.handleStart}>Start practicing</button>
        <p>Total score: {this.context.language.total_score}</p>
        <h3>Words to practice:</h3>
        {words && words.map((word) =>
          <p key={word.id}>
            <span>{word.original}</span>
            <span className='success'>correct answer count: {word.correct_count}</span>
            <span className='fail'>incorrect answer count: {word.incorrect_count}</span>
          </p>
        )}
      </section>
    );
  }
}

export default DashboardRoute
