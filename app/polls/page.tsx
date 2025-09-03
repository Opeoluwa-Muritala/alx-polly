'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Mock data for polls
const polls = [
  {
    id: '1',
    title: 'What is your favorite programming language?',
    description: 'Please select the programming language you enjoy working with the most.',
    optionsCount: 4,
    totalVotes: 126,
    createdBy: 'user@example.com',
    createdAt: '2023-05-15',
    endDate: '2023-06-15',
    isActive: true,
  },
  {
    id: '2',
    title: 'Which frontend framework do you prefer?',
    description: 'Vote for your preferred frontend framework or library.',
    optionsCount: 5,
    totalVotes: 89,
    createdBy: 'user@example.com',
    createdAt: '2023-05-10',
    endDate: '2023-06-10',
    isActive: true,
  },
  {
    id: '3',
    title: 'How often do you deploy to production?',
    description: 'Share your deployment frequency.',
    optionsCount: 4,
    totalVotes: 72,
    createdBy: 'user@example.com',
    createdAt: '2023-05-05',
    endDate: '2023-05-20',
    isActive: false,
  },
  {
    id: '4',
    title: 'What database do you use for your projects?',
    description: 'Share your preferred database technology.',
    optionsCount: 6,
    totalVotes: 103,
    createdBy: 'user@example.com',
    createdAt: '2023-05-18',
    endDate: '2023-06-18',
    isActive: true,
  },
  {
    id: '5',
    title: 'Which cloud provider do you prefer?',
    description: 'Vote for your favorite cloud service provider.',
    optionsCount: 5,
    totalVotes: 94,
    createdBy: 'user@example.com',
    createdAt: '2023-05-12',
    endDate: '2023-06-12',
    isActive: true,
  },
  {
    id: '6',
    title: 'How do you manage state in your React applications?',
    description: 'Share your preferred state management approach.',
    optionsCount: 5,
    totalVotes: 67,
    createdBy: 'user@example.com',
    createdAt: '2023-05-08',
    endDate: '2023-05-22',
    isActive: false,
  },
];

export default function PollsPage() {
  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">All Polls</h1>
        <Link href="/polls/create">
          <Button>Create New Poll</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {polls.map((poll) => (
          <Card key={poll.id} className="flex flex-col h-full">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{poll.title}</CardTitle>
                {poll.isActive ? (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Active
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-gray-50 text-gray-500 border-gray-200">
                    Closed
                  </Badge>
                )}
              </div>
              <CardDescription className="line-clamp-2 mt-2">
                {poll.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-2 flex-grow">
              <div className="grid grid-cols-2 gap-y-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Options:</span> {poll.optionsCount}
                </div>
                <div>
                  <span className="text-muted-foreground">Votes:</span> {poll.totalVotes}
                </div>
                <div className="col-span-2">
                  <span className="text-muted-foreground">Created:</span> {formatDate(poll.createdAt)}
                </div>
                <div className="col-span-2">
                  <span className="text-muted-foreground">Ends:</span> {formatDate(poll.endDate)}
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <Link href={`/polls/${poll.id}`} className="w-full">
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}