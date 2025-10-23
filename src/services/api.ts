/**
 * API service for communicating with the virtual try-on backend.
 * Backend expects multipart form data with images and Turnstile token in headers.
 */

// const API_BASE_URL = "https://mines-cinema-star-distant.trycloudflare.com";
const API_BASE_URL = "https://dropthedrip.koyeb.app";
// const API_BASE_URL = "http://127.0.0.1:8000";

export interface TryOnResponse {
	success: boolean;
	record_id: string;
	result_url: string;
	message: string;
	// URLs of uploaded images
	body_url: string;
	garment_urls: string[];
	// Audit result from backend (auto-audit)
	audit?: TryOnAuditResponse | null;
	// Number of retries performed
	retry_count?: number;
	// Optional rate limit info extracted from headers
	rateLimit?: {
		limit: number;
		remaining: number;
		reset: string;
		total: number;
	};
}

export interface TryOnError {
	detail: string;
}

export interface RateLimitStatus {
	allowed: boolean;
	remaining: number;
	reset_at: string;
	total_today: number;
	limit: number;
	message: string;
}

export interface TryOnAuditPayload {
	model_before: string; // URL or base64
	model_after: string; // URL or base64
	garment1: string; // URL or base64
	garment2?: string; // Optional, URL or base64
}

export interface TryOnAuditResponse {
	clothing_changed: boolean;
	matches_input_garments: boolean;
	visual_quality_score: number; // 0-100
	issues: string[];
	summary: string;
}

/**
 * Convert a base64 data URL to a File object for multipart upload.
 */
function dataURLtoFile(dataUrl: string, filename: string): File {
	const arr = dataUrl.split(",");
	const mimeMatch = arr[0].match(/:(.*?);/);
	const mime = mimeMatch ? mimeMatch[1] : "image/jpeg";
	const bstr = atob(arr[1]);
	let n = bstr.length;
	const u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new File([u8arr], filename, { type: mime });
}

/**
 * Submit a virtual try-on request to the backend.
 *
 * @param bodyImage - Base64 data URL of the model/body image
 * @param garment1Image - Base64 data URL of the first garment
 * @param garment2Image - Optional base64 data URL of the second garment
 * @param turnstileToken - Cloudflare Turnstile token from widget
 * @returns Promise resolving to try-on result with record_id and result_url
 */
export async function submitTryOn(
	bodyImage: string,
	garment1Image: string,
	garment2Image: string | null,
	turnstileToken: string
): Promise<TryOnResponse> {
	const formData = new FormData();

	// Convert base64 data URLs to File objects
	formData.append("body_image", dataURLtoFile(bodyImage, "model.jpg"));
	formData.append(
		"garment_image1",
		dataURLtoFile(garment1Image, "garment1.jpg")
	);

	if (garment2Image) {
		formData.append(
			"garment_image2",
			dataURLtoFile(garment2Image, "garment2.jpg")
		);
	}

	// Make the request with Turnstile token in headers
	const response = await fetch(`${API_BASE_URL}/api/v1/tryon`, {
		method: "POST",
		headers: {
			"X-Turnstile-Token": turnstileToken,
			"test-code": "widetech",
		},
		body: formData,
	});

	if (!response.ok) {
		const errorData: TryOnError = await response.json();
		throw new Error(
			errorData.detail || `HTTP ${response.status}: ${response.statusText}`
		);
	}

	const data: TryOnResponse = await response.json();

	// Extract rate limit headers if present
	const rateLimitHeader = response.headers.get("X-RateLimit-Limit");
	const rateLimitRemaining = response.headers.get("X-RateLimit-Remaining");
	const rateLimitReset = response.headers.get("X-RateLimit-Reset");
	const rateLimitTotal = response.headers.get("X-RateLimit-Total");

	if (rateLimitHeader && rateLimitRemaining && rateLimitReset) {
		data.rateLimit = {
			limit: parseInt(rateLimitHeader),
			remaining: parseInt(rateLimitRemaining),
			reset: rateLimitReset,
			total: rateLimitTotal ? parseInt(rateLimitTotal) : 0,
		};
	}

	return data;
}

/**
 * Audit a try-on output using Gemini vision capabilities.
 *
 * Protected by Turnstile to prevent abuse. Useful for frontend to manually
 * trigger quality checks and track audit history.
 *
 * @param payload - Audit payload with model_before, model_after, garment1, garment2
 * @param turnstileToken - Cloudflare Turnstile token (required, unless test-code provided)
 * @param testCode - Optional test bypass code
 * @returns Promise resolving to audit result with quality metrics
 */
export async function auditTryOnResult(
	payload: TryOnAuditPayload,
	turnstileToken?: string,
	testCode?: string
): Promise<TryOnAuditResponse> {
	const headers: Record<string, string> = {
		"Content-Type": "application/json",
	};

	// Add Turnstile token if provided
	if (turnstileToken) {
		headers["X-Turnstile-Token"] = turnstileToken;
	}

	// Add test code if provided
	if (testCode) {
		headers["test-code"] = testCode;
	}

	const response = await fetch(`${API_BASE_URL}/api/v1/tryon/audit`, {
		method: "POST",
		headers,
		body: JSON.stringify(payload),
	});

	if (!response.ok) {
		const errorData = await response.json();
		const detail = Array.isArray(errorData?.detail)
			? errorData.detail.map((item: { msg?: string }) => item?.msg).join(", ")
			: errorData?.detail;
		throw new Error(
			detail || `HTTP ${response.status}: ${response.statusText}`
		);
	}

	const data: TryOnAuditResponse = await response.json();
	return data;
}

/**
 * Check the current rate limit status for the requesting IP.
 *
 * @returns Promise resolving to rate limit status
 */
export async function getRateLimitStatus(): Promise<RateLimitStatus> {
	const response = await fetch(`${API_BASE_URL}/api/v1/ratelimit`, {
		method: "GET",
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(
			errorData.detail || `HTTP ${response.status}: ${response.statusText}`
		);
	}

	const data: RateLimitStatus = await response.json();
	return data;
}
