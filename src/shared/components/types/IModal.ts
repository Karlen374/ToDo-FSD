
export interface IModalProps {
  active: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string
}

export type IModalHeaderProps = Pick<IModalProps, "title" | "onClose">

