import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Input, Label } from '../../Form/Form'
import Button from '../../Button/Button'
import LanguageApiService from '../../../services/language-api-service'

class Guess extends Component {
  static defaultProps = {
    updateQuestion: () => { }
  }

  state = { error: null }

  inputRef = React.createRef()

  handleSubmit = (e) => {
    e.preventDefault()
    const { guess } = e.target

    this.setState({ error: null })
    LanguageApiService.guessAndReturnNext(guess.value)
      .then(({ answer, isCorrect, ...question }) => {
        const finished = { answer, isCorrect, guess: guess.value };
        guess.value = ''
        this.props.updateQuestion(finished, question)
      })
      .catch(({ error }) => this.setState({ error }))
  }

  componentDidMount() {
    this.inputRef.current.focus()
  }

  render() {
    const { error } = this.state
    return (
      <form
        className='Guess'
        onSubmit={this.handleSubmit}
      >
        <Label htmlFor='learn-guess-input'>
          What's the translation for this word?
        </Label>
        <div className='m-t-1'>
          <Input
            className='inline'
            ref={this.inputRef}
            id='learn-guess-input'
            name='guess'
            required
          />
          <Button type='submit'>
            Submit your answer
          </Button>
          <div role='alert' className='break'>
            {error && <p>{error}</p>}
          </div>
        </div>
      </form>
    )
  }
}

Guess.propTypes = {
  updateQuestion: PropTypes.func.isRequired
}

export default Guess
