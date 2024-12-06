"use client";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const Deletebtn = ({ id, endpoint }: { id: string; endpoint: string }) => {
  const router = useRouter();
  const handleDelete = async () => {
    console.log("add stock id: and endpoint", id, endpoint);
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      try {
        const res = await axios.delete(
          `${process.env.NEXT_PUBLIC_URL}/api/${endpoint}?id=${id}`
        );
        console.log(res);
        router.refresh();
        Swal.fire({
          title: "Deleted!",
          text: `Your ${endpoint} has been deleted.`,
          icon: "success",
        });
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Something went wrong while deleting.",
          icon: "error",
        });
        console.error("Delete error:", error);
      }
    }
  };

  return (
    <>
      <button
        onClick={handleDelete}
        className="flex items-center space-x-1 font-medium text-red-600 dark:text-red-500"
      >
        <Trash2 className="w-4 h-4" />
        <span>Delete</span>
      </button>
    </>
  );
};

export default Deletebtn;
