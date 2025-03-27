import { NextResponse } from 'next/server';
import connection from '@/lib/db';

export async function PUT(request : Request ,{params} : {params:Promise<{ id: string }>}){
    const id = (await params).id;
    const { completed } = await request.json();
    // console.log(completed)
    try {
        await (await connection).execute("UPDATE list SET completed = ? WHERE id = ?", [completed, id]);
        return NextResponse.json({ success: true });
    } catch (error) {
      console.error("Database Error:", error);
      return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
    }
    
}