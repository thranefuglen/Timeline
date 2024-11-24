import React from 'react'
import TimelineComponent from './components/TimelineComponent'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">My Timeline Project</h1>
        <TimelineComponent />
      </div>
    </div>
  )
}

export default App