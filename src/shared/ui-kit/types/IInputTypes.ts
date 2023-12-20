export interface IInputProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string
  label?: string
  required?: boolean
  error?: boolean
  errorMessage?: string
  onBlur: () => void
}