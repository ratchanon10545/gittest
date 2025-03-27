import { NextResponse } from 'next/server';
import connection from '@/lib/db';

export async function GET(request: Request) {
    try {
        const [rows] = await (await connection).execute("SELECT * FROM list");
        
        return NextResponse.json(rows);
      } catch (error) {
        console.error("Database Error:", error);
        return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
      }
   
}

export async function POST(request: Request) {
    const { title } = await request.json();
    try {
        await (await connection).execute("INSERT INTO list (title) VALUES (?)", [title]);
        
        return NextResponse.json({ success: true });
      } catch (error) {
        console.error("Database Error:", error);
        return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
      }
   
}
