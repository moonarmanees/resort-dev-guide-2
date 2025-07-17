import React from 'react'
import Header from '../components/Header'

export default function Home() {
  // sample data
  const items = [
    { title: 'Card One', text: 'This is card number one.' },
    { title: 'Card Two', text: 'This is card number two.' },
    { title: 'Card Three', text: 'This is card number three.' }
  ]

  return (
    <div>
      <Header title="Welcome to Home" />

      <div className="row">
        {items.map((item, i) => (
          <div key={i} className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">{item.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
