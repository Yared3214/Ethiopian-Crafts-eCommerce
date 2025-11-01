import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";

const DeleteButton = ({ onClick }: { onClick: () => void }) => (
  <Button variant="destructive" size="icon" onClick={onClick}>
    <Trash2 className="h-4 w-4" />
  </Button>
);

export default DeleteButton;