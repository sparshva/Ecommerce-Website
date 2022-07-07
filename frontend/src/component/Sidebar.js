import React from "react";

import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@material-ui/lab";
import { MdExpandMore, MdImportExport } from "react-icons/md";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/">Ecommerce</Link>
      <Link to="/admin/dashboard">
        <p>Dashboard</p>
      </Link>
      {/* <Link to="/"> */}
      <TreeView
        defaultCollapseIcon={<MdExpandMore />}
        defaultExpandIcon={<MdImportExport />}
      >
        <TreeItem nodeId="1" label="Products">
          <Link to="/admin/products">
            <TreeItem nodeId="2" label="All" />
          </Link>

          <Link to="/admin/product">
            <TreeItem nodeId="3" label="Create" />
          </Link>
        </TreeItem>
      </TreeView>
      {/* </Link> */}
      <Link to="/admin/orders">
        <p>Orders</p>
      </Link>
      <Link to="/admin/users">
        <p>Users</p>
      </Link>
      <Link to="/admin/reviews">
        <p>Reviews</p>
      </Link>
    </div>
  );
};

export default Sidebar;
