/**
 * Cloudflare Worker for Proxying Subscription URL Content
 * Author: SeRaMo ( https://github.com/seramo/ )
 */

addEventListener('fetch', (event) => {
    event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
    const url = new URL(request.url);

    // Get the 'url' parameter from query string
    const userProvidedUrl = url.searchParams.get('url');

    // If no URL is provided, return an error response
    if (!userProvidedUrl) {
        return new Response('URL parameter is required', { status: 400 });
    }

    try {
        // Fetch the content of the user-provided URL
        const response = await fetch(userProvidedUrl);
        const content = await response.text();

        // Return the fetched content as the response
        return new Response(content, {
            status: 200,
            headers: { 'Content-Type': 'text/plain' }
        });
    } catch (error) {
        // Handle any errors that occur during the fetch
        return new Response('Error fetching the provided URL', { status: 500 });
    }
}