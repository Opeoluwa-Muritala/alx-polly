import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    // This is a placeholder for actual user registration logic
    // In a real application, you would validate input and store user data in a database
    if (name && email && password) {
      // Mock successful registration
      return NextResponse.json(
        {
          user: {
            id: '1',
            name,
            email,
          },
          message: 'Registration successful',
        },
        { status: 201 }
      );
    }

    // Invalid input
    return NextResponse.json(
      { error: 'Invalid input data' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    );
  }
}