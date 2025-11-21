import React from 'react';
import { Clock, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

interface CollaborationStatusBadgeProps {
  status: 'pending' | 'accepted' | 'in-progress' | 'in_progress' | 'completed' | 'declined' | 'cancelled';
  size?: 'sm' | 'md' | 'lg';
}

const CollaborationStatusBadge: React.FC<CollaborationStatusBadgeProps> = ({ 
  status, 
  size = 'md' 
}) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'pending':
        return {
          icon: Clock,
          label: 'Pending',
          className: 'bg-yellow-100 text-yellow-700 border-yellow-200'
        };
      case 'accepted':
        return {
          icon: CheckCircle,
          label: 'Accepted',
          className: 'bg-blue-100 text-blue-700 border-blue-200'
        };
      case 'in-progress':
        return {
          icon: AlertCircle,
          label: 'In Progress',
          className: 'bg-purple-100 text-purple-700 border-purple-200'
        };
      case 'completed':
        return {
          icon: CheckCircle,
          label: 'Completed',
          className: 'bg-green-100 text-green-700 border-green-200'
        };
      case 'cancelled':
        return {
          icon: XCircle,
          label: 'Cancelled',
          className: 'bg-red-100 text-red-700 border-red-200'
        };
      default:
        return {
          icon: Clock,
          label: 'Unknown',
          className: 'bg-gray-100 text-gray-700 border-gray-200'
        };
    }
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const iconSizes = {
    sm: 12,
    md: 16,
    lg: 20
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center space-x-1 rounded-full font-medium border ${config.className} ${sizeClasses[size]}`}>
      <Icon size={iconSizes[size]} />
      <span>{config.label}</span>
    </span>
  );
};

export default CollaborationStatusBadge;