import { $ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";

export function useNavigateToDetail() {
  const navigate = useNavigate();
  return $(async (expectationId: string) => await navigate(`/interns/ambulance/expectations/${expectationId}/`));
}
