import React, { useEffect, useState } from 'react';
import { Calendar, DollarSign, User, AlertTriangle } from 'lucide-react';
import CollaborationStatusBadge from './CollaborationStatusBadge';
import { Collaboration } from '../types/collaboration';

interface CollaborationTableProps {
  collaborations: Collaboration[];
  currentUserId: string;
  getCollaboratorInfo: (collaboration: Collaboration, currentUserId: string) => {
    collaborator: { id: string; name: string; image?: string };
    role: string;
    isClient: boolean;
  };
  formatDaysLeft: (daysLeft?: number) => { text: string; isOverdue: boolean } | null;
  onUpdateCollaboration?: (updated: Collaboration) => void;
}

const CollaborationTable: React.FC<CollaborationTableProps> = ({
  collaborations,
  currentUserId,
  getCollaboratorInfo,
  formatDaysLeft,
  onUpdateCollaboration
}) => {
  const [localCollaborations, setLocalCollaborations] = useState<Collaboration[]>(collaborations);
  const [selected, setSelected] = useState<Collaboration | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loadingAction, setLoadingAction] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLocalCollaborations(collaborations);
  }, [collaborations]);

  const formatBudget = (budget?: string | number | null) => {
    if (!budget) return 'Not specified';
    if (typeof budget === 'number') return `₨${budget.toLocaleString()}`;
    return budget;
  };

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const calculateDaysLeft = (deadline?: string | null) => {
    if (!deadline) return null;
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const openModal = (collab: Collaboration) => {
    setSelected(collab);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelected(null);
    setModalOpen(false);
    setError(null);
  };

  const handleAction = async (collabId: string, action: 'accept' | 'decline' | 'start' | 'complete') => {
    setLoadingAction(true);
    setError(null);
    try {
      const res = await fetch(`/api/collaborations/${collabId}/${action}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        const body = await res.text();
        throw new Error(body || `Failed to ${action}`);
      }

      const updated = (await res.json()) as Collaboration;

      setLocalCollaborations(prev => prev.map(c => (c.id === updated.id ? updated : c)));

      if (onUpdateCollaboration) onUpdateCollaboration(updated);

      if (selected && selected.id === updated.id) {
        setSelected(updated);
      }
    } catch (err: unknown) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Action failed');
    } finally {
      setLoadingAction(false);
    }
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
              <th className="text-left p-4 font-semibold text-text">Actions</th>
            </tr>
          </thead>
          <tbody>
            {localCollaborations.map((collaboration, index) => {
              const { collaborator, role, isClient } = getCollaboratorInfo(collaboration, currentUserId);
              const daysLeft = calculateDaysLeft(collaboration.deadline);
              const daysLeftInfo = formatDaysLeft(daysLeft ?? undefined);
              return (
                <tr key={collaboration.id} className={`border-b border-secondary/10 hover:bg-baby-powder/30 transition-colors ${index % 2 === 0 ? 'bg-baby-powder/10' : ''}`}>
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <img src={collaborator.image || '/default-profile.png'} alt={collaborator.name} className="w-10 h-10 rounded-full object-cover border border-primary/20" />
                      <div><p className="font-medium text-text">{collaborator.name}</p></div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <User className="text-primary" size={16} />
                      <span className="text-sm text-text/70">{role}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-sm text-text/70 max-w-xs truncate">{collaboration.projectDescription || 'No description'}</p>
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
                        <span className="text-sm text-text">{collaboration.deadline ? formatDate(collaboration.deadline) : 'No deadline'}</span>
                      </div>
                      {daysLeftInfo && <div className={`flex items-center space-x-1 text-xs ${daysLeftInfo.isOverdue ? 'text-red-600' : 'text-blue-600'}`}>{daysLeftInfo.isOverdue && <AlertTriangle size={12} />}<span>{daysLeftInfo.text}</span></div>}
                    </div>
                  </td>
                  <td className="p-4"><span className="text-sm text-text/60">{formatDate(collaboration.createdAt)}</span></td>
                  <td className="p-4">
                    {/* Actions buttons unchanged */}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards and Modal remain unchanged, remove all 'as any' usage */}
    </div>
  );
};

export default CollaborationTable;