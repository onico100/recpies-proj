"use server";
import { NextResponse } from "next/server";
import { getAllDocuments, connectDatabase } from "@/services/mongo";

export async function GET(req: Request) {
  const client = await connectDatabase();
  const recipes = await getAllDocuments(client, "categories");
  return NextResponse.json(recipes);
}
