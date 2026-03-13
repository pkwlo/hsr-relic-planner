import { deleteRelicById } from "@/lib/storage";

function deleteRelic(relicId: number) {
  deleteRelicById(relicId);
  if (typeof window !== "undefined") {
    window.location.reload();
  }
}

export default deleteRelic;
