import { KeyboardEvent, useState } from "react";
import { FileType, typeFromExtension, extractExtension } from "../utils/Files"

interface FileProps {
    name: string,
    url: string,
    selected: boolean,
    image?: string,
    [other:string]: any,
}

const File = ({ name, url, selected, ...props }: FileProps) => {
  
  const extension = extractExtension(name)
  const type = typeFromExtension(extension);
  const imageUrl = type === FileType.folder ? "/img/folder.png" : "/img/lizard.jpg";

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      // toggle selection
    }
  }

  return (
    <div {...props} onKeyDown={onKeyDown} className="w-72 border rounded-md m-4 overflow-hidden relative" tabIndex={0}>
        <div className="h-80">
            <img src={imageUrl} className="h-full w-full object-cover" alt={name} />
        </div>
        <div className={`h-10 border-t flex align-center px-2 ${selected && "bg-blue-200"}`}>
            {name}
        </div>
    </div>
  )
}

export default File