import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import "chart.js/auto";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../action/productAction";
import { getAllUsers } from "../action/userAction";

const Dashboard = () => {
  const dispatch = useDispatch();

  let outOfStock = 0;

  const { products } = useSelector((state) => state.products);
  const { users } = useSelector((state) => state.allUsers);

  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "Total Amount",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197,72,49"],
        data: [0, 4000],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out Of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4b5000", "#35014f"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };
  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <>
      <div className="dashboard">
        <Sidebar />
        <div className="dashboardContainer">
          <Typography component="h1">Dashboard</Typography>
          <div className="dashboardSummary">
            <div>
              <p>
                Total Amount <br />
                2000
              </p>
            </div>
            <div className="dashboardSummaryBox2">
              <Link to="/admin/products">
                <p>Product</p>
                <p>{products.length ? products.length : 0}</p>
              </Link>

              <Link to="/admin/orders">
                <p>Orders</p>
                <p>4</p>
              </Link>

              <Link to="/admin/users">
                <p>Users</p>
                <p>{users.length ? users.length : 0}</p>
              </Link>
            </div>
          </div>
          <div className="dashboardChart">
            <div className="lineChart">
              <Line data={lineState} />
            </div>
            <div className="doughnutChart">
              <Doughnut data={doughnutState} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
