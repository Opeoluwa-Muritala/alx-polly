import { NextRequest, NextResponse } from 'next/server';

// Mock data for polls (same as in the main polls route)
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

// GET /api/polls/[id] - Get a specific poll by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const pollId = params.id;
    
    // In a real application, you would fetch the poll from a database
    const poll = mockPolls.find((p) => p.id === pollId);
    
    if (!poll) {
      return NextResponse.json(
        { error: 'Poll not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(poll, { status: 200 });
  } catch (error) {
    console.error('Error fetching poll:', error);
    return NextResponse.json(
      { error: 'Failed to fetch poll' },
      { status: 500 }
    );
  }
}

// PATCH /api/polls/[id] - Vote on a poll
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const pollId = params.id;
    const { optionId } = await request.json();
    
    // In a real application, you would update the poll in a database
    const poll = mockPolls.find((p) => p.id === pollId);
    
    if (!poll) {
      return NextResponse.json(
        { error: 'Poll not found' },
        { status: 404 }
      );
    }
    
    const option = poll.options.find((o) => o.id === optionId);
    
    if (!option) {
      return NextResponse.json(
        { error: 'Option not found' },
        { status: 404 }
      );
    }
    
    // Increment vote count (this is just a mock, the actual data won't be updated)
    option.votes += 1;
    poll.totalVotes += 1;
    
    return NextResponse.json(poll, { status: 200 });
  } catch (error) {
    console.error('Error voting on poll:', error);
    return NextResponse.json(
      { error: 'Failed to vote on poll' },
      { status: 500 }
    );
  }
}

// DELETE /api/polls/[id] - Delete a poll
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const pollId = params.id;
    
    // In a real application, you would delete the poll from a database
    const pollIndex = mockPolls.findIndex((p) => p.id === pollId);
    
    if (pollIndex === -1) {
      return NextResponse.json(
        { error: 'Poll not found' },
        { status: 404 }
      );
    }
    
    // This is just a mock, the actual data won't be updated
    return NextResponse.json(
      { message: 'Poll deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting poll:', error);
    return NextResponse.json(
      { error: 'Failed to delete poll' },
      { status: 500 }
    );
  }
}