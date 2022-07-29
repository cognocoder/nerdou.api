/**
 * Abstract class for HTTP client and server error responses.
 *
 * @param {number} code HTTP error response status code.
 * @param {string} status HTTP error response status.
 * @param {string} reason HTTP error response message.
 * @param {object} [data] Optional additional data about the error.
 *
 * @link https://www.restapitutorial.com/httpstatuscodes.html.
 */
export abstract class HttpError extends Error {
	code: number
	status: string
	reason: string
	data?: object
	constructor(code: number, status: string, reason: string, data?: object) {
		super(reason)
		this.code = code
		this.status = status
		this.reason = reason
		this.data = data
	}
}

/**
 * HTTP client error response status code 400.
 *
 * The request could not be understood by the server due to malformed syntax.
 * The client SHOULD NOT repeat the request without modifications.
 *
 * @param {string} message HTTP error response message.
 * @param {object} [data=undefined] Optional additional data about the error.
 *
 * A specialization of {@link HttpError}.
 */
export class BadRequest extends HttpError {
	constructor(message: string, data: object | undefined = undefined) {
		super(400, 'Bad Request', message, data)
	}
}

/**
 * HTTP client error response status code 401.
 *
 * The request requires user authentication.
 * The response MUST include a WWW-Authenticate header field (section 14.47)
 * containing a challenge applicable to the requested resource.
 * The client MAY repeat the request with a suitable Authorization header field
 * (section 14.8).
 * If the request already included Authorization credentials, then the 401
 * response indicates that authorization has been refused for those credentials.
 * If the 401 response contains the same challenge as the prior response, and
 * the user agent has already attempted authentication at least once, then the
 * user SHOULD be presented the entity that was given in the response, since
 * that entity might include relevant diagnostic information.
 * HTTP access authentication is explained in "HTTP Authentication: Basic and
 * Digest Access Authentication".
 *
 * @param {string} message HTTP error response message.
 * @param {object} [data=undefined] Optional additional data about the error.
 *
 * A specialization of {@link HttpError}.
 */
export class Unauthorized extends HttpError {
	constructor(message: string, data: object | undefined = undefined) {
		super(401, 'Unauthorized', message, data)
	}
}

/**
 * HTTP client error response status code 403.
 *
 * The server understood the request, but is refusing to fulfill it.
 * Authorization will not help and the request SHOULD NOT be repeated.
 * If the request method was not HEAD and the server wishes to make public why
 * the request has not been fulfilled, it SHOULD describe the reason for the
 * refusal in the entity.
 * If the server does not wish to make this information available to the
 * client, the status code 404 (Not Found) can be used instead.
 *
 * @param {string} message HTTP error response message.
 * @param {object} [data=undefined] Optional additional data about the error.
 *
 * A specialization of {@link HttpError}.
 */
export class Forbidden extends HttpError {
	constructor(message: string, data: object | undefined = undefined) {
		super(403, 'Forbidden', message, data)
	}
}

/**
 * HTTP client error response status code 404.
 *
 * The server has not found anything matching the Request-URI.
 * No indication is given of whether the condition is temporary or permanent.
 * The 410 (Gone) status code SHOULD be used if the server knows, through some
 * internally configurable mechanism, that an old resource is permanently
 * unavailable and has no forwarding address.
 * This status code is commonly used when the server does not wish to reveal
 * exactly why the request has been refused, or when no other response is
 * applicable.
 *
 * @param {string} message HTTP error response message.
 * @param {object} [data=undefined] Optional additional data about the error.
 *
 * A specialization of {@link HttpError}.
 */
export class NotFound extends HttpError {
	constructor(message: string, data: object | undefined = undefined) {
		super(404, 'Not Found', message, data)
	}
}

/**
 * HTTP client error response status code 405.
 *
 * The method specified in the Request-Line is not allowed for the resource
 * identified by the Request-URI. The response MUST include an Allow header
 * containing a list of valid methods for the requested resource.
 *
 * @param {string} message HTTP error response message.
 * @param {string} allow Allowed HTTP methods to be sent in the response header.
 * @param {object} [data=undefined] Optional additional data about the error.
 *
 * A specialization of {@link HttpError}.
 */
export class MethodNotAllowed extends HttpError {
	allow: string
	constructor(
		message: string,
		allow: string,
		data: object | undefined = undefined
	) {
		super(405, 'Method Not Allowed', message, data)
		this.allow = allow
	}
}

/**
 * HTTP client error response status code 409.
 *
 * The request could not be completed due to a conflict with the current state
 * of the resource.
 * This code is only allowed in situations where it is expected that the user
 * might be able to resolve the conflict and resubmit the request.
 * The response body SHOULD include enough information for the user to recognize
 * the source of the conflict.
 * Ideally, the response entity would include enough information for the user or
 * user agent to fix the problem; however, that might not be possible and is not
 * required.
 *
 * Conflicts are most likely to occur in response to a PUT request.
 * For example, if versioning were being used and the entity being PUT included
 * changes to a resource which conflict with those made by an earlier
 * (third-party) request, the server might use the 409 response to indicate that
 * it can't complete the request.
 * In this case, the response entity would likely contain a list of the
 * differences between the two versions in a format defined by the response
 * Content-Type.
 *
 * @param {string} message HTTP error response message.
 * @param {object} [data=undefined] Optional additional data about the error.
 *
 * A specialization of {@link HttpError}.
 */
export class Conflict extends HttpError {
	constructor(message: string, data: object | undefined = undefined) {
		super(409, 'Conflict', message, data)
	}
}

/**
 * HTTP server error response status code 500.
 *
 * The server encountered an unexpected condition which prevented it from
 * fulfilling the request.
 *
 * @param {string} message HTTP error response message.
 * @param {object} [data=undefined] Optional additional data about the error.
 *
 * A specialization of {@link HttpError}.
 */
export class InternalServerError extends HttpError {
	constructor(message: string, data: object | undefined = undefined) {
		super(500, 'Internal Server Error', message, data)
	}
}
