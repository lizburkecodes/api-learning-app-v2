import LessonLayout from '../components/LessonLayout'

function WhatIsApi() {
  return (
    <LessonLayout
      title="What Is an API?"
      intro="An API is a way for software systems to communicate. Before diving into technical details, it helps to understand the basic idea and where APIs show up in real life."
    >
      <h3>A simple definition</h3>
      <p>
        API stands for <strong>Application Programming Interface</strong>. In
        practice, an API lets one system ask another system for data or actions.
      </p>
      <p>
        Instead of building everything from scratch, developers use APIs to
        connect apps to services that already exist.
      </p>

      <div className="api-flow">
        <div className="flow-box">Your App</div>
        <div className="flow-arrow">→</div>
        <div className="flow-box">API</div>
        <div className="flow-arrow">→</div>
        <div className="flow-box">Server / Data</div>
      </div>

      <h3>What problem does an API solve?</h3>
      <p>
        APIs allow different systems to work together. Your app can request
        something from another service, and that service sends back the result.
      </p>
      <p>
        This makes it possible to add features like payments, maps, or login
        without building everything yourself.
      </p>

      <h3>Examples you already use</h3>
      <div className="example-grid">
        <article className="example-card">
          <h4>Payments</h4>
          <p>
            Apps send payment data to a payment API and receive a success or
            failure response.
          </p>
        </article>

        <article className="example-card">
          <h4>Login</h4>
          <p>
            “Sign in with Google” works by connecting your app to Google’s API.
          </p>
        </article>

        <article className="example-card">
          <h4>Maps</h4>
          <p>
            Apps request directions, locations, and travel time from mapping
            APIs.
          </p>
        </article>

        <article className="example-card">
          <h4>Weather</h4>
          <p>
            Weather apps request forecast data from a weather API.
          </p>
        </article>
      </div>

      <h3>How an API call works</h3>
      <p>
        Every API interaction follows the same basic pattern:
      </p>

      <div className="request-flow">
        <div className="flow-step">
          <span className="step-num">1</span>
          <p>Client sends a request</p>
        </div>

        <div className="flow-arrow">→</div>

        <div className="flow-step">
          <span className="step-num">2</span>
          <p>Server processes it</p>
        </div>

        <div className="flow-arrow">→</div>

        <div className="flow-step">
          <span className="step-num">3</span>
          <p>Server sends a response</p>
        </div>
      </div>

      <h3>Common API styles</h3>
      <ul>
        <li><strong>REST</strong> — uses standard HTTP methods like GET and POST</li>
        <li><strong>GraphQL</strong> — lets you request exactly the data you need</li>
        <li><strong>Webhooks</strong> — send data to you when something happens</li>
      </ul>

      <h3>The big takeaway</h3>
      <p>
        APIs are the foundation of how modern software systems connect, share
        data, and build on top of each other.
      </p>
    </LessonLayout>
  )
}

export default WhatIsApi