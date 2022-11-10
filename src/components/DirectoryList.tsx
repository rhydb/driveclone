const DirectoryList = ({ directory }: { directory: string }) => {

  const directoryParts = directory.slice(0, -1).split('/');
  const currentDirectory = directoryParts.pop();

  return (
    <div>
        {
            directoryParts.map(dir => {
                return <a href={dir} className="after:content-['>']" key={dir} >dir</a>
            })
        }
        <b>{currentDirectory}</b>
    </div>
  )
}

export default DirectoryList