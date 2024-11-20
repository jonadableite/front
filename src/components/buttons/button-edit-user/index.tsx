"use client";

import React, { useState } from "react";

import CustomModalUser from "@/components/Modals/ModalEditUser";

import { MdEdit } from "react-icons/md";
import { UserType } from "@/types";
export default function ChangeUserButtonEdit({
  DataUser,
}: {
  DataUser: UserType;
}) {
 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<UserType | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const openModal = () => {
    setSelectedCompany(DataUser);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="py-1  dark:danger">
        <button
          onClick={openModal}
          type="button"
          className="text-white bg-transparent hover:bg-white/10 focus:ring-2 focus:ring-bg-white/10 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-bg-white/10 me-2 mb-2"
        >
          <MdEdit className="text-danger" />
        </button>
      </div>
      {isModalOpen && selectedCompany && (
        <CustomModalUser
          onRequestClose={() => setIsModalOpen(false)}
          Userdata={DataUser}
        />
      )}
    </>
  );
}
