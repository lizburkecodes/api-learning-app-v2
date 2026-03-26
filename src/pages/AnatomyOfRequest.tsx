import { useState } from 'react'
import LessonLayout from '../components/LessonLayout'

function AnatomyOfRequest() {
  const [method, setMethod] = useState('GET')

  const requestExamples: Record<string, string> = {
    GET: `GET /users?role=admin
Authorization: Bearer token_here`,
    POST: `POST /users
Content-Type: application/json
Authorization: Bearer token_here

{
  "name": "mock wahlberg",
  "email": "mock.wahlberg@example.com"
}`,
    PUT: `PUT /users/42
Content-Type: application/json
Authorization: Bearer token_here

{
  "name": "mock wahlberg",
  "email": "updated@example.com"
}`,
    DELETE: `DELETE /users/42
Authorization: Bearer token_here`,
  }

  return (
    <LessonLayout
      title="Anatomy of a Request"
      intro="An API request is a structured message sent from a client to a server. It includes the method, URL, parameters, headers, and optionally a body."
    >
      <h3>The parts of an API request</h3>

      <div className="request-builder">
        <div className="request-top-row">
          <select
            className="request-method"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          >
            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
            <option>DELETE</option>
          </select>

          <input
            className="request-url"
            type="text"
            defaultValue="https://api.example.com/users"
          />
        </div>

        <div className="request-panel-grid">
          <article className="request-panel">
            <h4>HTTP Method</h4>
            <p>
              The method tells the server what kind of action you want to take.
            </p>
            <ul>
              <li><strong>GET</strong> retrieves data</li>
              <li><strong>POST</strong> creates data</li>
              <li><strong>PUT</strong> replaces data</li>
              <li><strong>DELETE</strong> removes data</li>
            </ul>
          </article>

          <article className="request-panel">
            <h4>URL / Endpoint</h4>
            <p>
              The URL tells the API where the request should go.
            </p>
            <p className="mini-code">/users</p>
          </article>

          <article className="request-panel">
            <h4>Query Parameters</h4>
            <p>
              Query params add extra details to the request in the URL.
            </p>
            <p className="mini-code">?role=admin&amp;limit=10</p>
          </article>

          <article className="request-panel">
            <h4>Headers</h4>
            <p>
              Headers send metadata like authentication or content type.
            </p>
            <div className="mini-code-block">
              <p>Content-Type: application/json</p>
              <p>Authorization: Bearer token_here</p>
            </div>
          </article>

          <article
            className={`request-panel ${
              method === 'GET' || method === 'DELETE'
                ? 'request-panel-muted'
                : ''
            }`}
          >
                      <h4>Body</h4>
                      <p>
                          The body contains data being sent to the server, usually with
                          POST or PUT requests.
                      </p>
                      <div className="mini-code-block">
                          <pre>{`{
  "name": "mock wahlberg",
  "email": "mock.wahlberg@example.com"
}`}</pre>
                      </div>
                  </article>
        </div>
      </div>

      <h3>Example Request</h3>
      <div className="example-box">
        <pre>{requestExamples[method]}</pre>
      </div>

      <h3>What to remember</h3>
      <p>
        A request tells the server what you want, where to send it, and any
        extra data or context needed to process it.
      </p>
    </LessonLayout>
  )
}

export default AnatomyOfRequest