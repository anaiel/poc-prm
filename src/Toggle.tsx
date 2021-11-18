import { Control, useController } from "react-hook-form";
import { FormData } from "./interfaces";

interface Props {
  control: Control<FormData, object>;
  name: string;
  disabled: boolean;
}

const Toggle = ({ control, name, disabled }: Props) => {
  const { field } = useController({ control, name });

  if (disabled) return <>Disabled</>;
  
  return <input {...field} value={"" + field.value} checked={field.value} type="checkbox" />
};

export default Toggle;
