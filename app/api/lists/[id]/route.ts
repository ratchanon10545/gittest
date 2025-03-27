import { NextResponse } from 'next/server';
import connection from '@/lib/db';


export async function GET(request : Request, { params }: { params:Promise<{ id: string }> }) {
    
    try {
        const id = (await params).id;
        // console.log(id)
        const [rows] : any = await (await connection).execute("SELECT * FROM list WHERE id = ?", [id]);
        if (rows.length === 0) {
            return NextResponse.json({ error: "List not found" }, { status: 404 });
        }
        
        return NextResponse.json(rows[0]);
      } catch (error) {
        console.error("Database Error:", error);
        return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
      }
}

export async function PUT(request : Request, { params }: { params:Promise<{ id: string }> }) {
    const id = (await params).id;
    const { title } = await request.json();

    if (!title) {
        return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }
    try {
        await (await connection).execute("UPDATE list SET title = ? WHERE id = ?", [title, id]);
        
        return NextResponse.json({ success: true });
    } catch (error) {
      console.error("Database Error:", error);
      return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
    }
}

export async function DELETE(request : Request, { params }: { params:Promise<{ id: string }> }) {
    const id = (await params).id;
    try {
        await (await connection).execute("DELETE FROM list WHERE id = ?", [id]);
        
        return NextResponse.json({ success: true });
    } catch (error) {
      console.error("Database Error:", error);
      return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
    }
}