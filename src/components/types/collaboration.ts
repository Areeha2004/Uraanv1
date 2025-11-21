// src/types/collaboration.ts
export type CollaborationStatus =
  | 'pending'
  | 'accepted'
  | 'in_progress'
  | 'completed'
  | 'declined'
  | 'cancelled';

export interface Collaboration {
  id: string;
  title: string;
  contactMethod?: string; 
  requesterId: string;
  receiverId: string;
  status: CollaborationStatus;
  projectDescription?: string;
  budget?: number;
  deadline?: string;
  createdAt: string;
  updatedAt: string;      // Make sure this matches everywhere
  requester: {
    id: string;
    name: string;
    image?: string;
  };
  receiver: {
    id: string;
    name: string;
    image?: string;
  };
  daysLeft?: number;
}
