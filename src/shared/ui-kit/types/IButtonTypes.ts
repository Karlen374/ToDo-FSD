export interface IButtonProps {
  type?: "primary" | "secondary";
  children: React.ReactNode;
  onClick: () => void;
  size?: "small" | "default" 
}

