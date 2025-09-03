'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

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
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [isVoting, setIsVoting] = useState(false);

  const handleVote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOption) return;

    setIsVoting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log(`Voted for option: ${selectedOption}`);
    setIsVoting(false);
    setHasVoted(true);
    
    // In a real implementation, we would refresh the data
    // router.refresh();
  };

  // Calculate percentages for the progress bars
  const getPercentage = (votes: number) => {
    return mockPoll.totalVotes > 0 ? Math.round((votes / mockPoll.totalVotes) * 100) : 0;
  };
  
  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Poll Details</h1>
        <Link href="/polls">
          <Button variant="outline">Back to Polls</Button>
        </Link>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{mockPoll.title}</CardTitle>
              <CardDescription className="text-base mt-2">{mockPoll.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleVote}>
                <div className="space-y-6">
                  {mockPoll.options.map((option) => (
                    <div key={option.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id={option.id}
                            name="poll-option"
                            value={option.id}
                            onChange={() => setSelectedOption(option.id)}
                            disabled={hasVoted}
                            className="mr-2"
                          />
                          <label htmlFor={option.id} className="font-medium text-base">
                            {option.text}
                          </label>
                        </div>
                        <span className="text-sm font-medium">
                          {getPercentage(option.votes)}%
                        </span>
                      </div>
                      <Progress value={getPercentage(option.votes)} className="h-2" />
                      <div className="text-sm text-muted-foreground">
                        {option.votes} votes
                      </div>
                    </div>
                  ))}
                </div>
                
                {!hasVoted ? (
                  <Button 
                    type="submit" 
                    className="mt-6 w-full md:w-auto" 
                    disabled={!selectedOption || isVoting}
                  >
                    {isVoting ? 'Voting...' : 'Submit Vote'}
                  </Button>
                ) : (
                  <div className="mt-6 p-4 bg-muted rounded-md text-center">
                    Thank you for voting!
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Poll Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Created by</h3>
                  <p>{mockPoll.createdBy}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Created on</h3>
                  <p>{formatDate(mockPoll.createdAt)}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Total votes</h3>
                  <p>{mockPoll.totalVotes}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}