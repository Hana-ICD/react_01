import Layout from "@/components/layouts";
import { Outlet } from "react-router-dom";
import { motion } from "motion/react";

export default function Reference() {
  return (
    <Layout title="React Reference Overview" hasSidebar={true}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <p>ReferenceChildLayout:</p>
        <Outlet/>
      </motion.div>
    </Layout>
  );
}