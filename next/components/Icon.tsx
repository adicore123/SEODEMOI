import { ICONS } from '@/lib/icons';

export default function Icon({ name, size = 24, className = '' }: { name: string; size?: number; className?: string }) {
  const paths = ICONS[name] || ICONS.spark;
  return (
    <svg
      className={`icn ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: paths }}
    />
  );
}
