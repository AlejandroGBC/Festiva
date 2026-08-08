"use client";

import RolCardList from "@/modules/auth/registro/components/RolCardList";
import SeleccionarRolHeader from "@/modules/auth/registro/components/SeleccionarRolHeader";
import { RegisterBackButton } from "@/shared/components/RegisterBackButton";

export default function SeleccionarRolPage() {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="mb-auto pb-4">
        <RegisterBackButton />
      </div>
      <div className="flex flex-col gap-10 justify-center">
        <SeleccionarRolHeader />
        <RolCardList />
      </div>
      <div className="mt-auto"></div>
    </div>
  );
}