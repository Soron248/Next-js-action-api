import { NextResponse } from "next/server";
import connectMongoDB from "../../../../../libs/mongodb";
import Topic from "../../../../../models/topic";

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const { newTitle: title, newDescription: description } = await req.json();

    if (!title || !description) {
      return NextResponse.json(
        { message: "Missing new title and description" },
        { status: 400 }
      );
    }

    await connectMongoDB();
    const updatedTopic = await Topic.findByIdAndUpdate(id, {
      title,
      description,
    });

    if (!updatedTopic) {
      return NextResponse.json({ message: "Topic not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Topic updated" }, { status: 200 });
  } catch (error) {
    console.error("Error updating topic:", error);
    return NextResponse.json(
      { message: "Error updating topic" },
      { status: 500 }
    );
  }
}

export async function GET(req, { params }) {
  try {
    const { id } = params;

    await connectMongoDB();

    const topic = await Topic.findOne({ _id: id });

    if (!topic) {
      return NextResponse.json({ message: "Topic not found" }, { status: 404 });
    }

    return NextResponse.json({ topic }, { status: 200 });
  } catch (error) {
    console.error("Error fetching topic:", error);
    return NextResponse.json(
      { message: "Error fetching topic" },
      { status: 500 }
    );
  }
}
