import React from 'react';
import { Calendar, DollarSign, FileText, AlertTriangle } from 'lucide-react';
import CollaborationStatusBadge from './CollaborationStatusBadge';

interface CollaborationCardProps {
  collaboration: {
    id: string;
    status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'declined' | 'cancelled';
    projectDescription?: string;
    budget?: number;
    deadline?: string;
    createdAt: string;
  };
  collaborator: {
    id: string;
    name: string;
    image?: string;
  };
  role: string;
  isClient: boolean;
  daysLeftInfo: { text: string; isOverdue: boolean } | null;
}

const CollaborationCard: React.FC<CollaborationCardProps> = ({
  collaboration,
  collaborator,
  role,
  isClient,
  daysLeftInfo
}) => {
  const formatBudget = (budget?: number) => {
    if (!budget) return 'Budget not specified';
    return `₨${budget.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 hover:shadow-lg hover:shadow-glass-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img
            src={collaborator.image || '/default-profile.png'}
            alt={collaborator.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
          />
          <div>
            <h3 className="font-bold text-text">{collaborator.name}</h3>
            <p className="text-sm text-text/60">{role}</p>
          </div>
        </div>
        <CollaborationStatusBadge status={collaboration.status} size="sm" />
      </div>

      {/* Project Description */}
      <div className="mb-4">
        <div className="flex items-start space-x-2 mb-2">
          <FileText className="text-primary mt-0.5" size={16} />
          <span className="text-sm font-medium text-text">Project:</span>
        </div>
        <p className="text-sm text-text/70 leading-relaxed line-clamp-3 pl-6">
          {collaboration.projectDescription || 'No description provided'}
        </p>
      </div>

      {/* Budget */}
      <div className="flex items-center space-x-2 mb-4">
        <DollarSign className="text-primary" size={16} />
        <span className="text-sm font-medium text-text">
          {formatBudget(collaboration.budget)}
        </span>
      </div>

      {/* Deadline & Days Left */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Calendar className="text-primary" size={16} />
          <span className="text-sm text-text/70">
            {collaboration.deadline 
              ? formatDate(collaboration.deadline)
              : 'No deadline set'
            }
          </span>
        </div>
        
        {daysLeftInfo && (
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
            daysLeftInfo.isOverdue 
              ? 'bg-red-100 text-red-700' 
              : 'bg-blue-100 text-blue-700'
          }`}>
            {daysLeftInfo.isOverdue && <AlertTriangle size={12} />}
            <span>{daysLeftInfo.text}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollaborationCard;