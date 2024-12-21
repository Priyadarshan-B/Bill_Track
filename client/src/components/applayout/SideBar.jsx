import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DashboardTwoToneIcon from '@mui/icons-material/DashboardTwoTone';
import HistoryTwoToneIcon from '@mui/icons-material/HistoryTwoTone';
import ReceiptLongTwoToneIcon from '@mui/icons-material/ReceiptLongTwoTone';
import requestApi from "../utils/axios";
import { decryptData } from "../utils/encrypt";
import "./styles.css";

function getIconComponent(iconPath) {
  switch (iconPath) {
    case 'ReceiptLongTwoToneIcon':
      return <ReceiptLongTwoToneIcon style={{ color: '#7c7c7c', fontSize: '30px' }} className="custom-sidebar-icon" />;
    case 'DashboardTwoToneIcon':
      return <DashboardTwoToneIcon style={{ color: '#7c7c7c', fontSize: '30px' }} className="custom-sidebar-icon" />;
      case 'HistoryTwoToneIcon':
        return <HistoryTwoToneIcon style={{ color: '#7c7c7c', fontSize: '30px' }} className="custom-sidebar-icon" />;
    default:
      return null;
  }
}

function SideBar({ open, resource, onSidebarItemSelect, handleSideBar }) {
  const [activeItem, setActiveItem] = useState("");
  const [sidebarItems, setSidebarItems] = useState([]);
  const location = useLocation();
  // const navigate = useNavigate();
  const basePath = import.meta.env.VITE_BASE_PATH;

  useEffect(() => {
    const fetchSidebarItems = async () => {
      try {
        const encryptedData = localStorage.getItem('D!');
        const decryptedData = decryptData(encryptedData);
        const { role: roleid } = decryptedData; 
        // console.log("Decrypted Role ID:", roleid);

        const response = await requestApi("POST", `/resource`, { role: roleid });
        // console.log(response)
        if (response.success) {
          setSidebarItems(response.data); 
        } else {
          console.error("Error fetching sidebar items:", response.error);
        }
      } catch (error) {
        console.error("Error fetching sidebar items:", error);
      }
    };

    fetchSidebarItems(); 
  }, [resource]);

  useEffect(() => {
    const pathname = location.pathname;
    const activeItem = sidebarItems.find((item) => `${basePath}` + item.path === pathname);
    if (activeItem) {
      setActiveItem(activeItem.name);
      if (onSidebarItemSelect) {
        onSidebarItemSelect(activeItem.name);  
      }
    }
  }, [location, sidebarItems, onSidebarItemSelect]);

  return (
    <div
      className={open ? "app-sidebar sidebar-open" : "app-sidebar"}
      style={{
        backgroundColor: "#ffffff",
      }}
    >
      <p style={{ color: 'black' }} className="a-name">Bill Track</p>
      <ul className="list-div">
        {sidebarItems.map((item) => (
          <li
            key={item.path}
            className={`list-items ${activeItem === item.name ? "active" : ""}`}
            onClick={() => {
              setActiveItem(item.name);
              onSidebarItemSelect(item.name);
              handleSideBar();
            }}
          >
            <Link className="link" to={`${basePath}` + item.path}>
              {getIconComponent(item.icon)}
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideBar;
