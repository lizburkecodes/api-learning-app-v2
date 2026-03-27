import { useState } from 'react'
import LessonLayout from '../components/LessonLayout'

function AnatomyOfResponse() {
  const [responseType, setResponseType] = useState('success')

  const responseExamples: Record<string, string> = {
    success: `200 OK
Content-Type: application/json
X-RateLimit-Remaining: 55

{
  "id": 101,
  "name": "mock wahlberg",
  "email": "mock@example.com"
}`,
    unauthorized: `401 Unauthorized
Content-Type: application/json

{
  "error": "Invalid API key"
}`,
forbidden: `403 Forbidden
Content-Type: application/json

{
  "error": "You do not have permission to access this resource"
}`,
    notFound: `404 Not Found
Content-Type: application/json

{
  "error": "Resource not found"
}`,
  }

  return (
    <LessonLayout
      title="Anatomy of a Response"
      intro="After a server receives a request, it sends back a response. The response tells you whether the request worked and returns data or error details."
    >
          <h3>The parts of an API response</h3>

          <div className="response-top-row">
              <select
                  className="response-selector"
                  value={responseType}
                  onChange={(e) => setResponseType(e.target.value)}
              >
                  <option value="success">Successful response</option>
                  <option value="unauthorized">Unauthorized error</option>
                  <option value="forbidden">Forbidden error</option>
                  <option value="notFound">Not found error</option>
              </select>
          </div>

          <div className="response-panel-grid">
              <article className="response-panel">
                  <h4>Status Code</h4>
                  <p>
                      The status code tells you whether the request succeeded or failed.
                  </p>
          <ul>
            <li><strong>200</strong> OK — success</li>
            <li><strong>201</strong> Created — resource created</li>
            <li><strong>400</strong> Bad Request — invalid request</li>
            <li><strong>401</strong> Unauthorized — invalid or missing auth</li>
            <li><strong>403</strong> Forbidden — you don't have permission</li>
            <li><strong>404</strong> Not Found — resource does not exist</li>
            <li><strong>500</strong> Server Error — something went wrong</li>
          </ul>
        </article>

        <article className="response-panel">
          <h4>Headers</h4>
          <p>
            Response headers provide metadata about the returned data.
          </p>
          <div className="mini-code-block">
            <pre>{`Content-Type: application/json
X-RateLimit-Remaining: 55`}</pre>
          </div>
        </article>

        <article className="response-panel">
          <h4>Body</h4>
          <p>
            The response body contains the returned data or an error message.
          </p>
          <div className="mini-code-block">
            <pre>{`{
  "id": 101,
  "name": "mock wahlberg",
  "email": "mock@example.com"
}`}</pre>
          </div>
        </article>
      </div>

      <h3>Example response</h3>
      <div className="example-box">
        <pre>{responseExamples[responseType]}</pre>
      </div>

      <h3>What to remember</h3>
      <p>
        A response tells you what happened. The status code gives a quick
        summary, and the headers and body give you the details.
      </p>
    </LessonLayout>
  )
}

export default AnatomyOfResponse