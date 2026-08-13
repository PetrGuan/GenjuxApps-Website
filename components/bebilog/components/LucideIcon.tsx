import { icons } from "lucide-react";

type Props = {
  name: string;
  size?: number;
  className?: string;
  strokeWidth?: number;
};

export default function LucideIcon({
  name,
  size = 20,
  className,
  strokeWidth = 1.75,
}: Props) {
  const Icon = icons[name as keyof typeof icons];
  if (!Icon) return null;
  return <Icon size={size} className={className} strokeWidth={strokeWidth} />;
}
