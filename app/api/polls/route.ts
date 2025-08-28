import { NextRequest, NextResponse } from 'next/server';

// Mock data for polls
const mockPolls = [
  {
    id: '1',
    title: 'Favorite Programming Language',
    description: 'What is your favorite programming language?',
    options: [
      { id: '1', text: 'JavaScript', votes: 15 },
      { id: '2', text: 'Python', votes: 12 },
      { id: '3', text: 'Java', votes: 8 },
      { id: '4', text: 'C#', votes: 5 },
      { id: '5', text: 'Go', votes: 2 },
    ],
    totalVotes: 42,
    createdBy: 'John Doe',
    createdAt: '2023-05-15',
  },
  {
    id: '2',
    title: 'Best Frontend Framework',
    description: 'Which frontend framework do you prefer?',
    options: [
      { id: '1', text: 'React', votes: 20 },
      { id: '2', text: 'Vue', votes: 10 },
      { id: '3', text: 'Angular', votes: 5 },
      { id: '4', text: 'Svelte', votes: 3 },
    ],
    totalVotes: 38,
    createdBy: 'Jane Smith',
    createdAt: '2023-05-10',
  },
  {
    id: '3',
    title: 'Preferred Database',
    description: 'What database do you use most often?',
    options: [
      { id: '1', text: 'PostgreSQL', votes: 10 },
      { id: '2', text: 'MySQL', votes: 8 },
      { id: '3', text: 'MongoDB', votes: 5 },
      { id: '4', text: 'SQLite', votes: 3 },
      { id: '5', text: 'Redis', votes: 1 },
    ],
    totalVotes: 27,
    createdBy: 'Alex Johnson',
    createdAt: '2023-05-05',
  },
];

// GET /api/polls - Get all polls
export async function GET() {
  try {
    // In a real application, you would fetch polls from a database
    return NextResponse.json(mockPolls, { status: 200 });
  } catch (error) {
    console.error('Error fetching polls:', error);
    return NextResponse.json(
      { error: 'Failed to fetch polls' },
      { status: 500 }
    );
  }
}

// POST /api/polls - Create a new poll
export async function POST(request: NextRequest) {
  try {
    const { title, description, options } = await request.json();

    // Validate input
    if (!title || !options || options.length < 2) {
      return NextResponse.json(
        { error: 'Invalid poll data. Title and at least 2 options are required.' },
        { status: 400 }
      );
    }

    // In a real application, you would save the poll to a database
    // For now, we'll just return a mock response
    const newPoll = {
      id: (mockPolls.length + 1).toString(),
      title,
      description,
      options: options.map((option: string, index: number) => ({
        id: (index + 1).toString(),
        text: option,
        votes: 0,
      })),
      totalVotes: 0,
      createdBy: 'Current User',
      createdAt: new Date().toISOString().split('T')[0],
    };

    return NextResponse.json(newPoll, { status: 201 });
  } catch (error) {
    console.error('Error creating poll:', error);
    return NextResponse.json(
      { error: 'Failed to create poll' },
      { status: 500 }
    );
  }
}