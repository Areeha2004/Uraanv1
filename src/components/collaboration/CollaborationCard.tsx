import React from 'react';
import { Calendar, DollarSign, FileText, AlertTriangle, Mail, User } from 'lucide-react';
import CollaborationStatusBadge from './CollaborationStatusBadge';

interface CollaborationCardProps {
  collaboration: {
    id: string;
    contactMethod?: string;
    title: string;
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
    if (!budget) return 'No budget specified';
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
    <div className="bg-white/60 backdrop-blur-lg border border-secondary/20 rounded-2xl p-6 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-4">
          <img
            src={collaborator.image || '/default-profile.png'}
            alt={collaborator.name}
            className="w-14 h-14 rounded-full object-cover border-2 border-primary/30 shadow-sm"
          />

          <div>
            <h3 className="text-lg font-semibold text-text">{collaborator.name}</h3>
            <p className="text-sm text-text/60 flex items-center gap-1">
              <User size={14} className="text-primary" />
              {role}
            </p>
          </div>
        </div>

        <CollaborationStatusBadge status={collaboration.status} size="md" />
      </div>

      {/* Project Title */}
      {collaboration.title && (
        <h4 className="text-base font-semibold text-text mb-2">
          {collaboration.title}
        </h4>
      )}

      {/* Project Description */}
      <div className="mb-5 bg-secondary/10 p-3 rounded-xl">
        <div className="flex items-start space-x-2 mb-1">
          <FileText className="text-primary mt-0.5" size={16} />
          <span className="text-sm font-medium text-text">Project Description</span>
        </div>
        <p className="text-sm text-text/70 leading-relaxed pl-6 max-h-20 line-clamp-4">
          {collaboration.projectDescription || 'No description provided'}
        </p>
      </div>

      {/* Budget & Contact */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

        {/* Budget */}
        <div className="flex items-center space-x-2">
          <DollarSign className="text-primary" size={18} />
          <span className="text-sm font-medium text-text">
            {formatBudget(collaboration.budget)}
          </span>
        </div>

        {/* Contact */}
        {collaboration.contactMethod && (
          <div className="flex items-center space-x-2">
            <Mail className="text-primary" size={16} />
            <span className="text-sm text-text/70">{collaboration.contactMethod}</span>
          </div>
        )}
      </div>

      {/* Deadline & Days Left */}
      <div className="flex items-center justify-between border-t pt-4">

        <div className="flex items-center space-x-2">
          <Calendar className="text-primary" size={16} />
          <span className="text-sm text-text/70">
            {collaboration.deadline
              ? formatDate(collaboration.deadline)
              : 'No deadline set'}
          </span>
        </div>

        {daysLeftInfo && (
          <div
            className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
              daysLeftInfo.isOverdue
                ? 'bg-red-100 text-red-700'
                : 'bg-blue-100 text-blue-700'
            }`}
          >
            {daysLeftInfo.isOverdue && <AlertTriangle size={12} />}
            <span>{daysLeftInfo.text}</span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-4 text-xs text-text/50">
        Created on {formatDate(collaboration.createdAt)}
      </div>
    </div>
  );
};

export default CollaborationCard;
