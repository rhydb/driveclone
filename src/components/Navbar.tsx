
const Navbar = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div
        className="flex justify-center items-center p-2 pt-4 border-b border-b-grey-200">
        {children}
    </div>
  )
}

export default Navbar