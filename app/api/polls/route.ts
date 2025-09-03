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
    const { supabase } = await import('@/lib/supabase');
    
    // Fetch polls from Supabase
    const { data: polls, error: pollsError } = await supabase
      .from('polls')
      .select('*')
      .order('created_at', { ascending: false });

    if (pollsError) {
      console.error('Error fetching polls:', pollsError);
      return NextResponse.json(
        { error: 'Failed to fetch polls' },
        { status: 500 }
      );
    }

    // For each poll, fetch its options
    const pollsWithOptions = await Promise.all(
      polls.map(async (poll) => {
        const { data: options, error: optionsError } = await supabase
          .from('options')
          .select('*')
          .eq('poll_id', poll.id);

        if (optionsError) {
          console.error(`Error fetching options for poll ${poll.id}:`, optionsError);
          return poll;
        }

        return {
          ...poll,
          options,
        };
      })
    );

    return NextResponse.json(pollsWithOptions, { status: 200 });
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
    const { title, description, options, allowMultipleOptions, requireLogin, endDate } = await request.json();

    // Validate input
    if (!title || !options || options.length < 2) {
      return NextResponse.json(
        { error: 'Invalid poll data. Title and at least 2 options are required.' },
        { status: 400 }
      );
    }

    // Get user from session
    const { supabase } = await import('@/lib/supabase');
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    // Insert poll into database
    const { data: poll, error: pollError } = await supabase
      .from('polls')
      .insert({
        title,
        description,
        created_by: userId,
        total_votes: 0,
        // Add additional fields if needed
      })
      .select()
      .single();

    if (pollError) {
      console.error('Error creating poll:', pollError);
      return NextResponse.json(
        { error: 'Failed to create poll' },
        { status: 500 }
      );
    }

    // Insert options
    const optionsToInsert = options
      .filter((option: string) => option.trim() !== '')
      .map((option: string) => ({
        poll_id: poll.id,
        text: option,
        votes: 0,
      }));

    const { data: insertedOptions, error: optionsError } = await supabase
      .from('options')
      .insert(optionsToInsert)
      .select();

    if (optionsError) {
      console.error('Error creating poll options:', optionsError);
      return NextResponse.json(
        { error: 'Failed to create poll options' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ...poll,
      options: insertedOptions,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating poll:', error);
    return NextResponse.json(
      { error: 'Failed to create poll' },
      { status: 500 }
    );
  }
}