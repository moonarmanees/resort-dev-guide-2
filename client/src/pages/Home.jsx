import React from 'react'
import Header from '../components/Header'
import CardList from '../components/CardList'

export default function Home() {
  const items = [
    { title: 'Card One', text: 'This is card number one.' },
    { title: 'Card Two', text: 'This is card number two.' },
    { title: 'Card Three', text: 'This is card number three.' }
  ]
  return (
    <div>
      <Header title="Welcome to Home" />
      <CardList items={items} />
    </div>
  )
}