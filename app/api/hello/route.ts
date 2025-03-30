export async function GET() {
    return new Response(JSON.stringify({ message: 'Hello from a Next.js route handler!' }), {
        status: 200,
    });
}

export async function POST() {
    return new Response('Thank you for posting this handler!', {
        status: 200,
    });
}