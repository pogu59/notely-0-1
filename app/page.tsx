

import MainLayout from "@/component/MenuBar";
import { redirect } from "next/navigation";

const LOGO ={
  src: "/temp/logo.png",
  alt: "coupang"
}


export default function Page() {
    redirect('/home')
}
