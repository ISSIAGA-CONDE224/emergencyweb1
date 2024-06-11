import Image from "next/image";
import logo from "../../public/logo.png";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

function Logo({ fill = "#3B81F6", ...rest }) {
  return (
    <Avatar>
      <Image width={500} height={500} src={logo} alt="@shadcn" />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
  );
}

export default Logo;
