import { FrameProps } from "@/types/blok";
import { useParams } from "next/navigation";

export default function FrameOverlay({ frames }: { frames: FrameProps[] }) {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
}