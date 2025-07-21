import { NextResponse } from 'next/server';
import axios from 'axios';
import RiskQuestionModel from '@/lib/models/RiskQuestionModel';

export async function GET(request) {
  try {
 
 
    const questions = await RiskQuestionModel.find({});
    const hasActiveStatus = questions.some((q) => q.status === true);
 
    if (hasActiveStatus) {
      return NextResponse.json(questions, { status: 200 });
    }
 
    if (questions.length === 0) {
      // First time: fetch from API and save to DB
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_DATA_API}/api/open-apis/risk-questions?apikey=${process.env.NEXT_PUBLIC_API_KEY}`
      );
 
      const formattedQuestions = response.data.map((item) => ({
        question: item.question,
        answers: item.answers,
        status: false,
      }));
 
      await RiskQuestionModel.insertMany(formattedQuestions);
 
      return NextResponse.json(formattedQuestions, { status: 200 });
    }
 
    // DB has data but all status = false → fetch from API but do NOT save
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_DATA_API}/api/open-apis/risk-questions?apikey=${process.env.NEXT_PUBLIC_API_KEY}`
    );
 
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error("Error fetching risk questions:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
} 



export async function PUT(req, { params }) {
  await dbConnect();

  try {
    const { question, answers } = await req.json();

    if (!question || !Array.isArray(answers)) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const updated = await RiskQuestionModel.findByIdAndUpdate(
      params.id,
      { question, answers },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: "Question not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json({ error: "Failed to update question" }, { status: 500 });
  }
}