/**
 * API service for communicating with the virtual try-on backend.
 * Backend expects multipart form data with images and Turnstile token in headers.
 */

// const API_BASE_URL = "https://mines-cinema-star-distant.trycloudflare.com";
const API_BASE_URL = "https://dropthedrip.koyeb.app";

export interface TryOnResponse {
	success: boolean;
	record_id: string;
	result_url: string;
	message: string;
}

export interface TryOnError {
	detail: string;
}

export interface TryOnAuditPayload {
	model_before: string;
	model_after: string;
	garment1: string;
	garment2?: string;
}

export interface TryOnAuditResponse {
	clothing_changed: boolean;
	matches_input_garments: boolean;
	visual_quality_score: number;
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
	return data;
}

/**
 * Audit a generated try-on result using the backend vision audit endpoint.
 */
export async function auditTryOnResult(
	payload: TryOnAuditPayload
): Promise<TryOnAuditResponse> {
	const response = await fetch(`${API_BASE_URL}/api/v1/tryon/audit`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
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
