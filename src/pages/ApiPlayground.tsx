import { useMemo, useState } from 'react'
import LessonLayout from '../components/LessonLayout'

type ResultStatus = 'success' | 'error' | null

function ApiPlayground() {
  const [method, setMethod] = useState('GET')
  const [endpoint, setEndpoint] = useState('')
  const [contentTypeChecked, setContentTypeChecked] = useState(false)
  const [apiKeyChecked, setApiKeyChecked] = useState(false)
  const [body, setBody] = useState('{\n  "name": "",\n  "email": ""\n}')
  const [result, setResult] = useState<ResultStatus>(null)
  const [feedback, setFeedback] = useState('')
  const [createdUser, setCreatedUser] = useState<{ name: string; email: string } | null>(null)
  const [errorResponse, setErrorResponse] = useState('')

  const trimmedEndpoint = endpoint.trim()
  const trimmedBody = body.trim()

  const requestPreview = useMemo(() => {
    const headers: string[] = []

    if (contentTypeChecked) headers.push('Content-Type: application/json')
    if (apiKeyChecked) headers.push('x-api-key: your_api_key_here')

    return `${method} ${trimmedEndpoint || '/...'}
${headers.join('\n')}${headers.length ? '\n\n' : '\n'}${trimmedBody}`
  }, [method, trimmedEndpoint, contentTypeChecked, apiKeyChecked, trimmedBody])

  const handleSendRequest = () => {
    if (method !== 'POST') {
      setResult('error')
      setFeedback('This scenario creates a new resource, so POST is the correct method.')
      setCreatedUser(null)
      setErrorResponse(`405 Method Not Allowed
Content-Type: application/json

{
  "error": "Method not allowed for this endpoint"
}`)
      return
    }

    if (trimmedEndpoint !== '/users') {
      setResult('error')
      setFeedback('The endpoint is incorrect. Use the collection endpoint for users.')
      setCreatedUser(null)
      setErrorResponse(`404 Not Found
Content-Type: application/json

{
  "error": "Endpoint not found"
}`)
      return
    }

    if (!contentTypeChecked) {
      setResult('error')
      setFeedback('This request sends a JSON body, so it needs a Content-Type header.')
      setCreatedUser(null)
      setErrorResponse(`400 Bad Request
Content-Type: application/json

{
  "error": "Content-Type must be application/json"
}`)
      return
    }

    if (!apiKeyChecked) {
      setResult('error')
      setFeedback('This API requires authentication. Include the API key header.')
      setCreatedUser(null)
      setErrorResponse(`401 Unauthorized
Content-Type: application/json

{
  "error": "Invalid or missing API key"
}`)
      return
    }

    let parsedBody: unknown

    try {
      parsedBody = JSON.parse(trimmedBody)
    } catch {
      setResult('error')
      setFeedback('The request body must be valid JSON.')
      setCreatedUser(null)
      setErrorResponse(`400 Bad Request
Content-Type: application/json

{
  "error": "Request body must be valid JSON"
}`)
      return
    }

    if (
      typeof parsedBody !== 'object' ||
      parsedBody === null ||
      !('name' in parsedBody) ||
      !('email' in parsedBody)
    ) {
      setResult('error')
      setFeedback('The body must include both "name" and "email" fields.')
      setCreatedUser(null)
      setErrorResponse(`400 Bad Request
Content-Type: application/json

{
  "error": "The body must include both name and email"
}`)
      return
    }

    const { name, email } = parsedBody as { name: unknown; email: unknown }

    if (typeof name !== 'string' || name.trim() === '') {
      setResult('error')
      setFeedback('The "name" field is required and cannot be empty.')
      setCreatedUser(null)
      setErrorResponse(`400 Bad Request
Content-Type: application/json

{
  "error": "The name field is required"
}`)
      return
    }

    if (typeof email !== 'string' || email.trim() === '') {
      setResult('error')
      setFeedback('The "email" field is required and cannot be empty.')
      setCreatedUser(null)
      setErrorResponse(`400 Bad Request
Content-Type: application/json

{
  "error": "The email field is required"
}`)
      return
    }

    if (name.trim() !== 'mock wahlberg' || email.trim() !== 'mock@example.com') {
      setResult('error')
      setFeedback('Use the exact test values from the scenario for name and email.')
      setCreatedUser(null)
      setErrorResponse(`422 Unprocessable Content
Content-Type: application/json

{
  "error": "Use the exact test values from the scenario"
}`)
      return
    }

    setCreatedUser({
      name: name.trim(),
      email: email.trim(),
    })
    setErrorResponse('')
    setResult('success')
    setFeedback('Nice work — this request is valid.')
  }

  return (
    <LessonLayout
      title="API Playground"
      intro="Practice building a request from scratch. Read the scenario, choose the correct request details, and see whether your request succeeds."
    >
      <div className="challenge-banner">
        <h3>Scenario: Create a new user</h3>
        <p>
          Your app needs to create a new user in the system. For this test case, the
          user&apos;s name is &quot;mock wahlberg&quot; and their email is
          &quot;mock@example.com&quot;.
        </p>
      </div>

      <div className="challenge-grid">
        <div className="challenge-form">
          <label className="form-group">
            <span>Select the correct HTTP method</span>
            <select value={method} onChange={(e) => setMethod(e.target.value)}>
              <option>GET</option>
              <option>POST</option>
              <option>PUT</option>
              <option>DELETE</option>
            </select>
          </label>

          <label className="form-group">
            <span>Type the correct endpoint</span>
            <input
              type="text"
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
              placeholder="/users"
            />
          </label>

          <div className="form-group">
            <span>Select ONLY required headers</span>

            <label className="checkbox-row">
              <input
                type="checkbox"
                checked={contentTypeChecked}
                onChange={(e) => setContentTypeChecked(e.target.checked)}
              />
              <span>Content-Type: application/json</span>
            </label>

            <label className="checkbox-row">
              <input
                type="checkbox"
                checked={apiKeyChecked}
                onChange={(e) => setApiKeyChecked(e.target.checked)}
              />
              <span>x-api-key: your_api_key_here</span>
            </label>
          </div>

          <label className="form-group">
            <span>Create the request body</span>
            <textarea
              rows={8}
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </label>

          <button className="send-button" onClick={handleSendRequest}>
            Send Request
          </button>
        </div>

        <div className="challenge-preview">
          <h4>Request Preview</h4>
          <div className="example-box">
            <pre>{requestPreview}</pre>
          </div>
        </div>
      </div>

      <div className="challenge-results">
        <h3>Result</h3>

        {result === null ? (
          <div className="empty-state">
            Build your request and click <strong>Send Request</strong>.
          </div>
        ) : result === 'error' ? (
          <div className="result-card error-card">
            <h4>Request failed</h4>
            <p>{feedback}</p>
            <div className="example-box">
              <pre>{errorResponse}</pre>
            </div>
          </div>
        ) : (
          <div className="result-card success-card">
            <h4>Request succeeded</h4>
            <p>{feedback}</p>
            <div className="example-box">
              <pre>{`201 Created
Content-Type: application/json
Location: /users/101

{
  "id": 101,
  "name": "${createdUser?.name ?? ''}",
  "email": "${createdUser?.email ?? ''}"
}`}</pre>
            </div>
          </div>
        )}
      </div>
    </LessonLayout>
  )
}

export default ApiPlayground