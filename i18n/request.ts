import { getRequestConfig } from "next-intl/server";
import enMessages from "@/components/bebilog/messages/en.json";

export default getRequestConfig(async () => ({
  locale: "en",
  messages: enMessages,
}));
