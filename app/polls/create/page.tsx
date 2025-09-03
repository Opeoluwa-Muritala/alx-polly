'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

export default function CreatePollPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [activeTab, setActiveTab] = useState('basic'); // 'basic' or 'settings'
  const [allowMultipleOptions, setAllowMultipleOptions] = useState(false);
  const [requireLogin, setRequireLogin] = useState(true);
  const [endDate, setEndDate] = useState('');

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, '']);
  };

  const removeOption = (index: number) => {
    if (options.length <= 2) return; // Minimum 2 options
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const filteredOptions = options.filter(option => option.trim() !== '');
      
      if (filteredOptions.length < 2) {
        setError('Please provide at least 2 options');
        setIsSubmitting(false);
        return;
      }
      
      const pollData = {
        title,
        description,
        options: filteredOptions,
        allowMultipleOptions,
        requireLogin,
        endDate: endDate || null,
      };
      
      const response = await fetch('/api/polls', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pollData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create poll');
      }
      
      const newPoll = await response.json();
      setSuccess(true);
      
      // Redirect to the new poll page after a short delay
      setTimeout(() => {
        router.push(`/polls/${newPoll.id}`);
      }, 1500);
    } catch (err) {
      console.error('Error creating poll:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Create New Poll</h1>
        <Link href="/polls">
          <Button variant="outline">Cancel</Button>
        </Link>
      </div>
      
      {/* Tabs */}
      <div className="flex mb-6 border-b">
        <button
          className={`py-2 px-4 ${activeTab === 'basic' ? 'border-b-2 border-primary font-medium' : 'text-muted-foreground'}`}
          onClick={() => setActiveTab('basic')}
        >
          Basic Info
        </button>
        <button
          className={`py-2 px-4 ${activeTab === 'settings' ? 'border-b-2 border-primary font-medium' : 'text-muted-foreground'}`}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </button>
      </div>
      
      <form onSubmit={handleSubmit}>
        {activeTab === 'basic' && (
          <Card>
            <CardHeader>
              <CardTitle>Poll Information</CardTitle>
              <CardDescription>Enter the details for your new poll</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Poll Title
                </label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter a question or title"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description (Optional)
                </label>
                <Input
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide more context about your poll"
                />
              </div>

              <div className="space-y-4">
                <label className="text-sm font-medium">Poll Options</label>
                {options.map((option, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={option}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      placeholder={`Option ${index + 1}`}
                      required
                    />
                    {options.length > 2 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => removeOption(index)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addOption}
                  className="w-full"
                >
                  Add Option
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        
        {activeTab === 'settings' && (
          <Card>
            <CardHeader>
              <CardTitle>Poll Settings</CardTitle>
              <CardDescription>Configure additional options for your poll</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="multiple-options" 
                  checked={allowMultipleOptions}
                  onCheckedChange={(checked) => setAllowMultipleOptions(checked as boolean)}
                />
                <label htmlFor="multiple-options" className="text-sm font-medium cursor-pointer">
                  Allow users to select multiple options
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="require-login" 
                  checked={requireLogin}
                  onCheckedChange={(checked) => setRequireLogin(checked as boolean)}
                />
                <label htmlFor="require-login" className="text-sm font-medium cursor-pointer">
                  Require users to be logged in to vote
                </label>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="end-date" className="text-sm font-medium">
                  Poll End Date (Optional)
                </label>
                <Input
                  id="end-date"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        )}
        
        <div className="mt-6 flex justify-end">
          <Button type="submit" className="bg-primary hover:bg-primary/90">
            Create Poll
          </Button>
        </div>
        </form>
    </div>
  );
}