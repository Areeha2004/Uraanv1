import React from 'react';
import { AlertTriangle, Calendar, DollarSign, FileText, Mail, User } from 'lucide-react';
import CollaborationStatusBadge from './CollaborationStatusBadge';

interface CollaborationCardProps {
  collaboration: {
    id: string;
    contactMethod?: string;
    title: string;
    status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'declined' | 'cancelled';
    projectDescription?: string;
    budget?: number | string;
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
  daysLeftInfo,
}) => {
  const avatarSrc = collaborator.image || '/default-profile.png';
  const initials = collaborator.name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const formatBudget = (budget?: number | string | null) => {
    if (!budget) return 'Budget not specified';
    if (typeof budget === 'number') return `PKR ${budget.toLocaleString()}`;
    return String(budget);
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

  return (
    <article className="premium-card group rounded-[1.5rem] border border-primary/15 bg-baby-powder/85 p-5 shadow-[0_10px_30px_rgba(80,61,63,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/30">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="rounded-2xl bg-baby-powder p-1.5 ring-1 ring-primary/20">
            {avatarSrc ? (
              <img
                src={avatarSrc}
                alt={collaborator.name}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/default-profile.png';
                }}
                className="h-12 w-12 rounded-xl object-cover"
              />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-sm font-semibold uppercase text-primary">
                {initials || 'U'}
              </div>
            )}
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold text-text">{collaborator.name}</h3>
            <p className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.08em] text-text/60">
              <User size={12} className="text-primary" />
              {role}
            </p>
          </div>
        </div>
        <CollaborationStatusBadge status={collaboration.status} size="sm" />
      </div>

      <div className="mt-4 rounded-2xl border border-primary/12 bg-baby-powder/90 p-3">
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-primary">Project</p>
        <h4 className="mt-1 line-clamp-1 text-sm font-semibold text-text">{collaboration.title || 'Untitled collaboration'}</h4>
        <div className="mt-2 flex items-start gap-2">
          <FileText size={14} className="mt-0.5 text-primary" />
          <p className="line-clamp-3 text-sm leading-relaxed text-text/68">
            {collaboration.projectDescription || 'No description provided.'}
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <div className="rounded-xl border border-primary/12 bg-baby-powder/90 p-2.5">
          <p className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.08em] text-text/55">
            <DollarSign size={13} className="text-primary" />
            Budget
          </p>
          <p className="mt-1 text-sm font-semibold text-text">{formatBudget(collaboration.budget)}</p>
        </div>

        <div className="rounded-xl border border-primary/12 bg-baby-powder/90 p-2.5">
          <p className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.08em] text-text/55">
            <Calendar size={13} className="text-primary" />
            Deadline
          </p>
          <p className="mt-1 text-sm font-semibold text-text">
            {collaboration.deadline ? formatDate(collaboration.deadline) : 'No deadline'}
          </p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        {collaboration.contactMethod ? (
          <span className="inline-flex items-center gap-1 rounded-full border border-primary/15 bg-primary/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-primary">
            <Mail size={11} />
            {collaboration.contactMethod}
          </span>
        ) : (
          <span className="text-[11px] uppercase tracking-[0.08em] text-text/45">No contact method</span>
        )}

        {daysLeftInfo ? (
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] ${
              daysLeftInfo.isOverdue
                ? 'border border-red-300/50 bg-red-100/80 text-red-700'
                : 'border border-sky-300/40 bg-sky-100/70 text-sky-700'
            }`}
          >
            {daysLeftInfo.isOverdue && <AlertTriangle size={11} />}
            {daysLeftInfo.text}
          </span>
        ) : (
          <span className="text-[11px] uppercase tracking-[0.08em] text-text/45">No timeline</span>
        )}
      </div>

      <p className="mt-3 text-[11px] uppercase tracking-[0.08em] text-text/45">
        Created {formatDate(collaboration.createdAt)}
      </p>
    </article>
  );
};

export default CollaborationCard;
