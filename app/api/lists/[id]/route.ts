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