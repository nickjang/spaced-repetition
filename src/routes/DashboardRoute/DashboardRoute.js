import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import LanguageContext from '../../contexts/LanguageContext'
import './DashboardRoute.css'

class DashboardRoute extends Component {
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
      <section className='flex-column al-center'>
        <h2>Studying {this.context.language.name}</h2>
        <span className='error'>{this.context.error}</span>
        <Link to='/learn'>Start practicing</Link>
        <p className='info'>Total correct answers: {this.context.language.total_score}</p>
        <h3>Words to practice</h3>
        <ul className='word-table m-t-0'>
          {words && words.map((word) =>
            <li key={word.id} className='inline'>
              <h4 className='dashboard-word'>{word.original}</h4>
              <p>
                <span className='success break'>correct answer count: {word.correct_count}</span>
                <span className='fail'>incorrect answer count: {word.incorrect_count}</span>
              </p>
            </li>
          )}
        </ul>
      </section>
    );
  }
}

export default DashboardRoute
