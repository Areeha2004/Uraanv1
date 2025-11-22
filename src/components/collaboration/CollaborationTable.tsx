// CollaborationTable.tsx
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
  onUpdateCollaboration?: (updated: Collaboration) => void; // callback to parent to sync state
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
    // budget might be a string like "₨5000" already or number
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
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
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

  // Generic action handler: action -> 'accept'|'decline'|'start'|'complete'
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

      const updated: Collaboration = await res.json();

      // update local state optimistically
      setLocalCollaborations((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));

      // notify parent
      if (onUpdateCollaboration) onUpdateCollaboration(updated);

      // if modal is open and the selected is the same, refresh it
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
                    <CollaborationStatusBadge status={collaboration.status as any} size="sm" />
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
                        <div
                          className={`flex items-center space-x-1 text-xs ${
                            daysLeftInfo.isOverdue ? 'text-red-600' : 'text-blue-600'
                          }`}
                        >
                          {daysLeftInfo.isOverdue && <AlertTriangle size={12} />}
                          <span>{daysLeftInfo.text}</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-text/60">{formatDate(collaboration.createdAt)}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => openModal(collaboration)}
                        className="px-3 py-1 rounded-md bg-secondary/10 hover:bg-secondary/20 text-sm"
                      >
                        Details
                      </button>

                      {/* Actions: If current user is receiver (being hired) they can Accept/Decline when pending.
                          If accepted and client (requester) or receiver may start/complete depending on flow. */}
                      {collaboration.status === 'pending' && !isClient && (
                        <>
                          <button
                            onClick={() => handleAction(collaboration.id, 'accept')}
                            disabled={loadingAction}
                            className="px-3 py-1 rounded-md bg-primary text-baby-powder text-sm"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleAction(collaboration.id, 'decline')}
                            disabled={loadingAction}
                            className="px-3 py-1 rounded-md border text-sm"
                          >
                            Decline
                          </button>
                        </>
                      )}

                      {collaboration.status === 'accepted' && (
                        <>
                          {/* allow start by either side or only requester? Here allow requester to mark in_progress */}
                          {isClient && (
                            <button
                              onClick={() => handleAction(collaboration.id, 'start')}
                              disabled={loadingAction}
                              className="px-3 py-1 rounded-md bg-purple-600 text-baby-powder text-sm"
                            >
                              Start
                            </button>
                          )}
                          {/* allow completion marking */}
                          <button
                            onClick={() => handleAction(collaboration.id, 'complete')}
                            disabled={loadingAction}
                            className="px-3 py-1 rounded-md bg-green-600 text-baby-powder text-sm"
                          >
                            Mark Complete
                          </button>
                        </>
                      )}

                      {collaboration.status === 'in_progress' && (
                        <button
                          onClick={() => handleAction(collaboration.id, 'complete')}
                          disabled={loadingAction}
                          className="px-3 py-1 rounded-md bg-green-600 text-baby-powder text-sm"
                        >
                          Mark Complete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden divide-y divide-secondary/20">
        {localCollaborations.map((collaboration) => {
          const { collaborator, role, isClient } = getCollaboratorInfo(collaboration, currentUserId);
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
                <CollaborationStatusBadge status={collaboration.status as any} size="sm" />
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
                  <div
                    className={`flex items-center space-x-1 px-2 py-1 rounded-full font-medium ${
                      daysLeftInfo.isOverdue ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {daysLeftInfo.isOverdue && <AlertTriangle size={12} />}
                    <span>{daysLeftInfo.text}</span>
                  </div>
                )}
              </div>

              {/* Mobile Actions */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => openModal(collaboration)}
                  className="px-3 py-1 rounded-md bg-secondary/10 hover:bg-secondary/20 text-sm"
                >
                  Details
                </button>

                {collaboration.status === 'pending' && !isClient && (
                  <>
                    <button
                      onClick={() => handleAction(collaboration.id, 'accept')}
                      disabled={loadingAction}
                      className="px-3 py-1 rounded-md bg-primary text-baby-powder text-sm"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleAction(collaboration.id, 'decline')}
                      disabled={loadingAction}
                      className="px-3 py-1 rounded-md border text-sm"
                    >
                      Decline
                    </button>
                  </>
                )}

                {collaboration.status === 'accepted' && isClient && (
                  <button
                    onClick={() => handleAction(collaboration.id, 'start')}
                    disabled={loadingAction}
                    className="px-3 py-1 rounded-md bg-purple-600 text-baby-powder text-sm"
                  >
                    Start
                  </button>
                )}

                {(collaboration.status === 'accepted' || collaboration.status === 'in_progress') && (
                  <button
                    onClick={() => handleAction(collaboration.id, 'complete')}
                    disabled={loadingAction}
                    className="px-3 py-1 rounded-md bg-green-600 text-baby-powder text-sm"
                  >
                    Complete
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Details Modal */}
     {modalOpen && selected && (
  <div className="fixed inset-0 z-50 overflow-y-auto p-6 flex justify-center items-start">
    
    {/* Backdrop */}
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm"
      onClick={closeModal}
    />

    {/* Modal */}
    <div className="relative animate-slideUp max-w-2xl w-full bg-white rounded-2xl shadow-2xl border border-gray-200 z-10 p-6">
     
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">
            {selected.title || "Collaboration Details"}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Requested by <span className="font-medium">{selected.requester?.name || "Unknown"}</span>
          </p>
        </div>

        <button
          onClick={closeModal}
          className="text-gray-400 hover:text-gray-600 transition"
        >
          ✕
        </button>
      </div>

      {/* Body */}
      <div className="space-y-6 pb-4">

        {/* Project Description */}
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
          <h4 className="font-semibold text-gray-700 mb-1 flex items-center gap-2">
            📝 Project Description
          </h4>
          <p className="text-gray-600 leading-relaxed">
            {selected.projectDescription || "No description provided"}
          </p>
        </div>

        {/* Additional Info */}
        {selected.projectDescription && (
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
            <h4 className="font-semibold text-gray-700 mb-1 flex items-center gap-2">
              📌 Additional Info
            </h4>
            <p className="text-gray-600 leading-relaxed">
              {selected.projectDescription}
            </p>
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-2 gap-6">

          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
            <h4 className="font-semibold text-gray-700 mb-1">💰 Budget</h4>
            <p className="text-gray-600">{formatBudget(selected.budget)}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
            <h4 className="font-semibold text-gray-700 mb-1">📅 Deadline</h4>
            <p className="text-gray-600">
              {selected.deadline ? formatDate(selected.deadline) : "No deadline"}
            </p>
          </div>
        </div>

        {/* Contact Method */}
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
          <h4 className="font-semibold text-gray-700 mb-1">📞 Contact Method</h4>
          <p className="text-gray-600">{selected.contactMethod || "Not specified"}</p>
        </div>

        {/* Error */}
        {error && (
          <div className="text-red-600 text-sm bg-red-100 border border-red-300 p-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3 pt-4 border-t">

          {selected.status === "pending" && selected.receiverId === currentUserId && (
            <>
              <button
                onClick={() => handleAction(selected.id, "accept")}
                disabled={loadingAction}
                className="px-5 py-2.5 rounded-lg bg-primary text-white shadow hover:bg-primary/90 transition"
              >
                Accept Request
              </button>

              <button
                onClick={() => handleAction(selected.id, "decline")}
                disabled={loadingAction}
                className="px-5 py-2.5 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
              >
                Decline
              </button>
            </>
          )}

          {selected.status === "accepted" && selected.requesterId === currentUserId && (
            <button
              onClick={() => handleAction(selected.id, "start")}
              disabled={loadingAction}
              className="px-5 py-2.5 rounded-lg bg-purple-600 text-white shadow hover:bg-purple-700 transition"
            >
              Start Project
            </button>
          )}

          {(selected.status === "accepted" || selected.status === "in_progress") && (
            <button
              onClick={() => handleAction(selected.id, "complete")}
              disabled={loadingAction}
              className="px-5 py-2.5 rounded-lg bg-green-600 text-white shadow hover:bg-green-700 transition"
            >
              Mark Completed
            </button>
          )}

          <button
            onClick={closeModal}
            className="px-5 py-2.5 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
          >
            Close
          </button>
        </div>
      </div>
    
    </div>

  </div>
)}


    </div>
  );
};

export default CollaborationTable;
 