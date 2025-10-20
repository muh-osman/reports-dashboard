import { useQuery } from "@tanstack/react-query";
// API
import API from "./Api";

export const fetchBranches = async () => {
  const res = await API.get(`api/Branch/AllBranch`);
  return res.data;
};

export default function useGetAllBranchesApi() {
  return useQuery({
    queryKey: ["Branches"],
    queryFn: fetchBranches,
  });
}
