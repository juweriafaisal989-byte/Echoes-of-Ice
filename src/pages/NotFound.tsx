import { Link } from 'react-router-dom';
import { EmptyState } from '../components/ui';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-4 py-16">
      <EmptyState title="Page not found" description="The page you're looking for doesn't exist in this prototype." />
      <Link to="/" className="text-sm font-medium text-polar-700 hover:underline">
        ← Back to Home
      </Link>
    </div>
  );
}
