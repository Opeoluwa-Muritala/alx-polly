'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

// Mock data for a single poll
const mockPoll = {
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
};

export default function PollPage({ params }: { params: { id: string } }) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = () => {
    if (selectedOption) {
      // This is a placeholder for actual voting logic
      console.log('Voted for option:', selectedOption);
      setHasVoted(true);
    }
  };

  // Calculate percentages for the progress bars
  const getPercentage = (votes: number) => {
    return mockPoll.totalVotes > 0 ? Math.round((votes / mockPoll.totalVotes) * 100) : 0;
  };

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">{mockPoll.title}</CardTitle>
          <CardDescription>{mockPoll.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockPoll.options.map((option) => (
            <div key={option.id} className="space-y-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id={option.id}
                  name="poll-option"
                  value={option.id}
                  onChange={() => setSelectedOption(option.id)}
                  disabled={hasVoted}
                  className="mr-2"
                />
                <label htmlFor={option.id} className="flex-1">
                  {option.text}
                </label>
                <span className="text-sm font-medium">
                  {getPercentage(option.votes)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-primary h-2.5 rounded-full"
                  style={{ width: `${getPercentage(option.votes)}%` }}
                ></div>
              </div>
              <p className="text-sm text-muted-foreground">
                {option.votes} votes
              </p>
            </div>
          ))}

          <div className="pt-4">
            <p className="text-sm text-muted-foreground">
              Total votes: {mockPoll.totalVotes}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div>
            <p className="text-sm text-muted-foreground">
              Created by {mockPoll.createdBy} on {mockPoll.createdAt}
            </p>
          </div>
          <Button onClick={handleVote} disabled={!selectedOption || hasVoted}>
            {hasVoted ? 'Voted' : 'Vote'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}