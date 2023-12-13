export interface IErrorAlertProps {
  errorMessage: string,
  active: boolean,
  setActive: React.Dispatch<React.SetStateAction<boolean>>
}