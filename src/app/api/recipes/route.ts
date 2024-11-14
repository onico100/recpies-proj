"use server";
import { NextResponse } from "next/server";
import { getAllDocuments, connectDatabase, insertDocument } from "@/services/mongo";
import { ObjectId } from "mongodb";
import { databaseName } from "@/services/mongo";

export async function GET(req: Request) {
  const client = await connectDatabase();
  const recipes = await getAllDocuments(client, "recipes");
  client.close();
  return NextResponse.json(recipes);
}

export async function POST(req: Request) {
  const client = await connectDatabase();
  const newRecipe = await req.json()
  try {
    const result = await insertDocument(client, 'recipes', newRecipe);
    client.close();
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    client.close();
    return NextResponse.json({ error: 'Failed to add recipe' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const client = await connectDatabase();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("_id");

  if (!id) {
    return NextResponse.json({ message: "ID parameter is required" });
  }

  try {
    const db = client.db(databaseName);
    const result = await db
      .collection("recipes")
      .deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return NextResponse.json({ message: "No recipe found with this ID" });
    }
    return NextResponse.json({ message: "recipe deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting recipe", error });
  } finally {
    client.close();
  }
}

export async function PATCH(req: Request) {
  const client = await connectDatabase();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("_id");

  if (!id) {
    return NextResponse.json(
      { message: "ID parameter is required" },
      { status: 400 }
    );
  }

  const updatedData = await req.json();

  try {
    const db = client.db(databaseName);
    const result = await db
      .collection("recipes")
      .updateOne({ _id: new ObjectId(id) }, { $set: updatedData });
    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { message: "No recipe found with this ID or no changes made" },
        { status: 404 }
      );
    }
    return NextResponse.json({ message: "Recipe updated successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating recipe", error },
      { status: 500 }
    );
  } finally {
    client.close();
  }
}
