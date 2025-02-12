"use client";

import React, { useEffect, useState } from "react";

import CreateWorkspace from "@/components/ui/Workspace/CreateWorkspace";
import { MdOutlineFolderCopy } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { fetchWorkspaces } from "@/lib/features/workspacesSlice";
import { AppDispatch } from "@/lib/store";

import Skeletons from "@/components/common/Skeleton";
import { useRouter, useSearchParams } from "next/navigation";

import Dropdowns from "@/components/common/Dropdown";

function SidebarProjects() {
  const [error, setError] = useState();

  const searchParams = useSearchParams();
  const router = useRouter();

  const state = useSelector((item: any) => item.workspaces);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchWorkspaces());
    setError(state.error);
  }, []);

  function handleWorkspace(id: any) {
    const params = new URLSearchParams(searchParams);
    params.delete("page");
    params.set("projects", id);

    const newUrl = `/workspaces?${params.toString()}`;

    router.replace(newUrl);
  }

  return (
    <div className="mt-4">
      <div>
        <h2 className="text-gray-500 text-sm font-medium">Projects</h2>
      </div>

      {error != null ? (
        <div className="text-red-500 text-[15px] pt-4">error</div>
      ) : null}

      {state.loading === true ? (
        <div className="flex items-center">
          <Skeletons />
        </div>
      ) : null}
      <div className="pt-4">
        {state.data && state.data.length > 0
          ? state.data.map((item: any, index: any) => (
              <div
                key={index}
                className={`flex items-center gap-3 mb-1.5 ${
                  item.workspaceId.toString() ===
                  searchParams.get("projects")?.toString()
                    ? "bg-gray-100 rounded-lg"
                    : ""
                } `}
                onClick={() => handleWorkspace(item.workspaceId)}
              >
                <div className="text-[15px] text-gray-700 flex items-center justify-between gap-2 hover:bg-gray-100 py-1 w-full rounded-lg hover:cursor-pointer group">
                  <h2 className="flex items-center gap-2">
                    <MdOutlineFolderCopy className="text-lg ml-2" />
                    {item.name}
                  </h2>
                  <Dropdowns />
                </div>
              </div>
            ))
          : null}
        <CreateWorkspace />
      </div>
    </div>
  );
}

export default SidebarProjects;
