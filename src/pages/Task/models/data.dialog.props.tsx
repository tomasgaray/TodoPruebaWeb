import { TypeDialog } from "../../../enums/type.dialog";

export interface DataDialogProps<t> {
    open: boolean;
    select: t,
    type: TypeDialog,
    loading: boolean
  }  