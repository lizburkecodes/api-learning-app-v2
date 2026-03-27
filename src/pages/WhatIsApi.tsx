import { useState } from 'react'
import LessonLayout from '../components/LessonLayout'

function WhatIsApi() {
    const [exerciseAnswers, setExerciseAnswers] = useState({
        method: '',
        endpoint: '',
        requestData: '',
        successResponse: '',
        possibleErrors: '',
    })

    const [showReferenceAnswers, setShowReferenceAnswers] = useState(false)

    function updateExerciseAnswer(
        field: keyof typeof exerciseAnswers,
        value: string
    ) {
        setExerciseAnswers((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    function clearExerciseAnswers() {
        setExerciseAnswers({
            method: '',
            endpoint: '',
            requestData: '',
            successResponse: '',
            possibleErrors: '',
        })
        setShowReferenceAnswers(false)
    }

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
                This makes it possible to integrate features like payments, maps, or login
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

            <h3>Most Common API styles</h3>
            <ul>
                <li><strong>REST</strong> — uses multiple endpoints to represent resources, with standard HTTP methods like GET, POST, PUT, and DELETE</li>
                <li><strong>SOAP</strong> — uses XML-based messaging with strict structure and built-in security, often in enterprise or legacy systems</li>
                <li><strong>GraphQL</strong> — uses a single endpoint where clients request exactly the data they need, reducing multiple round trips</li>
                <li><strong>Webhooks</strong> — event-driven; the server automatically sends data to your endpoint when something happens</li>
                <li><strong>gRPC</strong> — lets clients call server functions directly (like local methods), enabling fast communication between services</li>
            </ul>

            <h3>REST</h3>
            <p>
                REST is the most common standard for web-based APIs. It organizes data around
                resources and exposes them through predictable endpoints. This app uses REST-style
                APIs in its lessons, so the patterns you see here reflect how most real-world APIs
                are designed.
            </p>

            <p>
                In REST, each endpoint represents either a <strong>collection</strong> or a
                <strong> single resource</strong>.
            </p>

            <div className="rest-pattern-grid">
                <article className="rest-pattern-card">
                    <h4>Collection endpoint</h4>
                    <div className="mini-code-block">
                        <pre>{`/users`}</pre>
                    </div>
                    <p>
                        Represents all users.
                    </p>
                </article>

                <article className="rest-pattern-card">
                    <h4>Single resource endpoint</h4>
                    <div className="mini-code-block">
                        <pre>{`/users/42`}</pre>
                    </div>
                    <p>
                        Represents a single user by ID.
                    </p>
                </article>
            </div>

            <div className="example-box">
                <pre>{`GET    /users       → get all users
GET    /users/42    → get one user
POST   /users       → create a new user
PUT    /users/42    → update a user
DELETE /users/42    → delete a user`}</pre>
            </div>

            <p>
                <strong>Rule of thumb:</strong> POST requests usually go to the
                <strong> collection endpoint</strong>. For example, creating a user means
                sending a request to <strong>/users</strong>, and the server assigns the ID.
            </p>
            <p>
                Think of it like this: <strong> /users</strong> is the list, and
                <strong> /users/42</strong> is one item in that list.
            </p>

            <h3>API Documentation</h3>

            <p>
                APIs are only useful if developers know how to use them. That's where
                <strong> API documentation</strong> comes in.
            </p>

            <p>
                API documentation explains how to integrate with an API — which endpoints exist,
                which HTTP methods to use, what data to send, and what responses or errors
                to expect.
            </p>
            <p>
                For example, companies like Stripe provide detailed API documentation so
                developers can learn how to create payments, test requests, and handle
                failures correctly.
            </p>

            <h4>What documentation usually includes</h4>
            <ul>
                <li><strong>Endpoints</strong> — the available URLs</li>
                <li><strong>Methods</strong> — GET, POST, PUT, DELETE</li>
                <li><strong>Parameters</strong> — data sent in the request</li>
                <li><strong>Request examples</strong> — sample code or payloads</li>
                <li><strong>Responses</strong> — what the API sends back</li>
                <li><strong>Errors</strong> — what can go wrong and why</li>
            </ul>

            <h4>Pay attention to types</h4>
            <p>
                Every <strong>parameter</strong> in API documentation has a <strong>type</strong> — it tells
                you what kind of value the API expects. Sending the wrong type is one of the
                most common causes of a failed API request. For example:
            </p>
            <h4>Pay attention to types</h4>
<p>
  Every <strong>parameter</strong> in API documentation has a <strong>type</strong> — it tells
  you what kind of value the API expects. Sending the wrong type is one of the
  most common causes of failed requests.
</p>

<div className="example-box">
  <pre>{`amount     integer   A number in cents (e.g. 1000 = $10.00)
currency   enum      Three letter, ISO code in lowercase. Must be from supported list`}</pre>
</div>

<p>
  An <strong>integer</strong> means a real number — not a string. Sending{' '}
  <code style={{ background: '#e2e8f0', padding: '1px 6px', borderRadius: '4px', fontSize: '0.9em' }}>
    "1000"
  </code>{' '}is a
  <strong> string </strong>
  and the request will fail, even though the value looks like a number.
</p>

<p>
  An <strong>enum</strong> is still a string — but only certain values are allowed.
  For example, <code style={{ background: '#e2e8f0', padding: '1px 6px', borderRadius: '4px', fontSize: '0.9em' }}>"usd"</code> works, but <code style={{ background: '#e2e8f0', padding: '1px 6px', borderRadius: '4px', fontSize: '0.9em' }}>"dollars"</code> or <code style={{ background: '#e2e8f0', padding: '1px 6px', borderRadius: '4px', fontSize: '0.9em' }}>"USD"</code> will fail.
</p>

<p>
Always match both the <strong>type</strong> and the <strong>expected format</strong> exactly as shown in the documentation.
</p>

            <h4>Mini Exercise: Practice Reading API Documentation</h4>

            <p>
                Use Stripe's API documentation to answer the questions in this exercise. This is meant to help you practice finding key information in real docs. Don't worry about memorizing anything — just focus on learning how to navigate the documentation effectively.
                Pay attention to special context clues that are baked into the examples to help guide your eyes. Type or paste what you find below and then compare your answers at the end. 
            </p>

            <div className="docs-exercise-card">
                <div className="docs-exercise-header">
                    <p>
                        <strong>Stripe Docs:</strong>{' '}
                        <a
                            href="https://docs.stripe.com/api/payment_intents/create?lang=node"
                            target="_blank"
                            rel="noreferrer"
                            style={{ color: '#eceef1' }}
                        >
                            <strong>Create a Payment Intent</strong> ↗
                        </a>
                    </p>
                </div>

                <div className="docs-exercise-grid">
                    <label className="docs-field">
                        <a>HTTP <strong style={{ color: '#4bca2e' }}>method</strong></a>
                        <input
                            type="text"
                            placeholder="Example: GET, POST, PUT, DELETE"
                            value={exerciseAnswers.method}
                            onChange={(e) =>
                                updateExerciseAnswer('method', e.target.value)
                            }
                        />
                    </label>

                    <label className="docs-field">
                        <span>Endpoint path</span>
                        <input
                            type="text"
                            placeholder="Example: /v2/users"
                            value={exerciseAnswers.endpoint}
                            onChange={(e) =>
                                updateExerciseAnswer('endpoint', e.target.value)
                            }
                        />
                    </label>

                    <label className="docs-field docs-field-full">
                        <a>What <strong>parameters</strong> are <strong style={{ color: '#f27400' }}>Required</strong> for the request?</a>
                        <textarea
                            rows={4}
                            placeholder="Type or paste the required parameters..."
                            value={exerciseAnswers.requestData}
                            onChange={(e) =>
                                updateExerciseAnswer('requestData', e.target.value)
                            }
                        />
                    </label>

                    <label className="docs-field docs-field-full">
                        <a>In the example response, what is the value of the <strong style={{ color: '#4bca2e' }}>"id"</strong>?</a>
                        <textarea
                            rows={2}
                            placeholder="Look at the example response and find the value"
                            value={exerciseAnswers.successResponse}
                            onChange={(e) =>
                                updateExerciseAnswer('successResponse', e.target.value)
                            }
                        />
                    </label>

                    <label className="docs-field docs-field-full">
                        <a>
                            According to this section of the documentation, what are the four possible values for <a href="https://docs.stripe.com/api/errors?lang=node" target="_blank" rel="noreferrer" style={{ color: '#eceef1' }}><strong>ERROR TYPES</strong> ↗</a>?
                        </a>
                        <textarea
                            rows={3}
                            placeholder="List the values shown in the documentation"
                            value={exerciseAnswers.possibleErrors}
                            onChange={(e) =>
                                updateExerciseAnswer('possibleErrors', e.target.value)
                            }
                        />
                    </label>
                </div>

                <div className="docs-exercise-actions">
                    <button
                        type="button"
                        className="secondary-button"
                        onClick={() => setShowReferenceAnswers((prev) => !prev)}
                    >
                        {showReferenceAnswers ? 'Hide reference answers' : 'Show reference answers'}
                    </button>

                    <button
                        type="button"
                        className="secondary-button"
                        onClick={clearExerciseAnswers}
                    >
                        Clear answers
                    </button>
                </div>

                {showReferenceAnswers && (
    <div className="docs-reference-box">
        <pre>{`Method: POST
Endpoint: /v1/payment_intents
Required parameters: amount and currency
ID value: pi_3MtwBwLkdIwHu7ix28a3tqPa
Errors types: api_error, card_error, idempotency_error, invalid_request_error`}</pre>
    </div>
)}
            </div>

            <p>
                Learning to read documentation is one of the most important API skills you
                can build. It is how developers figure out what an API can do and how to use
                it correctly.
            </p>

            <h3>What to remember</h3>
            <p>
                APIs are the foundation of how modern software systems connect, share
                data, and build on top of each other.
            </p>
        </LessonLayout>
    )
}

export default WhatIsApi