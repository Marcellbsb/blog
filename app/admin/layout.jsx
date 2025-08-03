import Sidebar from "@/Components/AdminComponents/sidebar";

export default  function Layout({children}){
  return (
  <>
  <div className='flex'>
    <Sidebar/>
  </div>
  {children}
  </>

  )
}
