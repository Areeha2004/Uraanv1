import React from 'react';
import { Calendar, DollarSign, User, AlertTriangle } from 'lucide-react';
import CollaborationStatusBadge from './CollaborationStatusBadge';
import { Collaboration } from '../types/collaboration';


interface CollaborationTableProps {
  collaborations: Collaboration[];
  currentUserId: string;
  getCollaboratorInfo: (collaboration: Collaboration, currentUserId: string) => {
    collaborator: { id: string; name: string; image?: string; };
    role: string;
    isClient: boolean;
  };
  formatDaysLeft: (daysLeft?: number) => { text: string; isOverdue: boolean } | null;
}

const CollaborationTable: React.FC<CollaborationTableProps> = ({
  collaborations,
  currentUserId,
  getCollaboratorInfo,
  formatDaysLeft
}) => {
  const formatBudget = (budget?: number) => {
    if (!budget) return 'Not specified';
    return `₨${budget.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const calculateDaysLeft = (deadline?: string) => {
    if (!deadline) return null;
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-2xl overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-secondary/10 border-b border-secondary/20">
            <tr>
              <th className="text-left p-4 font-semibold text-text">Collaborator</th>
              <th className="text-left p-4 font-semibold text-text">Role</th>
              <th className="text-left p-4 font-semibold text-text">Project</th>
              <th className="text-left p-4 font-semibold text-text">Status</th>
              <th className="text-left p-4 font-semibold text-text">Budget</th>
              <th className="text-left p-4 font-semibold text-text">Deadline</th>
              <th className="text-left p-4 font-semibold text-text">Created</th>
            </tr>
          </thead>
          <tbody>
            {collaborations.map((collaboration, index) => {
              const { collaborator, role } = getCollaboratorInfo(collaboration, currentUserId);
              const daysLeft = calculateDaysLeft(collaboration.deadline);
              const daysLeftInfo = formatDaysLeft(daysLeft ?? undefined);
              return (
                <tr 
                  key={collaboration.id} 
                  className={`border-b border-secondary/10 hover:bg-baby-powder/30 transition-colors ${
                    index % 2 === 0 ? 'bg-baby-powder/10' : ''
                  }`}
                >
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={collaborator.image || '/default-profile.png'}
                        alt={collaborator.name}
                        className="w-10 h-10 rounded-full object-cover border border-primary/20"
                      />
                      <div>
                        <p className="font-medium text-text">{collaborator.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <User className="text-primary" size={16} />
                      <span className="text-sm text-text/70">{role}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-sm text-text/70 max-w-xs truncate">
                      {collaboration.projectDescription || 'No description'}
                    </p>
                  </td>
                  <td className="p-4">
                    <CollaborationStatusBadge status={collaboration.status} size="sm" />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="text-primary" size={16} />
                      <span className="text-sm text-text">{formatBudget(collaboration.budget)}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Calendar className="text-primary" size={16} />
                        <span className="text-sm text-text">
                          {collaboration.deadline ? formatDate(collaboration.deadline) : 'No deadline'}
                        </span>
                      </div>
                      {daysLeftInfo && (
                        <div className={`flex items-center space-x-1 text-xs ${
                          daysLeftInfo.isOverdue ? 'text-red-600' : 'text-blue-600'
                        }`}>
                          {daysLeftInfo.isOverdue && <AlertTriangle size={12} />}
                          <span>{daysLeftInfo.text}</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-text/60">{formatDate(collaboration.createdAt)}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden divide-y divide-secondary/20">
        {collaborations.map((collaboration) => {
          const { collaborator, role } = getCollaboratorInfo(collaboration, currentUserId);
          const daysLeft = calculateDaysLeft(collaboration.deadline);
          const daysLeftInfo = formatDaysLeft(daysLeft ?? undefined);

          return (
            <div key={collaboration.id} className="p-4 space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={collaborator.image || '/default-profile.png'}
                    alt={collaborator.name}
                    className="w-12 h-12 rounded-full object-cover border border-primary/20"
                  />
                  <div>
                    <p className="font-bold text-text">{collaborator.name}</p>
                    <p className="text-sm text-text/60">{role}</p>
                  </div>
                </div>
                <CollaborationStatusBadge status={collaboration.status} size="sm" />
              </div>

              {/* Project Description */}
              <div>
                <p className="text-sm text-text/70 leading-relaxed">
                  {collaboration.projectDescription || 'No description provided'}
                </p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <DollarSign className="text-primary" size={16} />
                  <span className="text-text">{formatBudget(collaboration.budget)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="text-primary" size={16} />
                  <span className="text-text">
                    {collaboration.deadline ? formatDate(collaboration.deadline) : 'No deadline'}
                  </span>
                </div>
              </div>

              {/* Days Left & Created Date */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-text/60">Created {formatDate(collaboration.createdAt)}</span>
                {daysLeftInfo && (
                  <div className={`flex items-center space-x-1 px-2 py-1 rounded-full font-medium ${
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
        })}
      </div>
    </div>
  );
};

export default CollaborationTable;