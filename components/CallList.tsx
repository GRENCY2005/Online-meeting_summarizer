'use client'

import { useGetCalls } from '@/hooks/useGetCalls'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import MeetingCard from './MeetingCard';
import { Loader, Video, Calendar, Clock } from 'lucide-react';

export const CallList = ({ type }: { type: 'ended' | 'upcoming' | 'recordings' }) => {
  const { endedCalls, upcomingCalls, callrecordings, isLoading } = useGetCalls();
  const router = useRouter();
  const [recordings, setRecordings] = useState<any[]>([]);
  const { toast } = useToast();

  const getCalls = () => {
    switch (type) {
      case 'ended':
        return endedCalls;
      case 'recordings':
        return recordings;
      case 'upcoming':
        return upcomingCalls;
      default:
        return [];
    }
  };

  const getEmptyStateConfig = () => {
    switch (type) {
      case 'ended':
        return {
          icon: Clock,
          title: 'No Previous Calls',
          description: 'Your past meetings will appear here'
        };
      case 'recordings':
        return {
          icon: Video,
          title: 'No Recordings',
          description: 'Recording sessions will be saved here'
        };
      case 'upcoming':
        return {
          icon: Calendar,
          title: 'No Upcoming Calls',
          description: 'Schedule a meeting to get started'
        };
      default:
        return {
          icon: Video,
          title: 'No Calls',
          description: ''
        };
    }
  };

  const calls = getCalls();
  const emptyState = getEmptyStateConfig();
  const EmptyIcon = emptyState.icon;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <Loader className="w-10 h-10 animate-spin text-blue-500" />
          <p className="text-sm text-gray-500">Loading calls...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {calls && calls.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {/* Mapping would go here if backend supported call history */}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[400px] px-4 py-12 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-300">
          <div className="flex flex-col items-center gap-4 max-w-md text-center">
            <div className="p-4 rounded-full bg-white shadow-lg">
              <EmptyIcon className="w-12 h-12 text-gray-400" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-gray-800">
                {emptyState.title}
              </h3>
              <p className="text-sm text-gray-500">
                {emptyState.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CallList;