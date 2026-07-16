import React, { useState } from 'react';
import {
  List,
  ListItemButton,
  ListItemText,
  Collapse,
} from '@mui/material';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

export default function AsideRight() {
  // Chỉ lưu 1 section đang mở
  const [openSection, setOpenSection] = useState('getStarted');

  // Item đang active
  const [activeItem, setActiveItem] = useState('quickstart');

  // Toggle section
  const handleToggleSection = (section) => {
    setOpenSection((prevSection) =>
      prevSection === section ? null : section
    );
  };

  // Click item con
  const handleItemClick = (itemId) => {
    setActiveItem(itemId);
  };

  // Style item con
  const getListItemStyle = (itemId) => {
    const isActive = activeItem === itemId;

    return {
      borderRadius: '8px',
      mx: 1,
      my: 0.5,
      px: 2,
      color: isActive ? '#23272f' : '#4f5666',
      backgroundColor: isActive ? '#ebf5fe' : 'transparent',
      fontWeight: isActive ? 600 : 400,

      '&:hover': {
        backgroundColor: isActive ? '#ebf5fe' : '#f6f7f9',
      },
    };
  };

  return (
    <List
      component="nav"
      sx={{
        width: 280,
        bgcolor: '#ffffff',
        height: '100vh',
        pt: 3,
      }}
    >
      {/* ================= GET STARTED ================= */}

      <ListItemButton
        onClick={() => handleToggleSection('getStarted')}
        sx={{
          px: 2,
          '&:hover': {
            backgroundColor: 'transparent',
          },
        }}
      >
        <ListItemText
          primary="GET STARTED"
          primaryTypographyProps={{
            fontSize: '12px',
            fontWeight: 700,
            color: '#5e6878',
            letterSpacing: '0.5px',
          }}
        />

        {openSection === 'getStarted' ? (
          <ExpandLess
            sx={{
              fontSize: 18,
              color: '#5e6878',
            }}
          />
        ) : (
          <ExpandMore
            sx={{
              fontSize: 18,
              color: '#5e6878',
            }}
          />
        )}
      </ListItemButton>

      <Collapse
        in={openSection === 'getStarted'}
        timeout="auto"
        unmountOnExit
      >
        <List component="div" disablePadding>
          <ListItemButton
            sx={getListItemStyle('quickstart')}
            onClick={() => handleItemClick('quickstart')}
          >
            <ListItemText
              primary="Quick Start"
              primaryTypographyProps={{
                fontSize: '14px',
              }}
            />
          </ListItemButton>

          <ListItemButton
            sx={getListItemStyle('installation')}
            onClick={() => handleItemClick('installation')}
          >
            <ListItemText
              primary="Installation"
              primaryTypographyProps={{
                fontSize: '14px',
              }}
            />
          </ListItemButton>

          <ListItemButton
            sx={getListItemStyle('creating-app')}
            onClick={() => handleItemClick('creating-app')}
          >
            <ListItemText
              primary="Creating a React App"
              primaryTypographyProps={{
                fontSize: '14px',
              }}
            />
          </ListItemButton>
        </List>
      </Collapse>

      {/* ================= LEARN REACT ================= */}

      <ListItemButton
        onClick={() => handleToggleSection('learnReact')}
        sx={{
          px: 2,
          mt: 2,
          '&:hover': {
            backgroundColor: 'transparent',
          },
        }}
      >
        <ListItemText
          primary="LEARN REACT"
          primaryTypographyProps={{
            fontSize: '12px',
            fontWeight: 700,
            color: '#5e6878',
            letterSpacing: '0.5px',
          }}
        />

        {openSection === 'learnReact' ? (
          <ExpandLess
            sx={{
              fontSize: 18,
              color: '#5e6878',
            }}
          />
        ) : (
          <ExpandMore
            sx={{
              fontSize: 18,
              color: '#5e6878',
            }}
          />
        )}
      </ListItemButton>

      <Collapse
        in={openSection === 'learnReact'}
        timeout="auto"
        unmountOnExit
      >
        <List component="div" disablePadding>
          <ListItemButton
            sx={getListItemStyle('describing-ui')}
            onClick={() => handleItemClick('describing-ui')}
          >
            <ListItemText
              primary="Describing the UI"
              primaryTypographyProps={{
                fontSize: '14px',
              }}
            />
          </ListItemButton>

          <ListItemButton
            sx={getListItemStyle('adding-interactivity')}
            onClick={() => handleItemClick('adding-interactivity')}
          >
            <ListItemText
              primary="Adding Interactivity"
              primaryTypographyProps={{
                fontSize: '14px',
              }}
            />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}