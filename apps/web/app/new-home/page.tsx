import { permanentRedirect } from "next/navigation";

/** Former preview URL — homepage now lives at `/`. */
export default function NewHomeRedirectPage() {
  permanentRedirect("/");
}
