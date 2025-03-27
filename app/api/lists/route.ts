import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import mysql from 'mysql2/promise';


export async function GET(request: Request) {
    try {
        const [rows] = await pool.query("SELECT * FROM list");
        return NextResponse.json(rows);
      } catch (error) {
        console.error("Database Error:", error);
        return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
      }
    // try{
    //     const connection = mysql.createConnection(dbConfig);
    // // console.log(connection);
    //     const [rows]: any = (await connection).execute('SELECT * FROM list');
    //     (await connection).end();
    //     return NextResponse.json(rows);
    // }
    // catch(e){
    //     const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred';
    //     console.error(errorMessage);
    //     return NextResponse.error();
    // }
}