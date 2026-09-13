import './style.css'
import { createCounter } from './counter.js'

// Create counter instance
const counter = createCounter()

// Get DOM elements
const countDisplay = document.getElementById('count')
const incrementBtn = document.getElementById('increment')
const decrementBtn = document.getElementById('decrement')
const resetBtn = document.getElementById('reset')

// Update display
function updateDisplay() {
  countDisplay.textContent = counter.getCount()
}

// Event listeners
incrementBtn.addEventListener('click', () => {
  counter.increment()
  updateDisplay()
})

decrementBtn.addEventListener('click', () => {
  counter.decrement()
  updateDisplay()
})

resetBtn.addEventListener('click', () => {
  counter.reset()
  updateDisplay()
})

// Initialize display
updateDisplay()
