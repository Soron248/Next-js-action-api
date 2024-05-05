import { NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import Topic from "../../../../models/topic";

export async function POST(req) {
  try {
    const { title, description } = await req.json();

    // Input validation
    if (!title || !description) {
      return NextResponse.json(
        { message: "Invalid input data" },
        { status: 400 }
      );
    }

    await connectMongoDB();
    await Topic.create({ title, description });

    return NextResponse.json({ message: "Topic Created" }, { status: 201 });
  } catch (error) {
    // Handle any unexpected errors
    console.error("Error creating topic:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectMongoDB();
    const topics = await Topic.find();
    if (topics.length === 0) {
      return NextResponse.json({ topics: [] });
    }
    return NextResponse.json({ topics });
  } catch (error) {
    console.error("Error creating topic:", error);
    return NextResponse.json(
      { message: "Error retrieving topics" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { message: "Missing ID parameter" },
        { status: 400 }
      );
    }

    await connectMongoDB();
    const deletedTopic = await Topic.findByIdAndDelete(id);

    if (!deletedTopic) {
      return NextResponse.json({ message: "Topic not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting topic:", error);
    return NextResponse.json(
      { message: "Error deleting topic" },
      { status: 500 }
    );
  }
}
