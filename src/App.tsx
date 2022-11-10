import './App.css';
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { IconButton, Menu, MenuItem, Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Navbar from './components/Navbar';
import Searchbar from "./components/Searhbar";
import File from "./components/File";
import ContextMenu from "./components/ContextMenu";
import NewFolderDialog from './components/NewFolderDialog';
import { typeFromExtension, extractExtension, FileType } from './utils/Files';
import DirectoryList from "./components/DirectoryList";

  type FileEntry = {
    name: string,
    url: string,
    selected: boolean,
  }
  interface FileList {
    [key: string]: FileEntry
  }

  const testFiles: FileList = {
    "my_folder/": {
      name: "my_folder/",
      url: "/uploads/dir",
      selected: false,
    },
    "test_name": {
      name: "test_name",
      url: "/uploads/file",
      selected: false,
    },
    "coolfile.txt": {
      name: "coolfile.txt",
      url: "/uploads/coolfile.txt",
      selected: false,
    },
    "another.txt": {
      name: "another.txt",
      url: "/uploads/another.txt",
      selected: false,
    },
  };
function App() {
  const [searchValue, setSearchValue] = useState("");
  const [directory, setDirectory] = useState("");
  const [newFolderDialogOpen, setNewFolderDialogOpen] = useState(false);
  const [fileList, setFileList] = useState(testFiles);

  useEffect(() => {
    console.log("direcotry has changed!!!!")
  }, [directory]);
  
  const updateSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(searchValue);
  }

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const uploadRef = useRef<HTMLInputElement>(null);

  const newFolderClick = () => {
    setNewFolderDialogOpen(true);
    handleClose();
  }

  const createNewFolder = (name: string) => {
    // TODO: send request to create new folder
    name = name + '/'
    console.log("creating new folder:", name)
    setFileList(prevState => {
      return {
        [name]: {
          name,
          url: name,
          selected: false,
        },
        ...prevState,
      }
   });

    setNewFolderDialogOpen(false);
  }

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
  }

  const clearSelected = () => {
    console.log("clearing selected")
    setFileList(prevState => {
      Object.keys(prevState).forEach(name => {
        prevState[name].selected = false
      })
      return { ...prevState };
    })
  }

  const toggleSelected = (e: MouseEvent, name: string) => {
    e.stopPropagation();
    if (fileList[name].selected) { return; }

    if (!e.ctrlKey) { clearSelected(); }

    setFileList(prevState => {
      return {
        ...prevState,
        [name]: {
          ...prevState[name],
          selected: !prevState[name].selected
        }
      }
    })
  }

  const onDoubleClickFolder = (e: MouseEvent, name: string) => {
    console.log("going into folder:", name);
    setDirectory(name);
  }

  return (

  <div>
    <input ref={uploadRef} hidden onChange={handleUpload} type="file" name="file" id="file-upload" />
    <NewFolderDialog onCreate={createNewFolder} isOpen={newFolderDialogOpen} setIsOpen={setNewFolderDialogOpen}/>
    <Navbar>
      <DirectoryList directory={directory}/>
      <Searchbar onChange={updateSearch}/>
      <div>
        <IconButton
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <AddCircleIcon />
        </IconButton>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={() => {uploadRef.current?.click(); handleClose();}}>
            Upload
          </MenuItem>
          <MenuItem onClick={newFolderClick}>New Folder</MenuItem>
        </Menu>
    </div>
    </Navbar>

    <ContextMenu items={
      [{name: <div><AddCircleIcon />AY!</div>, action: () => {console.log("HELLO!!!");
      }}]
    }>
      <div onClick={clearSelected} className="flex flex-wrap justify1-center align-center">
        {
          Object.values(fileList).map(file => {
            const type = typeFromExtension(extractExtension(file.name));
            const onDoubleClick = type === FileType.folder ? (e: MouseEvent) => onDoubleClickFolder(e, file.name) : undefined;
            return <File onDoubleClick={onDoubleClick} onClick={(e: MouseEvent) => toggleSelected(e, file.name)} name={file.name} url={file.url} selected={file.selected} key={file.name}/>
          })
        }
        {/* <div onClick={() => console.log("hello")}>
          <File name="file" url="file"/>
        </div> */}
      </div>
    </ContextMenu>

  </div>
  );
}

export default App;
