import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMutationHandler = (
  fetcher,
  skipInvalidates,
  invalidators,
  removeQuery
) => {
  const queryClient = useQueryClient();
  const {
    mutateAsync,
    mutate,
    data,
    isSuccess,
    isLoading,
    isError,
    error,
    reset,
  } = useMutation((values) => fetcher(values), {
    onSuccess: async (data) => {
      let body = data;
      if (body && body.header) {
        const statusCode = body.header.status;
        if (statusCode >= 400) {
          throw body;
        } else {
          if (skipInvalidates) {
            // Do nothing
          } else {
            invalidators?.forEach(async (invalidator) => {
              if (removeQuery) {
                queryClient.removeQueries([invalidator]);
              } else {
                await queryClient.invalidateQueries([invalidator]);
              }
            });
          }
        }
      }
    },
  });

  return {
    mutateAsync,
    mutate,
    data,
    isSuccess,
    isLoading,
    isError,
    error,
    reset,
  };
};
