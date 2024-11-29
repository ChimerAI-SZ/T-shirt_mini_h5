export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(request: Request) {}

export async function POST(request: Request) {
    console.log(333333333333);
    const res = await fetch('http://47.252.2.86:11118/v1/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'API-Key': process.env.DATA_API_KEY!,
      },
      body: JSON.stringify({ time: new Date().toISOString() }),
    })
   
    const data = await res.json()
   
    return Response.json(data)
  }