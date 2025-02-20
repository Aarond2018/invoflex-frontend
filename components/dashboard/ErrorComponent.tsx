import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Frown } from "lucide-react";

type Props = {
  queryString: string;
};

export default function ErrorComponent({ queryString }: Props) {
  const queryClient = useQueryClient();

  const handleRetry = () => {
    queryClient.invalidateQueries({ queryKey: [queryString] });
  };

  return (
    <section className="w-[95%] max-w-[20rem] flex flex-col gap-1 justify-center items-center">
      <Frown className="w-8 h-8" />
      <p>Something went wrong!</p>
      <button
        onClick={handleRetry}
        className="bg-[#4caa74] py-2 px-8 rounded my-4 text-white font-medium"
      >
        Reload
      </button>
    </section>
  );
}
