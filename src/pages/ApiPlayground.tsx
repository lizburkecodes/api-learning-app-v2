import { useMemo, useState } from 'react'
import LessonLayout from '../components/LessonLayout'

type ResultStatus = 'success' | 'error' | null
type ScenarioId = 1 | 2 | 3 | 4

const SCENARIOS: Record<
  ScenarioId,
  {
    title: string
    description: string
    defaultBody: string
  }
> = {
  1: {
    title: 'Create a new user',
    description:
      'Your app needs to create a new user in the system. For this test case, the user\'s name is "mock wahlberg" and their email is "mock@example.com".',
    defaultBody: '{}',
  },
  2: {
    title: 'Retrieve a specific user',
    description: 'Fetch the details for the user with ID 42.',
    defaultBody: '{}',
  },
  3: {
    title: "Update a user's info",
    description:
      "Edit the email address for the user with ID 42. Use 'updated@example.com' as the new email.",
    defaultBody: '{}',
  },
  4: {
    title: 'Delete a user',
    description: 'Delete the user with ID 42 from the system.',
    defaultBody: '{}',
  },
}

function ApiPlayground() {
  const [activeScenario, setActiveScenario] = useState<ScenarioId>(1)
  const [method, setMethod] = useState('GET')
  const [endpoint, setEndpoint] = useState('')
  const [contentTypeChecked, setContentTypeChecked] = useState(false)
  const [apiKeyChecked, setApiKeyChecked] = useState(false)
  const [body, setBody] = useState(SCENARIOS[1].defaultBody)
  const [result, setResult] = useState<ResultStatus>(null)
  const [feedback, setFeedback] = useState('')
  const [hint, setHint] = useState('')
  const [errorResponse, setErrorResponse] = useState('')
  const [successResponse, setSuccessResponse] = useState('')

  const trimmedEndpoint = endpoint.trim()
  const trimmedBody = body.trim()
  const scenario = SCENARIOS[activeScenario]

  const handleScenarioChange = (id: ScenarioId) => {
    setActiveScenario(id)
    setMethod('GET')
    setEndpoint('')
    setContentTypeChecked(false)
    setApiKeyChecked(false)
    setBody(SCENARIOS[id].defaultBody)
    setResult(null)
    setFeedback('')
    setHint('')
    setErrorResponse('')
    setSuccessResponse('')
  }

  const requestPreview = useMemo(() => {
    const headers: string[] = []
    if (contentTypeChecked) headers.push('Content-Type: application/json')
    if (apiKeyChecked) headers.push('x-api-key: your_api_key_here')

    const headerSection = headers.length ? '\n' + headers.join('\n') : ''
    const bodySection = trimmedBody ? '\n\n' + trimmedBody : ''

    return `${method} ${trimmedEndpoint || '/...'}${headerSection}${bodySection}`
  }, [method, trimmedEndpoint, contentTypeChecked, apiKeyChecked, trimmedBody])

  const handleSendRequest = () => {
    const setError = (fb: string, resp: string) => {
      setResult('error')
      setFeedback(fb)
      setHint('')
      setErrorResponse(resp)
      setSuccessResponse('')
    }

    const setSuccess = (resp: string) => {
      setResult('success')
      setFeedback('Nice work — this request is valid.')
      setErrorResponse('')
      setSuccessResponse(resp)
    }

    // --- Scenario 1: POST /users ---
    if (activeScenario === 1) {
      if (method !== 'POST') {
        setError(
          'Hint: This scenario creates a new resource.',
          `405 Method Not Allowed\nContent-Type: application/json\n\n{\n  "error": "Method not allowed for this endpoint"\n}`,
        )
        return
      }
      if (trimmedEndpoint !== '/users') {
        setError(
          'Hint: Look closely at the endpoint for this scenario.',
          `404 Not Found\nContent-Type: application/json\n\n{\n  "error": "Endpoint not found"\n}`,
        )
        return
      }
      if (!contentTypeChecked) {
        setError(
          'Hint: This request sends a JSON body.',
          `400 Bad Request\nContent-Type: application/json\n\n{\n  "error": "Content-Type must be application/json"\n}`,
        )
        return
      }
      if (!apiKeyChecked) {
        setError(
          'Hint: This Endpoint requires authentication.',
          `401 Unauthorized\nContent-Type: application/json\n\n{\n  "error": "Invalid or missing API key"\n}`,
        )
        return
      }

      let parsedBody: unknown
      try {
        parsedBody = JSON.parse(trimmedBody)
      } catch {
        setError(
          'The request body must be valid JSON.',
          `400 Bad Request\nContent-Type: application/json\n\n{\n  "error": "Request body must be valid JSON"\n}`,
        )
        return
      }

      if (
        typeof parsedBody !== 'object' ||
        parsedBody === null ||
        !('name' in parsedBody) ||
        !('email' in parsedBody)
      ) {
        setError(
          'The body must include both "name" and "email" fields.',
          `400 Bad Request\nContent-Type: application/json\n\n{\n  "error": "The body must include both name and email"\n}`,
        )
        return
      }

      const { name, email } = parsedBody as { name: unknown; email: unknown }

      if (typeof name !== 'string' || name.trim() === '') {
        setError(
          'The "name" field is required and cannot be empty.',
          `400 Bad Request\nContent-Type: application/json\n\n{\n  "error": "The name field is required"\n}`,
        )
        return
      }
      if (typeof email !== 'string' || email.trim() === '') {
        setError(
          'The "email" field is required and cannot be empty.',
          `400 Bad Request\nContent-Type: application/json\n\n{\n  "error": "The email field is required"\n}`,
        )
        return
      }
      if (name.trim() !== 'mock wahlberg' || email.trim() !== 'mock@example.com') {
        setError(
          'Hint: Look closely at the test values from the scenario.',
          `422 Unprocessable Content\nContent-Type: application/json\n\n{\n  "error": "Use the exact test values from the scenario"\n}`,
        )
        return
      }

      setSuccess(
        `201 Created\nContent-Type: application/json\nLocation: /users/101\n\n{\n  "id": 101,\n  "name": "${name.trim()}",\n  "email": "${email.trim()}"\n}`,
      )
    }

    // --- Scenario 2: GET /users/42 ---
    if (activeScenario === 2) {
      if (method !== 'GET') {
        setError(
          'Hint: This scenario reads data without modifying it.',
          `405 Method Not Allowed\nContent-Type: application/json\n\n{\n  "error": "Method not allowed for this endpoint"\n}`,
        )
        return
      }
      if (trimmedEndpoint !== '/users/42') {
        setError(
          'Hint: The endpoint should reference a specific user.',
          `404 Not Found\nContent-Type: application/json\n\n{\n  "error": "Endpoint not found"\n}`,
        )
        return
      }
      if (!apiKeyChecked) {
        setError(
          'Hint: This Endpoint requires authentication.',
          `401 Unauthorized\nContent-Type: application/json\n\n{\n  "error": "Invalid or missing API key"\n}`,
        )
        return
      }
      setHint(
        contentTypeChecked
          ? "You included Content-Type, but GET requests don't send a body so it isn't needed."
          : '',
      )
      setSuccess(
        `200 OK\nContent-Type: application/json\n\n{\n  "id": 42,\n  "name": "Alex Johnson",\n  "email": "alex@example.com"\n}`,
      )
    }

    // --- Scenario 3: PUT /users/42 ---
    if (activeScenario === 3) {
      if (method !== 'PUT') {
        setError(
          'Hint: This scenario updates an existing resource.',
          `405 Method Not Allowed\nContent-Type: application/json\n\n{\n  "error": "Method not allowed for this endpoint"\n}`,
        )
        return
      }
      if (trimmedEndpoint !== '/users/42') {
        setError(
          "Hint: The endpoint should reference the specific user you're updating.",
          `404 Not Found\nContent-Type: application/json\n\n{\n  "error": "Endpoint not found"\n}`,
        )
        return
      }
      if (!contentTypeChecked) {
        setError(
          'Hint: This request sends a JSON body.',
          `400 Bad Request\nContent-Type: application/json\n\n{\n  "error": "Content-Type must be application/json"\n}`,
        )
        return
      }
      if (!apiKeyChecked) {
        setError(
          'Hint: This Endpoint requires authentication.',
          `401 Unauthorized\nContent-Type: application/json\n\n{\n  "error": "Invalid or missing API key"\n}`,
        )
        return
      }

      let parsedBody: unknown
      try {
        parsedBody = JSON.parse(trimmedBody)
      } catch {
        setError(
          'The request body must be valid JSON.',
          `400 Bad Request\nContent-Type: application/json\n\n{\n  "error": "Request body must be valid JSON"\n}`,
        )
        return
      }

      if (
        typeof parsedBody !== 'object' ||
        parsedBody === null ||
        !('email' in parsedBody)
      ) {
        setError(
          'The body must include an "email" field.',
          `400 Bad Request\nContent-Type: application/json\n\n{\n  "error": "The body must include an email field"\n}`,
        )
        return
      }

      const { email } = parsedBody as { email: unknown }

      if (typeof email !== 'string' || email.trim() === '') {
        setError(
          'The "email" field is required and cannot be empty.',
          `400 Bad Request\nContent-Type: application/json\n\n{\n  "error": "The email field is required"\n}`,
        )
        return
      }
      if (email.trim() !== 'updated@example.com') {
        setError(
          'Use the exact test email from the scenario: updated@example.com.',
          `422 Unprocessable Content\nContent-Type: application/json\n\n{\n  "error": "Use the exact test values from the scenario"\n}`,
        )
        return
      }

      setSuccess(
        `200 OK\nContent-Type: application/json\n\n{\n  "id": 42,\n  "name": "Alex Johnson",\n  "email": "${email.trim()}"\n}`,
      )
    }

    // --- Scenario 4: DELETE /users/42 ---
    if (activeScenario === 4) {
      if (method !== 'DELETE') {
        setError(
          'Hint: This scenario removes a resource.',
          `405 Method Not Allowed\nContent-Type: application/json\n\n{\n  "error": "Method not allowed for this endpoint"\n}`,
        )
        return
      }
      if (trimmedEndpoint !== '/users/42') {
        setError(
          'The endpoint should reference the specific user to delete.',
          `404 Not Found\nContent-Type: application/json\n\n{\n  "error": "Endpoint not found"\n}`,
        )
        return
      }
      if (!apiKeyChecked) {
        setError(
          'Hint: This Endpoint requires authentication.',
          `401 Unauthorized\nContent-Type: application/json\n\n{\n  "error": "Invalid or missing API key"\n}`,
        )
        return
      }
      setHint(
        contentTypeChecked
          ? "You included Content-Type, but DELETE requests don't send a body so it isn't needed."
          : '',
      )
      setSuccess(`204 No Content`)
    }
  }

  return (
    <LessonLayout
      title="API Playground"
      intro="Practice building a request from scratch. Read the scenario, choose the correct request details, and see whether your request succeeds."
    >
      <div className="scenario-tabs">
        {([1, 2, 3, 4] as ScenarioId[]).map((id) => (
          <button
            key={id}
            className={`scenario-tab${activeScenario === id ? ' active' : ''}`}
            onClick={() => handleScenarioChange(id)}
          >
            Scenario {id}
          </button>
        ))}
      </div>

      <div className="challenge-banner">
        <h3>
          Scenario {activeScenario}: {scenario.title}
        </h3>
        <p>{scenario.description}</p>
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
              placeholder="/endpoint"
            />
          </label>

          <div className="form-group">
            <span>Select required headers only</span>

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
              rows={6}
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
            <p className="response-label">Server response:</p>
            <div className="example-box">
              <pre>{errorResponse}</pre>
            </div>
          </div>
        ) : (
          <div className="result-card success-card">
            <h4>Request succeeded</h4>
            <p>{feedback}</p>
            {hint && <p className="result-hint">Note: {hint}</p>}
            <p className="response-label">Server response:</p>
            <div className="example-box">
              <pre>{successResponse}</pre>
            </div>
          </div>
        )}
      </div>
    </LessonLayout>
  )
}

export default ApiPlayground