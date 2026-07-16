import Layout from "@/components/layouts";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";


export default function Reference() {
  const location = useLocation();
  // console.log(location, 'location',location.pathname.substring(1));
  // const a = REFERENCE
  // const b = a.find(e => e.slug === location.pathname.substring(1))
  // console.log('b',b);  
  return (
    <Layout title="React Reference Overview" hasSidebar={true}>
      <div>
        <p>Reference</p>
      </div>
    </Layout>
  );
}