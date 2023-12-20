export interface IAlertProps {
  message: string,
  active: boolean,
  onClose: () => void
  position: "top-right" | "top-left" | "bottom-right" | "bottom-left"
}