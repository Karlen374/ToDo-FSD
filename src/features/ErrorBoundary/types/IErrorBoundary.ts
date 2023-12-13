export interface IErrorBoundaryProps {
  children: React.ReactNode
}

export interface IErrorBoundaryContext {
  active: boolean
  setActive:  React.Dispatch<React.SetStateAction<boolean>>;
  errorMessage: string
  setErrorMessage:  React.Dispatch<React.SetStateAction<string>>;
}