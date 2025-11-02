import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"
import { Product } from "@/types/product";
import { IconTrash } from "@tabler/icons-react";

const DeleteButton = ({product}: {product: Product}) => {
  const onClick = () => {
    // Placeholder for delete functionality
    console.log(`Delete product with id: ${product._id}`);
  }
  return(
  <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="rounded-xl px-3">
                      <IconTrash size={18} />
                    </Button>
                  </AlertDialogTrigger>

                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this blog? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="rounded-xl">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => onClick}
                        className="rounded-xl"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
  )
};

export default DeleteButton;