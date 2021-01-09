import React, { Component } from 'react'
import { Input, Label } from '../../Form/Form'
import Button from '../../Button/Button'
import LanguageApiService from '../../../services/language-api-service'

class Guess extends Component {
  state = { error: null }

  inputRef = React.createRef()

  handleSubmit = (e) => {
    e.preventDefault()
    const guess = e.target.value

    this.setState({ error: null })

    LanguageApiService.submitGuess(guess)
      // .then(res => {
      //   this.context
      //   this.props
      // })
      .catch(({ error }) => this.setState({ error }))
  }

  componentDidMount() {
    this.inputRef.current.focus()
  }

  render() {
    const { error } = this.state
    return (
      <form
        className='guess-form'
        onSubmit={this.handleSubmit}
      >
        <div role='error'>
          {error && <p>{error}</p>}
        </div>
        <div>
          <Label htmlFor='learn-guess-input'>
            What's the translation for this word?
          </Label>
          <Input
            ref={this.inputRef}
            id='learn-guess-input'
            name='guess'
            required
          />
        </div>
        <Button type='submit'>
          Submit your answer
        </Button>
      </form>
    )
  }
}

export default Guess
