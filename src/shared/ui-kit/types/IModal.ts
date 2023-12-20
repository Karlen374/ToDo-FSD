
export interface IModalProps {
  active: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string
  submitBtnText: string;
  onSubmit: () => void;
}

export type IModalHeaderProps = Pick<IModalProps, "title" | "onClose">

export type IModalFooterProps = Pick<IModalProps, "onClose" | "submitBtnText" | "onSubmit">
